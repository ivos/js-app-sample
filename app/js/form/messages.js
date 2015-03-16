define(function(require) {
	var Message = require('form/message');

	var Messages = Backbone.Collection.extend({
		model : Message,

		setSystemMessage : function(type, text) {
			this.reset(new Message({
				type : type,
				text : text,
				dismissable : true,
			}));
		},

	});

	return Messages;
});
