let amqp = require('amqplib/callback_api');
amqp.connect(process.env.AMQP_RECEIVE_URL, function(err, conn) {
	if (err) {
		console.log(err);
		return false;
	}
	console.log('Rabbitmq connected');
	conn.createChannel(function(err, ch) {
		const q = "task_queue";
		let msg = process.argv.slice(2).join(' ') || 'Hello world!';
		
		ch.assertQueue(q, {durable: false});
		ch.sendToQueue(q, new Buffer(msg), {persistent: true});
		console.log(" [x] Sent %s", msg);
	});
	setTimeout(function() {
		conn.close(); 
		process.exit(0);
	}, 500);
});