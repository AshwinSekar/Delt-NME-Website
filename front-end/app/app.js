import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver: Resolver,
    LOG_TRANSITIONS: true,
    LOG_TRANSITIONS_INTERNAL: true
});

loadInitializers(App, config.modulePrefix);

// Create an authenticated route for protected routes that can only be accessed after being authenticated as a pledge
App.AuthenticatedPledgeRoute = Ember.Route.extend({

    beforeModel: function(transition) {
        if (Ember.isEmpty(this.controllerFor('application').get('token'))) {
            return this.redirectToLogin(transition); // If the user isn't authenticated, make them login first
        }
        if (this.controllerFor('application').get('isMaster')) {
            return this.transitionTo('index'); // Master trying to access pledge route so we won't let him
        }
    },

    redirectToLogin: function(transition) {
        this.controllerFor('application').set('attemptedTransition', transition); // Store where they want to go after login
        return this.transitionTo('loginNeeded'); // Make them login and then transitionTo where they want to go
    },

    actions: {
        error: function(reason, transition) {
            if (reason.status === 401) { // unauthorized access error
                this.redirectToLogin(transition);
            } else {
                console.log('Unknown problem: ' + reason + " " + transition);
            }
        }
    }

});

// Create an authenticated route for protected routes that can only be accessed after being authenticated as a Master
App.AuthenticatedMasterRoute = Ember.Route.extend({

    beforeModel: function(transition) {
        if (Ember.isEmpty(this.controllerFor('application').get('token'))) {
            return this.redirectToLogin(transition); // If the user isn't authenticated, make them login first
        }
        if (!this.controllerFor('application').get('isMaster')) {
            return this.transitionTo('index'); // Pledge trying to access Master route so we won't let him
        }
    },

    redirectToLogin: function(transition) {
        this.controllerFor('application').set('attemptedTransition', transition); // Store where they want to go after login
        return this.transitionTo('loginNeeded'); // Make them login and then transitionTo where they want to go
    },

    actions: {
        error: function(reason, transition) {
            if (reason.status === 401) { // unauthorized access error
                this.redirectToLogin(transition);
            } else {
                console.log('Unknown problem: ' + reason + " " + transition);
            }
        }
    }

});

export default App;