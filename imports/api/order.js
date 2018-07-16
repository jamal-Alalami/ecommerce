import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Order = new Mongo.Collection('order');


orderSchema = new SimpleSchema({
  user: {
    type: String,
    label: 'user'
  },
  cart: {
    type: Object,
    label: 'cart',
    blackbox:true
  },
  paymentId: {
    type: String,
    label: 'paymentId'
  },
  name: {
    type: String,
    label: 'name'
  },
  totalPrice: {
    type: Number,
    label: 'totalPrice'
  },
  careatedAt: {
    type: Date,
    label: 'careated At',
    autoValue: function() {
      return new Date();
    }
  }
});

Order.attachSchema( orderSchema );
// This code Run only on the server

if ( Meteor.isServer ) {




      Meteor.publish('orders', function () {

        return Order.find({user: this.userId});
      });

    Meteor.methods({
      'order.insert'(obj) {
        check(obj.user, String);
        check(obj.cart, Object);
        check(obj.paymentId, String);
        check(obj.name, String);

        if ( !Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }

        Order.insert(obj);

      },

    });

}
