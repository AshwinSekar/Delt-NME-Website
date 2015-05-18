import Ember from 'ember';

export default Ember.Route.extend({

    setupController: function() {
        this.controllerFor('application').setProperties({
            isHome: false,
            isSchedule: false,
            isExam: false,
            isUpdateP: false,
            isUpdateB: false,
            isProfile: false,
            isInterview: true
        });
    }

});