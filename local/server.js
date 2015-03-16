var connect = require('connect'), http = require('http'), httpProxy = require('http-proxy');

// Run frontend app from filesystem on port 9081

var app = connect();
// app.use(connect.logger('short'));

// live development files
app.use('/js-app-sample', connect.static('local/override'));
app.use('/js-app-sample', connect.static('app'));
app.use('/js-app-sample/js/lib/', connect.static('node_modules/requirejs/'));
// test files
app.use('/test', connect.static('test'));
// app.use('/test', connect.static('local/override'));
// app.use('/test', connect.static('app'));
// app.use('/test/js/lib/', connect.static('node_modules/requirejs/'));
// app.use('/test/node_modules', connect.static('node_modules'));

// built production files
// app.use('/js-app-sample', connect.static('target/build'));

http.createServer(app).listen(9081, function() {
	console.log('Running frontend filesystem server on http://localhost:9081/js-app-sample/');
});

// Run frontend and backend together on port 9080
// (prevents CSRF issues in browser)

httpProxy.createServer({
	router : {
		'localhost/js-app-sample-backend' : 'localhost:8080/js-app-sample-backend',
		'localhost/js-app-sample' : 'localhost:9081/js-app-sample',
		'localhost/test' : 'localhost:9081/test',
	}
}).listen(9080, function() {
	console.log('Proxying to backend on http://localhost:9080/js-app-sample-backend/');
	console.log('Proxying to frontend on http://localhost:9080/js-app-sample/');
});
