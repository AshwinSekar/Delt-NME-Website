import Ember from 'ember';

export function progressBar(value, options) {
	console.log("interviews done:", value[0]);
	console.log("interviews total:", value[1]);
	var percentage = Math.floor((value[0]/value[1]) * 100) + "%";
    return new Ember.Handlebars.SafeString('<div class="progress-bar" role="progressbar" aria-valuenow="' + value[0] +
    									   '" aria-valuemin="0" aria-valuemax="' + value[1] + '" style="width: ' + percentage +
    									   '"> </div>');
}

export default Ember.HTMLBars.makeBoundHelper(progressBar);