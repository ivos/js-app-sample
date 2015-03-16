define(function() {
	var State = {
		views : {},
		data : {},
		control : {},

		setPage : function(page, hash, activeNavbar) {
			State.app.$title.html(page + ' - ' + State.app.name);
			State.router.navigate(hash);
		},

	};

	return State;
});
