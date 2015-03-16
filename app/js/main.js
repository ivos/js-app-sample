requirejs.config({
	baseUrl : 'js',

	// development paths
	paths : {
		'template' : '../template',
		'text' : 'lib/text',
		'underscore' : 'lib/underscore',
		'backbone' : 'lib/backbone',
	},

	shim : {
		'underscore' : {
			exports : '_',
		},
		'backbone' : {
			deps : [ 'underscore', ],
			exports : 'Backbone',
		},
		'app' : {
			deps : [ 'underscore', 'backbone', ]
		}
	}
});

require([ 'app' ], function(App) {
	window.jsAppSample = new App();
});
