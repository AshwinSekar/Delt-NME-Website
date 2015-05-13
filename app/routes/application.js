import Ember from 'ember';

export default Ember.Route.extend({

    setupController: function(controller, context) {
        controller.reset(); // Reset controller when authenticating to avoid data from a past authentication
    },

    actions: {
        logout: function() {
            this.controllerFor('application').reset();
            this.transitionTo('index');
        }
    }

});