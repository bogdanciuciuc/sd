using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using web_api.Data;
using web_api.Migrations;
using web_api.Models;

namespace web_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimestampsController : Controller
    {
        private readonly MyDbContext _context;

        public TimestampsController(MyDbContext context)
        {
            _context = context;
        }

        private async void CreateTimestamp(Timestamp timestampRequest)
        {
            timestampRequest.id = Guid.NewGuid();
            await _context.Timestamps.AddAsync(timestampRequest);
            await _context.SaveChangesAsync();
        }

        private void CheckAndResetTimestamp(Timestamp timestamp) 
        {
            TimeSpan span = timestamp.timestamp.Subtract(DateTime.UtcNow);
            TimeSpan hour = new TimeSpan(0, 1, 0, 0);
            if (TimeSpan.Compare(span, hour) == 1)
            {
                timestamp.energy_consumption = 0;
                _context.SaveChanges();
            }
        }

        private string UpdateTimestamps(Timestamp timestampRequest)
        {
            if (timestampRequest.id != Guid.Empty &&
                timestampRequest.deviceId != Guid.Empty)
            {
                var device = _context.Devices.Find(timestampRequest.deviceId);
                if (device != null)
                {
                    List<Guid> primaryKey = new();
                    var timestamp = _context.Timestamps.Find(
                        timestampRequest.id,
                        timestampRequest.deviceId);
                    if (timestamp == null)
                    {
                        timestamp = timestampRequest;
                        timestamp.energy_consumption = 0;
                        _context.Timestamps.Add(timestamp);
                        _context.SaveChanges();
                    }
                    else
                    {
                        CheckAndResetTimestamp(timestamp);
                    }

                    if (device.max_consumption >=
                        timestampRequest.energy_consumption +
                        timestamp.energy_consumption)
                    {
                        timestamp.energy_consumption +=
                            timestampRequest.energy_consumption;
                        _context.SaveChanges();
                        return "max energy is not yet reached";
                    }
                    else 
                        return $"maximum energy consumption (" +
                            $"{device.max_consumption}) for device " +
                            $"{device.description} has been reached. Current " +
                            $"consumption was {timestamp.energy_consumption} " +
                            $"and user tried to consume " +
                            $"{timestampRequest.energy_consumption} more";
                }
                else return "could not find the device";

            }
            else return "null request, energy can still be consumed";
        }

        private static bool CheckStatus(string status)
        {
            List<string> statusList = new()
            {
                "max energy is not yet reached",
                "null request, energy can still be consumed"
            };

            foreach (string item in statusList)
            {
                if (item.Equals(status))
                    return true;
            }
            return false;
        }

        [HttpGet]
        public async Task<IActionResult> RabbitMQConsumer()
        {
            var factory = new ConnectionFactory() { 
                Uri = new Uri("amqps://hvyzdktl:NNRN3QIyvA-S1AVuLN9nYJJFE-l474wO@st" +
                "ingray.rmq.cloudamqp.com/hvyzdktl")
            };
            using var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();

            var response = channel.QueueDeclarePassive("consumption");

            var consumer = new EventingBasicConsumer(channel);
            var timestamp = new Timestamp();

            string status = string.Empty;
            do
            {
                string message = string.Empty;
                consumer.Received += (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    message = Encoding.UTF8.GetString(body);
                    timestamp = JsonConvert.DeserializeObject<Timestamp>(message);
                };

                channel.BasicConsume(queue: "consumption",
                    autoAck: true,
                    consumer: consumer
                    );
                status = UpdateTimestamps(timestamp);
            } while (CheckStatus(status));
            return Ok(new {timestamp, status});
        }
    }
}
