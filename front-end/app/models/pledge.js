import DS from 'ember-data';

export default DS.Model.extend({
    isMaster: DS.attr('boolean'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    numberInterviewsDone: DS.attr('number'),
    brothersInterviewed: DS.attr(),
    isEditing: DS.attr('boolean'),
    name: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    apiKeys: DS.hasMany('apiKey'),
    errors: {}
});