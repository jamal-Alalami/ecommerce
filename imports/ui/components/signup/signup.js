import { Template } from 'meteor/templating';

import './signup.html';

Template.signup.events({
  'click .logout'(event) {
    Meteor.logout();
  },


});

AccountsTemplates.addField({
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
});
