import App from '../app';

export default App.AuthenticatedMasterRoute.extend({

	setupController: function() {
        this.controllerFor('application').setProperties({
            isHome: false,
            isSchedule: false,
            isExam: false,
            isUpdateP: true,
            isUpdateB: false,
            isProfile: false,
            isInterview: false
        });
    }

});
