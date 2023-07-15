const amqp = require("amqplib");
const queue = "product_inventory";

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    function sleep() {
      return new Promise(resolve => setTimeout(resolve, 5000))
    }

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      (message) => {
        if (message) {
          console.log(
            " [x] Received '%s'",
            JSON.parse(message.content.toString())
          );
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
  } catch (err) {
    console.warn(err);
  }
})();