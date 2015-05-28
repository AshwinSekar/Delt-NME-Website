import DS from 'ember-data';

export default DS.Model.extend({
    isMaster: DS.attr('boolean'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    numberInterviewsDone: function() {
        return this.get('brothersInterviewed').get('length');
    }.property('brothersInterviewed'),
    numberInterviewsFailed: function() {
        return this.get('brothersFailed').get('length');
    }.property('brothersFailed'),
    brothersInterviewed: DS.hasMany('brother'),
    brothersFailed: DS.hasMany('brother'),
    isEditing: DS.attr('boolean'),
    name: function() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    apiKeys: DS.hasMany('apiKey'),
    errors: {}
});