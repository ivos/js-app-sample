define(function(require) {
	var Errors = require('form/errors');

	var Mdl = Backbone.Model.extend({

		attributeNames : [ 'name', ],

		validate : function(attributes, options) {
			var errors = this.errors = new Errors([]);
		},

	});

	return Mdl;
});
