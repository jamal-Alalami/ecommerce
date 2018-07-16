import { Template } from 'meteor/templating';
Template['override-atTextInput'].replaces('atTextInput');

Template.atTextInput.helpers({
  equal : function(a,b){
    return a == b;
  },
});
