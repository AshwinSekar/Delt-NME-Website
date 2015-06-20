import Ember from 'ember';

export default Ember.Controller.extend({

    brothersPending: function() {
        var _this = this;
        return this.get('model').brothers.filter(function(item) {
            return !(_this.get('model').pledge.get('brothersInterviewed').contains(item) ||
                _this.get('model').pledge.get('brothersFailed').contains(item));
        });
    }.property('model'),

    numPending: function() {
        return this.get('brothersPending').get('length');
    }.property('brothersPending'),

    actions: {
        interview: function(id) {
            var answer = Ember.$('#answer' + id)[0].value;
            var year = Ember.$('#year' + id)[0].value;
            var data = {
                pledgeId: this.get('model').pledge.id,
                brotherId: id,
                year: year,
                answer: answer
            };
            var _this = this;
            var brother = _this.get('model').brothers.findBy('id', id);
            Ember.$.post("http://localhost:3000/interview", data).then(function(response) {
                _this.get('model').pledge.reload();
                _this.get('brothersPending').removeObject(brother);
                _this.decrementProperty('numPending');

                if (response.passed) {
                    _this.set('alert', new Ember.Handlebars.SafeString('<div class="alertstuff"><div class="alert alert-success alert-dismissible fade in" id="intSuccess" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '<strong>' + brother.get('name') + ' interview passed!</strong>' +
                        '</div><br></div>'));
                    Ember.$('#intSuccess').fadeIn('slow');
                } else {
                    _this.set('alert', new Ember.Handlebars.SafeString('<div class="alertstuff"><div class="alert alert-danger alert-dismissible fade in" id="intFailed" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                        '<strong>' + brother.get('name') + ' interview failed!</strong>' +
                        '</div><br></div>'));
                    Ember.$('#intFailed').fadeIn('slow');
                }
            });
        }
    }
});