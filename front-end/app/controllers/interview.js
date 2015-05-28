import Ember from 'ember';

export default Ember.Controller.extend({

    errorMessage: "",
    successMessage: "",
    brothersPending: function() {
        var _this = this;
        if(!this.get('doneLoading')) return [];
        return this.get('brothers').filter(function(item) {
            return !(_this.get('model').get('brothersInterviewed').contains(item) ||
              	     _this.get('model').get('brothersFailed').contains(item));
        });
    }.property('brothers', 'model'),

    numPending: function() {
        return this.get('brothersPending').get('length');
    }.property('brothersPending'),

    actions: {
        interview: function(id) {
            var answer = Ember.$('#answer' + id)[0].value;
            var year = Ember.$('#year' + id)[0].value;
            var data = {
                pledgeId: this.get('model').id,
                brotherId: id,
                year: year,
                answer: answer
            };
            var _this = this;
            var brother = _this.get('brothers').findBy('id',id);
            Ember.$.post("http://localhost:3000/interview", data).then(function() {
                _this.get('model').reload();
                _this.get('brothersPending').removeObject(brother);
                _this.decrementProperty('numPending');
            });
        }
    }

});