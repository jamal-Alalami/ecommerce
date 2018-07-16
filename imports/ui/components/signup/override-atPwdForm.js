import {Template } from 'meteor/templating';
Template['override-atPwdForm'].replaces('atPwdForm');

Template.atPwdForm.events({
  'submit .userform'(event) {
    event.preventDefault();
    $(".modal-backdrop").removeClass("modal-backdrop");
  },
});
