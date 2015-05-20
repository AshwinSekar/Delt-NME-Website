import Ember from 'ember';

export default Ember.Controller.extend({

    adding: false,
    year: '',
    firstName: '',
    lastName: '',
    answer: '',
    question: '',
    falseAnswer1: '',
    falseAnswer2: '',
    falseAnswer3: '',
    falseAnswer4: '',
    name: function() {
        return this.get('firstName') + " " + this.get('lastName');
    }.property('firstName', 'lastName'),

    actions: {

        edit: function(id, isEditing) {
            var brother = this.get('model').filterProperty('id', id)[0];
            if (!isEditing) {
                brother.set('isEditing', true);
                brother.save();
            } else {
                brother.rollback();
                brother.set('isEditing', false);
                brother.save();
            }

        },

        save: function(id) {
            var brother = this.get('model').filterProperty('id', id)[0];
            brother.set('isEditing', false);
            brother.save();
        },

        show: function(id) {
            Ember.$('#' + id + '.wow').toggleClass('dropup');
            Ember.$('#' + id + '.hide').hide().removeClass('hide');
            Ember.$('#' + id + '.controls').fadeToggle();
        },

        add: function() {
            this.setProperties({
                adding: true,
                year: '',
                firstName: '',
                lastName: '',
                question: '',
                answer: '',
                falseAnswer1: '',
                falseAnswer2: '',
                falseAnswer3: '',
                falseAnswer4: ''
            });
        },

        saveAdd: function() {
            var brother = this.get('store').createRecord('brother', {
                firstName: this.get('firstName'),
                lastName: this.get('lastName'),
                year: this.get('year'),
                question: this.get('question'),
                answer: this.get('answer'),
                falseAnswer1: this.get('falseAnswer1'),
                falseAnswer2: this.get('falseAnswer2'),
                falseAnswer3: this.get('falseAnswer3'),
                falseAnswer4: this.get('falseAnswer4')
            });
            brother.save();
            this.set('adding', false);
        },

        closeAdd: function() {
            this.setProperties({
                adding: false,
            });
        },

        delete: function(id) {
            this.store.find('brother', id).then(function(brother) {
                brother.destroyRecord();
            });
        }
    }

});