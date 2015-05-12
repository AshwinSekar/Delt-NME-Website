export default DS.Model.extend({
    isMaster: DS.attr('boolean'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    numberInterviewsDone: DS.attr('number'),
    brothersInterviewed: DS.attr(),
    name: DS.attr('string'),
    email: DS.attr('string'),
    password: DS.attr('string'),
    password_confirmation: DS.attr('string'),
    apiKeys: DS.hasMany('apiKey'),
    errors: {}
});