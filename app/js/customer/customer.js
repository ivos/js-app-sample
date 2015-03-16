define(function(require) {
	var ConfigEnvironment = require('config-environment');
	var Errors = require('form/errors');

	var Mdl = Backbone.Model.extend({
		urlRoot : ConfigEnvironment.backendApiUrl + 'customers',

	});

	return Mdl;
});
