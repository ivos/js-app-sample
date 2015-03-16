define(function(require) {
	var Message = require('form/message');
	var Messages = require('form/messages');

	var substringMatcher = function(strs) {
		return function findMatches(q, cb) {
			var matches, substrRegex;
			matches = [];
			substrRegex = new RegExp(q, 'i');
			$.each(strs, function(i, str) {
				if (substrRegex.test(str)) {
					matches.push({
						value : str
					});
				}
			});
			cb(matches);
		};
	};

	var Field = Backbone.View.extend({

		events : {
			keyup : 'changed',
			change : 'changed',
			cut : 'changed',
			paste : 'changed',
			blur : 'validate',
			'select2-blur' : 'validate',
		},

		initialize : function(options) {
			this.name = this.$el.attr('name');
			this.form = options.form;
			this.typeaheadDatasets = options.typeaheadDatasets;
			this.initTypeahead();
			this.initSelect2();
		},

		initTypeahead : function() {
			if (this.$el.is('input.typeahead')) {
				this.$el.typeahead({
					hint : true,
					highlight : true,
					minLength : 1,
				}, {
					name : this.name,
					displayKey : 'value',
					source : substringMatcher(this.typeaheadDatasets[this.name]),
				});
			}
		},

		initSelect2 : function() {
			if (this.$el.is('select')) {
				this.$el.select2({
					allowClear : true,
				});
			}
		},

		changed : function() {
			var value = this.$el.val();
			if ('radio' == this.$el[0].type) {
				value = this.$el.filter(':checked').val();
			}
			if ('checkbox' == this.$el[0].type) {
				value = this.$el.is(":checked");
			}
			this.setModel(value);
		},

		setModel : function(value) {
			var currentValue = this.model.get(this.name);
			if ((!value && !currentValue) || (value == currentValue)) {
				return;
			}
			this.model.set(this.name, value);
		},

		validate : function() {
			this.changed();
			if (!this.model.attributes[this.name]) {
				this.model.attributes[this.name] = '';
			}
			this.model.validate(this.model.attributes);
			this.form.resetFieldMessages(this.model.errors.errors[this.name], this.name);
		},

	});

	return Field;
});
