import App from '../app';

export default App.AuthenticatedMasterRoute.extend({

    model: function() {
        return this.store.find('pledge');
    },

	setupController: function(controller,model) {
        this._super(controller,model);
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
