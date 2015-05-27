import DS from 'ember-data';

export default DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    name: function() {
        return this.get('firstName') + " " + this.get('lastName');
    }.property('firstName', 'lastName'),
    year: DS.attr('string'),
    question: DS.attr('string'),
    answer: DS.attr('string'),
    falseAnswer1: DS.attr('string'),
    falseAnswer2: DS.attr('string'),
    falseAnswer3: DS.attr('string'),
    falseAnswer4: DS.attr('string'),
    passedPledges: DS.hasMany('pledge', {
        inverse: 'brothersInterviewed'
    }),
    failedPledges: DS.hasMany('pledge', {
        inverse: 'brothersFailed'
    })
});