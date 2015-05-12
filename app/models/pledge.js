export default DS.Model.extend({
    isMaster: DS.attr('boolean'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    numberInterviewsDone: DS.attr('number'),
    brothersInterviewed: DS.attr()
});