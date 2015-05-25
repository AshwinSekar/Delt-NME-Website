import Ember from 'ember';

export function progressBar(value, options) {
    var percentage = Math.floor((value[0] / value[1]) * 100) + "%";
    if (percentage === "100%") {
        return new Ember.Handlebars.SafeString('<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="' + value[0] +
            '" aria-valuemin="0" aria-valuemax="' + value[1] + '" style="min-width: 2em; width: ' + percentage +
            '">' + value[0] + '/' + value[1] + '</div>');
    } else {
        return new Ember.Handlebars.SafeString('<div class="progress-bar progress-bar-striped progress-bar-info" role="progressbar" aria-valuenow="' + value[0] +
            '" aria-valuemin="0" aria-valuemax="' + value[1] + '" style="min-width: 2em; width: ' + percentage +
            '">' + value[0] + '/' + value[1] + '</div>');
    }
}

export default Ember.HTMLBars.makeBoundHelper(progressBar);