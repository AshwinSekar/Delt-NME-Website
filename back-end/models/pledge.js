var pledge = function(isMaster, firstName, lastName, numberInterviewsDone, brothersInterviewed, name, email, password, password_confirmation, apiKeys, errors) {
	this.isMaster = isMaster;
	this.firstName = firstName;
	this.lastName = lastName;
	this.numberInterviewsDone = numberInterviewsDone;
	this.brothersInterviewed = brothersInterviewed;
	this.name = name;
	this.email = email;
	this.password = password;
	this.password_confirmation = password_confirmation;
	this.apiKeys = apiKeys;
	this.errors = errors;	
	this.timestamp = Date.now().toString();
	this.id = this.timestamp;
}

module.exports = pledge;