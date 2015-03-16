define(function(require) {
	var template = require('text!customer/customers-list-view.html');
	var Form = require('form/form');
	var Customers = require('customer/customers');
	var CustomersCriteria = require('customer/customers-criteria');
	var CustomersListRecordView = require('customer/customers-list-record-view');
	var State = require('state');

	var View = Form.extend({
		el : '#app-content',
		template : _.template(template),

		initialize : function() {
			this.collection = new Customers([ {
				name : 'Name 1',
				taxNo : 'taxNo 1',
			}, {
				name : 'Name 2',
				taxNo : 'taxNo 2',
			}, {
				name : 'Name 3',
				taxNo : 'taxNo 3',
			} ]);
			this.model = new CustomersCriteria();
			this.listenTo(this.model, 'change', this.reload);
			this.initializeMessages();
		},

		events : {
			'submit #find-customer-form' : 'submit',
		},

		render : function() {
			this.$el.html(this.template());
			this.initializeFields();
			this.addAll();
			return this;
		},

		show : function() {
			this.model.set(_.object(this.model.attributeNames, []));
			this.render();
			State.setPage('Customers', 'customers', 'customers');
			this.reload();
		},

		reload : function() {
			this.$('#customers-count').html(State.listReloadingIcon);
			var self = this;

			self.addAll();
			this.$('#customers-count').html(self.collection.totalCount);
		},

		addAll : function() {
			this.$('#customers-list').html('');
			this.collection.each(this.addOne, this);
		},

		addOne : function(customer) {
			var query = this.model.get('name');
			var name = customer.get('name');
			var index = name.indexOf(query);
			if (!query || index > -1) {
				var view = new CustomersListRecordView({
					model : customer,
				});
				this.$('#customers-list').append(view.render().el);
			}
		},

		submit : function(event) {
			event.preventDefault();
			State.router.customerDetail(this.collection.at(0).id);
		},

	});

	return View;
});
