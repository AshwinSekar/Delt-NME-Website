import App from '../app';
import Ember from 'ember';

export default App.AuthenticatedPledgeRoute.extend({

    model: function() {
        return Ember.RSVP.hash({
           brothers: this.store.find('brother'),
           pledge: this.store.find('pledge', this.controllerFor('application').pledge_id) 
        });
    },

    setupController: function(controller, model) {
        this._super(controller,model);
        this.controllerFor('application').setProperties({
            isHome: false,
            isSchedule: false,
            isExam: false,
            isUpdateP: false,
            isUpdateB: false,
            isProfile: false,
            isInterview: true
        });
        controller.setProperties({
            alert: ''
        });
    }

});