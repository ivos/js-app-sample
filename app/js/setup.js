define(function() {
	var Setup = {};

	_.templateSettings = {
		evaluate : /\{%([\s\S]+?)%\}/g,
		interpolate : /\{=([\s\S]+?)=\}/g,
		escape : /\{\{([\s\S]+?)\}\}/g,
	};

	return Setup;
});
