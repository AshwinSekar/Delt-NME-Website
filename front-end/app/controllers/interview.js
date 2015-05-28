import Ember from 'ember';

export default Ember.Controller.extend({

	errorMessage: "",
	successMessage: "",

	actions: {
		interview: function(id) {
			var answer = Ember.$('#answer' + id)[0].value;
			var year = Ember.$('#year' + id)[0].value;
			var data = {
				pledgeId: this.get('model').id,
				brotherId: id,
				year: year,
				answer: answer
			};

			Ember.$.post("http://localhost:3000/interview", data).then(function(response) {

			});
		}
	}

});