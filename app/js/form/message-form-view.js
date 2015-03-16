define(function(require) {
	var template = require('text!form/message-form-view.html');

	var MessageFormView = Backbone.View.extend({
		template : _.template(template),
		tagName : 'span',

		initialize : function() {
			this.render();
		},

		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			if ('success' == this.model.get('type')) {
				this.$el.delay(2500).fadeOut(500);
			}
			return this;
		}

	});

	return MessageFormView;
});
