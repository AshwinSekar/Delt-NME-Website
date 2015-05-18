import App from '../app';

export default App.AuthenticatedPledgeRoute.extend({

	setupController: function() {
        this.controllerFor('application').setProperties({
            isHome: false,
            isSchedule: false,
            isExam: false,
            isUpdateP: false,
            isUpdateB: false,
            isProfile: true,
            isInterview: false
        });
    }

});
