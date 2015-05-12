import Ember from 'ember';

export default Ember.Controller.extend({
    loggedIn: function() {
        return !!this.get('model');
    }.property('model'),

    actions: {
        login: function() {
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

            }, function(error) {
                if (error.status === 401) {
                    alert("Wrong email or password, please try again");
                }
            });
        }
    }
});