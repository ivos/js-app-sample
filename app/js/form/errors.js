define(function() {

	var Errors = function() {
		this.errors = {};
	};

	_.extend(Errors.prototype, {
		add : function(field, text) {
			if (!this.errors[field]) {
				this.errors[field] = [];
			}
			this.errors[field].push(text);
		},

		isEmpty : function() {
			return _.isEmpty(this.errors);
		},

		merge : function(others) {
			var self = this;
			if (others) {
				_.each(others.errors, function(fieldErrors, field) {
					_.each(fieldErrors, function(text) {
						self.add(field, text);
					});
				});
			}
		},

	});

	return Errors;
});
