const amqp = require("amqplib");

const queue = "product_inventory";
const text = {
  item_id: "macbook",
  text: "Fuck you",
};

function sleep(){
  return new Promise(resolve => setTimeout(resolve, 5000))
}

(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    for (let i = 0; i < 50; i++) {
      await channel.assertQueue(queue, { durable: false });
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
      console.log(" [x] Sent '%s'", text);
      // await sleep()
    }
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();