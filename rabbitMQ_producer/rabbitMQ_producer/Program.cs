using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

var factory = new ConnectionFactory
{
    Uri = new Uri("amqps://hvyzdktl:NNRN3QIyvA-S1AVuLN9nYJJFE-l474wO@stingray." +
    "rmq.cloudamqp.com/hvyzdktl")
};
using var connection = factory.CreateConnection();

using var channel = connection.CreateModel();
channel.QueueDeclarePassive(queue: "consumption");

using var reader = new StreamReader("C:\\Users\\bogda\\Desktop\\an4\\sd\\" +
    "angular_aspnet_docker\\rabbitMQ_producer\\rabbitMQ_producer\\sensor.csv");

using var config = new StreamReader("C:\\Users\\bogda\\Desktop\\an4\\sd\\" +
    "angular_aspnet_docker\\rabbitMQ_producer\\rabbitMQ_producer\\config.txt");

List<Guid> deviceIds;
if (config.EndOfStream || config == null)
{
    deviceIds = new()
    {
        new Guid("43215a86-47af-4ccb-3832-08dabf2b75a9"),
        new Guid("e44f3bef-2710-410e-a92b-08dabf2d0561")
    };

    Console.WriteLine("device ids not from config file");
    foreach (Guid deviceId in deviceIds)
    {
        Console.WriteLine(deviceId);
    }
}
else
{
    deviceIds = new()
    {
        new Guid(config.ReadLine() ?? "00000000-0000-0000-0000-000000000000"),
        new Guid(config.ReadLine() ?? "00000000-0000-0000-0000-000000000000")
    };

    Console.WriteLine("device ids from config file");
    foreach(Guid deviceId in deviceIds)
    {
        Console.WriteLine(deviceId);
    }
}

List<Guid> timestampIds = new()
{
    Guid.NewGuid(),
    Guid.NewGuid(),
};

int i = 1;
while (!reader.EndOfStream)
{
    var line = reader.ReadLine();

    Guid id;
    Guid deviceId;

    ++i;
    i %= 2;

    deviceId = deviceIds[i];
    id = timestampIds[i];

    DateTime timestamp = DateTime.UtcNow;

    var message = new
    {
        id = id,
        deviceId = deviceId,
        timestamp = timestamp,
        energy_consumption = Double.Parse(line ?? "0")
    };

    var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

    channel.BasicPublish("", "consumption", null, body);
    Thread.Sleep(10_000);
}