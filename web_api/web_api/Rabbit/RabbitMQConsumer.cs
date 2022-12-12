//using RabbitMQ.Client.Events;
//using RabbitMQ.Client;
//using System.Text;
//using Newtonsoft.Json;
//using web_api.Models;
//using web_api.Controllers;
//using web_api.Data;

//namespace web_api.Rabbit
//{
//    public class RabbitMQConsumer : IRabbitMQConsumer
//    {
//        /*private readonly TimestampService _timestampService;
//        public RabbitMQConsumer(TimestampService timestampService) 
//        {
//            _timestampService = timestampService;
//        }
//        */
//        private void UpdateTimestamps(string message)
//        {
//            Console.WriteLine("update " + message);
//        }
//        public string ReceiveTimestamp()
//        {
//            var factory = new ConnectionFactory() { Uri = new Uri("amqps://hvyzdktl:NNRN3QIyvA-S1AVuLN9nYJJFE-l474wO@stingray.rmq.cloudamqp.com/hvyzdktl") };
//            using var connection = factory.CreateConnection();
//            using var channel = connection.CreateModel();

//            var response = channel.QueueDeclarePassive("consumption");

//            var consumer = new EventingBasicConsumer(channel);

//            string message = string.Empty;
//            Timestamp timestamp = new();
//            consumer.Received += (model, ea) =>
//            {
//                var body = ea.Body.ToArray();
//                message = Encoding.UTF8.GetString(body);
//                timestamp = JsonConvert.DeserializeObject<Timestamp>(message);
//                Console.WriteLine(timestamp.ToString());
//            };

//            channel.BasicConsume(queue: "consumption",
//                autoAck: true,
//                consumer: consumer
//                );
//            return message;
//        }

//    }
//}
