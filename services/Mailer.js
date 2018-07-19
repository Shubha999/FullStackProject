const sendgrid = require('sendgrid');

// Helper object helps us create the mailer
const helper = sendgrid.mail;
const keys = require('../config/keys');

//we create a class Mailer which extends the.Mail objext to customize the Mailer
//JS class Mailer
class Mailer extends helper.Mail {
	// constructor is executed whenevr a new keyword is used to class the instance of class
	// any arguments used in New keyword is passed on here in the cnstructor
	constructor({ subject, recipients }, content) {
		super();

		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body);
		this.addClickTracking();
		this.addRecipients();
	}

	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	addClickTracking() {
		// create two Helper variables to do little setup
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();

		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);
	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON(),
		});

		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
