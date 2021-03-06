import Ember from 'ember';

export default Ember.Controller.extend({

    attemptedTransition: null,
    token: Ember.$.cookie('access_token'),
    currentUser: Ember.$.cookie('auth_user'),
    isMaster: Ember.$.cookie('isMaster') === 'true',
    pledge_id: Ember.$.cookie('pledge_id'),


    isAuthenticated: function() {
        return !Ember.isEmpty(this.get('currentUser'));
    }.property('currentUser'),

    tokenChanged: function() {
        if (Ember.isEmpty(this.get('token'))) {
            Ember.$.removeCookie('access_token');
            Ember.$.removeCookie('auth_user');
            Ember.$.removeCookie('isMaster');
            Ember.$.removeCookie('pledge_id');
        } else {
            Ember.$.cookie('access_token', this.get('token'));
            Ember.$.cookie('auth_user', this.get('currentUser'));
            Ember.$.cookie('isMaster', this.get('isMaster'));
            Ember.$.cookie('pledge_id', this.get('pledge_id'));
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

    reset: function() {
        this.setProperties({
            email: null,
            password: null,
            token: null,
            currentUser: null,
        });
        Ember.$.ajaxSetup({
            headers: {
                'Authorization': 'Bearer none'
            }
        });
    },

    actions: {
        login: function() {
            var _this = this;

            var attemptedTrans = this.get('attemptedTransition');
            var data = this.getProperties('email', 'password');

            this.setProperties({
                password: null
            });

            Ember.$.post('http://localhost:3000/session', data).then(function(response) {
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
                        currentUser: pledge.get('name'),
                        isMaster: pledge.get('isMaster'),
                        pledge_id: response.api_key.user_id
                    });

                    key.set('user', pledge);
                    key.save();

                    pledge.get('apiKeys').pushObject(key);

                    if (attemptedTrans) {
                        attemptedTrans.retry();
                        _this.set('attemptedTransition', null);
                    }
                });

            }, function(error) {
                if (error.status === 401) {
                    Ember.$('#alertError').fadeIn();
                }
            });


        },

        closeError : function() {
            Ember.$('#alertError').fadeOut();
        }
    }
});