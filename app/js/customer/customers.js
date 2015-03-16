define(function(require) {
	var ConfigEnvironment = require('config-environment');
	var Customer = require('customer/customer');

	var Coll = Backbone.Collection.extend({
		model : Customer,
		url : ConfigEnvironment.backendApiUrl + 'customers',

	});

	return Coll;
});
