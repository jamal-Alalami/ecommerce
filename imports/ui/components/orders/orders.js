import { Template } from 'meteor/templating';
import { Cart } from '../cart/cart.js';
import { Order } from '../../../api/order.js';
import { Meteor } from 'meteor/meteor';

import './orders.html';

Template.orders.helpers({
  ordersList(){
    console.log(Order.find({user: Meteor.userId()}).count());
    if (Order.find({user: Meteor.userId()}).count() > 0){
    var orders = Order.find({user: Meteor.userId()});

        var cart ;
        orders = orders.map(function(order) {
            cart = new Cart(order.cart);
            order.cart = cart.genetateArray();
            console.log(order.cart);
            return order;
        });
        console.log(orders);
        return  orders ;
      } else {
        return [];
      }
  },
});
