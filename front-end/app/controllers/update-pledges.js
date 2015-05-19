import Ember from 'ember';

export default Ember.Controller.extend({

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
            Ember.$('#' + id + ".hide").hide().removeClass('hide');
            Ember.$('#' + id).fadeToggle();
        }
    }
});