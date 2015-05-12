export default DS.Model.extend({
	id: DS.attr('number'),
    isMaster: DS.attr('boolean'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    numberInterviewsDone: DS.attr('number'),
    brothersInterviewed: DS.attr()
});