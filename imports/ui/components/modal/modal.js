import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Cart } from '../cart/cart.js';

import './modal.html';

Template.modal.helpers({
    products() {
        var cart = new Cart(Session.get('cart'));
        console.log({product: cart.genetateArray(), totalPrice: cart.totalPrice});
        return {product: cart.genetateArray(), totalPrice: cart.totalPrice};
    },
    multi : function(a,b){
    return a * b;
  },
});


Template.modal.events({
    'click .remove'(event){
    var cart = new Cart(Session.get('cart') ? Session.get('cart') : {});
    cart.removeItem(this._id);
    Session.setPersistent('cart', cart);
    },
    'click .increment'(event){
    var cart = new Cart(Session.get('cart') ? Session.get('cart') : {});
    cart.incByOne(this._id);
    Session.setPersistent('cart', cart);
    },
    'click .reduce'(event){
    var cart = new Cart(Session.get('cart') ? Session.get('cart') : {});
    cart.reduceByOne(this._id);
    Session.setPersistent('cart', cart);
    },
    'click .check'(event) {
      $('.modalCart .close').click();
    }

});
