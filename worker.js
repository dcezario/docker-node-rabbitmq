let amqp = require('amqplib/callback_api');
amqp.connect(process.env.AMQP_RECEIVE_URL, function(err, conn) {
	if (err) {
		console.log(err);
		return false;
	}
	console.log('Rabbitmq connected');
	conn.createChannel(function(err, ch) {
		let q = 'task_queue';
		ch.assertQueue(q, {durable: false});
		console.log('Waiting for messages in %s', q);
		ch.consume(q, function(msg) {
			let seconds = msg.content.toString().split('.').length - 1;
			console.log("[x] Received %s", msg.content.toString());
			setTimeout(function() {
				console.log("[x] Done");
				ch.ack(msg);
				ch.prefetch(1);
			}, seconds * 1000);
		}, {noAck: false});
	});

})