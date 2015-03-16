define(function(require) {
	var template = require('text!customer/customers-list-record-view.html');
	var State = require('state');

	var View = Backbone.View.extend({
		template : _.template(template),
		tagName : 'a',
		className : 'list-group-item',

		render : function() {
			this.$el.attr('id', this.model.id).attr('href', '#customers').html(this.template(this.model.attributes));
			return this;
		},

	});

	return View;
});
