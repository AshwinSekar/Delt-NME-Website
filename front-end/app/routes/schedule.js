import Ember from 'ember';

export default Ember.Route.extend({

    setupController: function() {
        this._super();
        this.controllerFor('application').setProperties({
            isHome: false,
            isSchedule: true,
            isExam: false,
            isUpdateP: false,
            isUpdateB: false,
            isProfile: false,
            isInterview: false
        });
    }

});