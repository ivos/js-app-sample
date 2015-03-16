define(function(require) {
	var State = require('state');

	var Router = Backbone.Router.extend({
		routes : {

			'customers' : 'customers',

		},

		customers : function() {
			State.views.customers.show();
		},

	});

	return Router;
});
