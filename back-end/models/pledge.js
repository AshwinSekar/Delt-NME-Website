var jwt = require('jsonwebtoken');
var pledge = function(isMaster, firstName, lastName, numberInterviewsDone, brothersInterviewed, name, email, password, apiKeys, errors) {
    this.isMaster = isMaster;
    this.firstName = firstName;
    this.lastName = lastName;
    this.numberInterviewsDone = numberInterviewsDone;
    this.brothersInterviewed = brothersInterviewed;
    this.name = name;
    this.email = email;
    this.password = password;
    this.apiKeys = apiKeys;
    this.errors = errors;
    this.timestamp = Date.now().toString();
    this.id = this.timestamp;
    this.access_token = jwt.sign({ id: this.id }, 'ayy lmao'); // Super secret key 👽
}

module.exports = pledge;