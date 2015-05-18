import Ember from 'ember';

export default Ember.Route.extend({

	setupController: function() {
        this.controllerFor('application').setProperties({
            isHome: false,
            isSchedule: false,
            isExam: true,
            isUpdateP: false,
            isUpdateB: false,
            isProfile: false,
            isInterview: false
        });
    }

});
