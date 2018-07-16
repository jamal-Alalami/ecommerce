import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Cart } from '../cart/cart.js';

import './stripes.html';
Template.stripes.helpers({
    totalPrice() {
        var cart = new Cart(Session.get('cart'));
        return  cart.totalPrice;
    },
    userName() {
      if ( Meteor.user()){
      return Meteor.user().username;
    }
    },
    multi : function(a,b){
    return a * b;
  },
});
