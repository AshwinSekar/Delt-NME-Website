import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

export default Router.map(function() {
    this.route('schedule');
    this.route('exam');
    this.route('profile');
    this.route('interview');
    this.route('updatePledges');
    this.route('updateBrothers');
    this.route('loginNeeded');
});