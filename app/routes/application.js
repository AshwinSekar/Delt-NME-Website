import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        this.store.push('pledge', {
        	id: 0,
            isMaster: false,
            firstName: 'Anav',
            lastName: 'Behl',
            numberInterviewsDone: 2,
            brothersInterviewed: ['David Wu', 'Ashwin Sekar']
        });
        this.store.push('pledge', {
        	id: 1,
        	isMaster: true
        });
    },
    setupController: function(controller) {
        controller.set('model', this.store.find('pledge', 0));
    }
});