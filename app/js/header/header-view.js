define(function(require) {
	var template = require('text!header/header-view.html');
	var State = require('state');
	var MessagesFormView = require('form/messages-form-view');

	var View = Backbone.View.extend({
		el : '#app-header',
		template : _.template(template),

		initialize : function() {
			this.systemMessageView = new MessagesFormView({
				model : State.data.systemMessages,
				field : '_system',
				$form : $('#wrapper-container'),
			});
		},

		render : function() {
			this.$el.html(this.template());
			return this;
		},

	});

	return View;
});
