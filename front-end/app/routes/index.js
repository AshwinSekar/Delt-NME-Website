import Ember from 'ember';

export default Ember.Route.extend({

    model: function() {
        return this.store.find('pledge').then(function(pledges) {
            pledges.forEach(function(pledge) {
                pledge.rollback();
            });
            return pledges;     
        });
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('application').setProperties({
            isHome: true,
            isSchedule: false,
            isExam: false,
            isUpdateP: false,
            isUpdateB: false,
            isProfile: false,
            isInterview: false
        });
        this.store.find('brother').then(function(brothers) {
            controller.set('totalBrothers',brothers.get('length'));
        });
    }

});