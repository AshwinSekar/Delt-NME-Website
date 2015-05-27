var brother = function(firstName, lastName, year, question, answer, fa1, fa2, fa3, fa4) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.year = year;
	this.question = question;
	this.answer = answer;
	this.falseAnswer1 = fa1;
	this.falseAnswer2 = fa2;
	this.falseAnswer3 = fa3;
	this.falseAnswer4 = fa4;
	this.timestamp = Date.now().toString();
	this.id = this.timestamp;
	this.isEditing = false;
	this.errors = {};
	this.pledges = [];
}

module.exports = brother;