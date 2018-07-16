import { Products } from './imports/api/products.js';
import { Order } from './imports/api/order.js';
import { Meteor } from 'meteor/meteor';
Router.route('/', {
  waitOn : [function(){
    return [Meteor.subscribe('products'),Meteor.subscribe('orders')]
  }],
  layoutTemplate: 'mainLayout',
  action: function () {
  // render all templates and regions for this route
Meteor.subscribe('products');Meteor.subscribe('orders')
  this.render("homepage", {to: "main"});
},

});

Router.route('/addItem', {
  layoutTemplate: 'mainLayout',
  action: function () {
    // render all templates and regions for this route
    this.render("addItem", {to: "main"});
}
});

Router.route('/editItem/:_id',{
  layoutTemplate: 'mainLayout',
  action: function () {
    Meteor.subscribe('item', this.params._id);

    this.render("editItem", {to: "main"});
  },
  data: function () {

    return Products.findOne({_id: this.params._id});
  }
});

Router.route('/myItems', {
  layoutTemplate: 'mainLayout',
  action: function () {
    // render all templates and regions for this route
    Meteor.subscribe('user.myItems');
    this.render("myItems", {to: "main"});
  },
  data: function () {
    return {products: Products.find({owner: Meteor.userId()})};
  }
});



Router.route('/stripe', {
  layoutTemplate: 'mainLayout',
  action: function () {
    // render all templates and regions for this route
    this.render("stripe", {to: "main"});
}
});
