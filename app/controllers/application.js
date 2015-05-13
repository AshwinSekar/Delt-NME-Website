import Ember from 'ember';

export default Ember.Controller.extend({

	needs: 'sessions',

	currentUser: function() {
		return this.get('controllers.sessions.currentUser');
	}.property('controllers.sessions.currentUser'),

    isAuthenticated: function() {
        return !Ember.isEmpty(this.get('currentUser'));
    }.property('currentUser'),


});