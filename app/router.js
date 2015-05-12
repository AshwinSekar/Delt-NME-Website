import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
	this.resource('sessions', function() {
		this.route('logout');
		this.route('login');
	});
	this.resource('users',function() {
		this.route('signup');
		this.route('user', {
			path: '/user/:user_id'
		});
	});
	this.route('secret'); // The idea is to have this route only available to authenticated users.
});
