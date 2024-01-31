const amqplib = require('amqplib');

(async () => {
  const queue = 'tasks';
  const conn = await amqplib.connect('amqp://localhost');
  
  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  ch1.prefetch(1);

  ch1.consume(queue, async (msg) => {
    if (msg !== null) {

      console.log('Recieved:', msg.content.toString());
      await new Promise(resolve => setTimeout(resolve, 5000));

      // console.log('Recieved:', msg.content.toString());

      ch1.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });

})();