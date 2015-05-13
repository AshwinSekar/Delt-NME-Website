import Ember from 'ember';

export default Ember.Controller.extend({

    attemptedTransition: null,
    token: Ember.$.cookie('access_token'),
    currentUser: Ember.$.cookie('auth_user'),

    isAuthenticated: function() {
        return !Ember.isEmpty(this.get('currentUser'));
    }.property('currentUser'),

    tokenChanged: function() {
        if (Ember.isEmpty(this.get('token'))) {
            Ember.$.removeCookie('access_token');
            Ember.$.removeCookie('auth_user');
        } else {
            Ember.$.cookie('access_token', this.get('token'));
            Ember.$.cookie('auth_user', this.get('currentUser'));
        }
    }.observes('token'),

    init: function() {
        this._super();
        if (Ember.$.cookie('access_token')) {
            Ember.$.ajaxSetup({
                headers: {
                    'Authorization': 'Bearer ' + Ember.$.cookie('access_token')
                }
            });
        }
    },

    actions: {
        login: function() {
            var _this = this;

            var attemptedTrans = this.get('attemptedTransition');
            var data = this.getProperties('email', 'password');

            this.setProperties({
                email: null,
                password: null
            });

            Ember.$.post('/session', data).then(function(response) {
                Ember.$.ajaxSetup({
                    headers: {
                        'Authorization': 'Bearer ' + response.api_key.access_token
                    }
                });

                var key = _this.get('store').createRecord('apiKey', {
                    accessToken: response.api_key.access_token
                });

                _this.store.find('pledge', response.api_key.user_id).then(function(pledge) {
                    _this.setProperties({
                        token: response.api_key.access_token,
                        currentUser: pledge.getProperties('isMaster', 'name', 'email')
                    });

                    key.set('user', pledge);
                    key.save();

                    pledge.get('apiKeys').content.push(key);

                    if (attemptedTrans) {
                        attemptedTrans.retry();
                        _this.set('attemptedTransition', null);
                    } else {
                        _this.transitionToRoute('secret');
                    }
                });

            }, function(error) {
                if (error.status === 401) {
                    alert("Wrong email or password, please try again");
                }
            });


        },

        reset: function() {
            this.setProperties({
                email: null,
                password: null,
                token: null,
                currentUser: null
            });
            Ember.$.ajaxSetup({
                headers: {
                    'Authorization': 'Bearer none'
                }
            });
        }
    }
});