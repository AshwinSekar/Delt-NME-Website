import Ember from 'ember';

export default Ember.Controller.extend({
    loggedIn: function() {
        return !!this.get('model');
    }.property('model'),

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


        }
    }
});