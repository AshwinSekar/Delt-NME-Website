import App from '../app';

export default App.AuthenticatedPledgeRoute.extend({

    beforeModel: function() {
        var _this = this;
        this.controllerFor('interview').set('doneLoading', false);
        this.store.find('brother').then(function(brothers) {
            _this.controllerFor('interview').set('brothers', brothers);
            _this.controllerFor('interview').set('doneLoading',true);
        });
    },

    model: function() {
        return this.store.find('pledge', this.controllerFor('application').pledge_id);
    },

    setupController: function(controller, model) {
        this._super(controller,model);
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