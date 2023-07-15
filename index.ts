import amqplib from 'amqplib/callback_api'

const queue: string = "exemplo"


amqplib.connect('amqp://localhost:15672', (err, conn) => {
  if (err) throw err;

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue);

    setInterval(() => {
      ch1.sendToQueue(queue, Buffer.from('something to do'));
    }, 1000);
  });
});