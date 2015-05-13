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

// Create an authenticated route for protected routes that can only be accessed after being authenticated
App.AuthenticatedRoute = Ember.Route.extend({

    beforeModel: function(transition) {
        if (Ember.isEmpty(this.controllerFor('sessions').get('token'))) {
            return this.redirectToLogin(transition); // If the user isn't authenticated, make them login first
        }
    },

    redirectToLogin: function(transition) {
        this.controllerfor('sessions').set('attemptedTransition', transition); // Store where they want to go after login
        return this.transitionTo('sessions'); // Make them login and then transitionTo where they want to go
    },

    actions: {
    	error: function(reason, transition) {
    		if(reason.status === 401) { // unauthorised access error
    			this.redirectToLogin(transition);
    		} else {
    			console.log('Unkown problem: ' + reason + transition);
    		}
    	}
    }
    
});

export default App;