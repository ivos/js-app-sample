define(function(require) {
	var MessageFormView = require('form/message-form-view');

	var MessagesFormView = Backbone.View.extend({

		initialize : function(options) {
			this.$form = options.$form;
			this.el = (options.wrapperSelector || '') + ' [data-messages-for=' + options.field + ']';
			this.listenTo(this.model, 'reset', this.render);
		},

		render : function() {
			this.$el = this.$form.find(this.el);
			this.$el.empty();
			this.model.each(function(message) {
				var messageFormView = new MessageFormView({
					model : message
				});
				this.$el.append(messageFormView.$el);
			}, this);
			return this;
		},

	});

	return MessagesFormView;
});
