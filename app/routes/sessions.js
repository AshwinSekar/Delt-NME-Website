import Ember from 'ember';

export default Ember.Route.extend({

    setupController: function(controller, context) {
        controller.reset(); // Reset controller when authenticating to avoid data from a past authentication
    },

    beforeModel: function(transition) {
        if (!Ember.isEmpty(this.controllerFor('sessions').get('token'))) {
            this.transitionTo('secret'); // If the user is already logged in, just take him to the secret route
        }
    }

});