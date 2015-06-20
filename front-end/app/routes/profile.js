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
            isProfile: true,
            isInterview: false
        });
        controller.setProperties({
            email: '',
            password: '',
            confirm: '',
            displayPassError: false,
            displayPassChange: false,
            displayEmailChange: false
        });
    }

});