define(function(require) {
	var Messages = require('form/messages');
	var Message = require('form/message');
	var MessagesFormView = require('form/messages-form-view');
	var Field = require('form/field');

	var Form = Backbone.View.extend({

		initializeMessages : function() {
			this.fieldNames = _.union(this.model.attributeNames, [ '_form' ]);
			this.messages = {};
			_.each(this.fieldNames, function(fieldName) {
				this.messages[fieldName] = new Messages();
			}, this);
			this.messageViews = {};
			_.each(this.fieldNames, function(fieldName) {
				this.messageViews[fieldName] = new MessagesFormView({
					model : this.messages[fieldName],
					field : fieldName,
					$form : this.$el,
					wrapperSelector : this.wrapperSelector,
				});
			}, this);
		},

		initializeFields : function(typeaheadDatasets) {
			this.fields = {};
			_.each(this.fieldNames, function(fieldName) {
				// init Field
				var $element = this.$('input[name="' + fieldName + '"].field, textarea[name=' + fieldName
						+ '].field, select[name="' + fieldName + '"].field');
				if ($element.length) {
					this.initField($element, fieldName, typeaheadDatasets);
				}
			}, this);
			this.$('span.required').attr('title', 'Povinné').html('&nbsp;*');
			this.$('a.help-link').attr('target', '_blank').attr('title', 'Nápověda').attr('tabindex', '-1').html(
					'<span class="glyphicon glyphicon-question-sign text-primary help-icon"></span>');
			this.$(':input:enabled:first').focus();
		},

		initField : function($element, fieldName, typeaheadDatasets) {
			this.fields[fieldName] = new Field({
				el : $element,
				model : this.model,
				form : this,
				typeaheadDatasets : typeaheadDatasets,
			});
		},

		clearMessages : function() {
			_.each(this.fieldNames, function(field) {
				this.messages[field].reset();
			}, this);
		},

		resetMessages : function(errors) {
			this.clearMessages();
			_.each(errors, function(fieldErrors, field) {
				this.resetFieldMessages(fieldErrors, field);
			}, this);
		},

		resetFieldMessages : function(fieldErrors, field, type) {
			type = type || 'error';
			var messages = new Messages();
			_.each(fieldErrors, function(text) {
				messages.add(new Message({
					type : type,
					text : text
				}));
			});
			this.messages[field].reset(messages.models);
		},

		setFieldsToModel : function() {
			_.each(this.fields, function(field) {
				field.changed();
			});
		},

		allAttributes : function() {
			this.setFieldsToModel();
			var empty = {};
			_.each(this.model.attributeNames, function(attributeName) {
				empty[attributeName] = '';
			});
			return _.extend(empty, this.model.attributes);
		},

		saveAttributes : function() {
			var allAttributes = this.allAttributes();
			this.model.set(allAttributes);
			var attrs = arguments;
			if (1 == arguments.length && _.isArray(arguments[0])) {
				attrs = arguments[0];
			}
			if (!attrs.length) {
				attrs = this.model.attributeNames;
			}
			var nonEmpty = _.pick(allAttributes, function(value, attr) {
				return _.contains(attrs, attr) && (!!value);
			});
			return nonEmpty;
		},

	});

	return Form;
});
