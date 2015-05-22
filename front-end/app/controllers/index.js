import Ember from 'ember';

export default Ember.Controller.extend({

	totalBrothers: function() {
		return this.store.find('brothers').then(function(brothers) {
			return brothers.get('length');
		});
	}
	
});
