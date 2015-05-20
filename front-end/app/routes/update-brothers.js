import App from '../app';

export default App.AuthenticatedMasterRoute.extend({

    model: function() {
        return this.store.find('brother').then(function(brothers) {
            brothers.forEach(function(brother) {
                brother.rollback();
                brother.set('isEditing', false);
                brother.save();
            });
            return brothers;
        });
    },

    setupController: function(controller, model) {
        this._super(controller,model);
        this.controllerFor('application').setProperties({
            isHome: false,
            isSchedule: false,
            isExam: false,
            isUpdateP: false,
            isUpdateB: true,
            isProfile: false,
            isInterview: false
        });
        controller.set('addding', false);
    }

});