import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js'; // import body.js for client

Meteor.startup(function() {
  Uploader.uploadUrl = Meteor.absoluteUrl("upload"); // Cordova needs absolute URL
});
