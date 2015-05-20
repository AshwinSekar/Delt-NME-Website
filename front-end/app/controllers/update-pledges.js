import Ember from 'ember';

export default Ember.Controller.extend({

    adding: false,
    email: '',
    firstName: '',
    lastName: '',
    name: function() {
      return this.get('firstName') + " " + this.get('lastName');
    }.property('firstName','lastName'),

    actions: {

        edit: function(id, isEditing) {
            var pledge = this.get('model').filterProperty('id',id)[0];
            if(!isEditing) {
           		pledge.set('isEditing', true);
           		pledge.save();
           	} else {
           		pledge.rollback();	
           		pledge.set('isEditing', false);
           		pledge.save();
           	}

        },

        save: function(id) {
        	var pledge = this.get('model').filterProperty('id',id)[0];
        	pledge.set('isEditing',false);
        	pledge.save();
        },

        show: function(id) {
        	Ember.$('#' + id + '.wow').toggleClass('dropup');
            Ember.$('#' + id + '.hide').hide().removeClass('hide');
            Ember.$('#' + id + '.controls').fadeToggle();
        },

        add: function() {
          this.setProperties({
            adding: true,
            email: '',
            firstName: '',
            lastName: '',
          });
        },

        saveAdd: function() {
          var pledge = this.get('store').createRecord('pledge', {
            isMaster: false,
            firstName: this.get('firstName'),
            lastName: this.get('lastName'),
            email: this.get('email')
          });
          pledge.save();
          this.set('adding',false);
        },

        closeAdd: function() {
          this.setProperties({
            adding: false,
          });
        }
    }
});