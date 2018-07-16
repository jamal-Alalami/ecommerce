import { Template } from 'meteor/templating';
import { Cart } from '../cart/cart.js';
import './header.html';

Template.header.helpers({
  qty() {
      var cart = new Cart(Session.get('cart'));

      return cart.totalQty;
  },
  totalPrice() {
      var cart = new Cart(Session.get('cart'));

      return cart.totalPrice;
  },
})
Template.header.events({
  'click .logout'(event) {
    Meteor.logout();
  },
});
