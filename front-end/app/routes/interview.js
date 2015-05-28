import App from '../app';

export default App.AuthenticatedPledgeRoute.extend({

    model: function() {
        return this.store.find('pledge', this.controllerFor('application').pledge_id);
    },

    setupController: function(controller, model) {
        this._super(controller, model);
        this.controllerFor('application').setProperties({
            isHome: false,
            isSchedule: false,
            isExam: false,
            isUpdateP: false,
            isUpdateB: false,
            isProfile: false,
            isInterview: true
        });
        this.store.find('brother').then(function(brothers) {
            var pending = brothers.filter(function(item) {
                return !(model.get('brothersInterviewed').contains(item) ||
                         model.get('brothersFailed').contains(item));
            });
            controller.set('brothersPending', pending);
            controller.set('numPending', pending.get('length'));
        });
    }

});