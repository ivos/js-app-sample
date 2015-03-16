define(function(require) {
	var template = require('text!footer/footer-view.html');
	var ConfigApp = require('config-app');

	var View = Backbone.View.extend({
		el : '#app-footer',
		template : _.template(template),

		render : function() {
			this.$el.html(this.template({
				config : ConfigApp,
			}));
			return this;
		},

	});

	return View;
});
