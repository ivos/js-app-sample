define(function(require) {
	var Setup = require('setup');
	var Router = require('router');
	var State = require('state');

	var HeaderView = require('header/header-view');
	var FooterView = require('footer/footer-view');

	var CustomersListView = require('customer/customers-list-view');

	var Messages = require('form/messages');

	var App = function() {
		this.$title = $('title');
		this.name = this.$title.html();

		State.app = this;

		State.data.systemMessages = new Messages();

		State.views.header = new HeaderView();
		State.views.header.render();
		State.views.footer = new FooterView();
		State.views.footer.render();

		State.views.customers = new CustomersListView();

		State.router = new Router();
		Backbone.history.start();

		if (Backbone.history.fragment == '') {
			State.views.customers.show();
		}
	};

	return App;
});
