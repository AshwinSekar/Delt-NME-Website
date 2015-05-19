import Ember from 'ember';

export default Ember.Controller.extend({

	actions: {

		edit: function(id) {
			console.log(id);
		},

		show: function(id) {
			Ember.$('#' + id + ".hide").hide().removeClass('hide');
			Ember.$('#' + id).toggle('slow');
		}
	}
});
