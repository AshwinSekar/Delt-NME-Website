import App from '../app';

export default App.AuthenticatedPledgeRoute.extend({

    model: function() {
        return this.store.find('brother').then(function(brothers) {
            brothers.forEach(function(brother) {
                brother.rollback();
            });
            return brothers;
        });
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
    }

});