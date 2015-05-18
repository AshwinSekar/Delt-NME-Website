import Ember from 'ember';

export default Ember.Route.extend({

    actions: {
        logout: function() {
            this.controllerFor('application').reset();
            this.transitionTo('index');
        }
    }

});