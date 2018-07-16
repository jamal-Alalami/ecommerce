import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';

import { check } from 'meteor/check';

export const Products = new Mongo.Collection('products');


productsSchema = new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  description: {
    type: String,
    label: 'description'
  },
  price: {
    type: Number,
    label: 'Price'
  },
  imagePath: {
    type: String,
    label: 'image'
  },
  owner: {
    type: String,
    label: "owner",
    autoValue: function() {
      return this.userId;
    }
  },
  username: {
    type: String,
    label: 'username',
    autoValue: function(){
      return this.username;
    }
  },
  careatedAt: {
    type: Date,
    label: 'careated At',
    autoValue: function() {
      return new Date();
    }
  }
});

Products.attachSchema( productsSchema );
// This code Run only on the server

if ( Meteor.isServer ) {

    Meteor.publish('products', function () {
      return Products.find({});
    });

    Meteor.publish('item', function (itemId) {
      check(itemId, String);
      return Products.find({_id: itemId});
    });

    Meteor.publish('user.myItems', function(){
      return Products.find({owner: this.userId});
    });

    Meteor.methods({
      'item.insert'(obj) {
        check(obj.title, String);
        check(obj.description, String);
        check(obj.imagePath, String);
        check(obj.price, String);

        if ( !Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }

        Products.insert(obj);

      },
      'item.remove'(itemId) {
        check(itemId, String);

        Products.remove(itemId);
      },
      'item.update'(itemId, obj) {

        check(obj.title, String);
        check(obj.description, String);
        check(obj.imagePath, String);
        check(obj.price, String);

        if ( !Meteor.userId()) {
          throw new Meteor.Error(401,'not-authorized');
        }

        Products.update(itemId, { $set: { title: obj.title, description: obj.description, imagePath: obj.imagePath, price: obj.price } });
      },
    });

}
