const amqplib = require('amqplib');
const express = require('express')

const app = express()

app.use(express.json())

app.post('/publisher', async (req, res) => {

  const queue = 'tasks';
  const conn = await amqplib.connect('amqp://localhost');
  const channel = await conn.createChannel();
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));

  res.status(200).json({ok: true})

})

app.listen(8081, () => console.log("Connected"))


