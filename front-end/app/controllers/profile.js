import Ember from 'ember';

export default Ember.Controller.extend({

    confirmFail: false,
    confirmSuccess: false,
    email: '',
    password: '',
    confirm: '',
    displayPassError: false,
    displayPassChange: false,
    displayEmailChange: false,

    passChange: function() {
        var pass = this.get('password');
        var pass2 = this.get('confirm');

        if (pass === '' && pass2 === '') {
            this.setProperties({
                confirmFail: false,
                confirmSuccess: false
            });
        } else {
            this.setProperties({
                confirmFail: (pass !== pass2),
                confirmSuccess: (pass === pass2)
            });
        }
    }.observes('password', 'confirm'),


    reset: function() {
    	this.setProperties({
    		email: '',
    		password: '',
    		confirm: '',
    	});
    },

    actions: {
        update: function() {
            this.set('displayEmailChange', false);
            this.set('displayPassChange', false);

            if (this.get('password') !== this.get('confirm')) {
                this.set('displayPassError', true);
                return;
            }
            this.set('displayPassError', false);
            if (this.get('email') !== '') {
                this.get('model').set('email', this.get('email'));
                this.set('displayEmailChange', true);
            }
            if (this.get('password') !== '') {
                this.get('model').set('password', this.get('password'));
                this.set('displayPassChange', true);
            }
            this.get('model').save();
            this.reset();
        }
    }

});