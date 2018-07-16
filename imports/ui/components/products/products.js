import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'; // import Template to use helpers
import { Session } from 'meteor/session';
import { Cart } from '../cart/cart.js';

import { Products } from '../../../api/products.js'; // import products

import './products.html';

Template.productCard.helpers({
  isOnwer() {
    return this.owner === Meteor.userId();
  },
});

Template.productCard.events({
  'click .update'(){

  },
  'click .delete'(){
    Meteor.call('item.remove', this._id);
  },

  'click .addtocart'(event){
    var cart = new Cart(Session.get('cart') ?Session.get('cart') : {});
    var product = Products.findOne({_id:this._id});
    cart.add(product, this._id);
        Session.setPersistent('cart', cart);
  },
  'click .edit'(event){
    var id=$(event.currentTarget).data("id");

    var products = Products.findOne({_id: id});
    $('#itemId').val(id);
    $('#title').val(products.title);
    $('#description').val(products.description);
    $('#price').val(products.price);
    $("#imgg").attr("src",products.imagePath);
    $("#progressBar").css("width", "0");


  },

})
