define(function() {
	var Message = Backbone.Model.extend({

		initialize : function() {
			this.set('alertType', this.getAlertType());
			this.set('glyphicon', this.getGlyphicon());
			if (typeof this.get('dismissable') == 'undefined') {
				this.set('dismissable', false);
			}
		},

		getAlertType : function() {
			var alertType = this.get('type');
			if ('error' == alertType) {
				alertType = 'danger';
			}
			return alertType;
		},

		getGlyphicon : function() {
			var type = this.get('type');
			switch (type) {
			case 'success':
				return 'ok-sign';
			case 'info':
				return 'info-sign';
			case 'warning':
				return 'warning-sign';
			case 'error':
				return 'exclamation-sign';
			}
		},

	});

	return Message;
});
