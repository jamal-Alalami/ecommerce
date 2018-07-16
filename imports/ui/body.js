import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating'; // import Template to use helpers

import { Products } from '../api/products.js'; // import products


import './pages/homepage/homepage.html';
import './pages/items/myItems.html';
import './components/products/products.html';
import './components/header/header.html';
import './components/productModal/productModal.html';
import './components/addToCart/addToCart.html';
import './components/login/login.html';
import './components/modal/modal.html';
import './components/signup/override-atPwdFormBtn.html';
import './components/signup/override-atPwdForm.html';
import './components/stripe/stripes.html';
import './components/orders/orders.html';

import './components/signup/override-atTextInput.html';
import './components/signup/override-atForm.html';
import './components/signup/signup.html';
import './components/cart/cart.html';
import './layouts/mainLayout.html';
import './item.html';

import './pages/homepage/homepage.js';
import './pages/items/myItems.js';
import './components/products/products.js';
import './components/productModal/productModal.js';
import './components/header/header.js';
import './components/signup/signup.js';
import './components/signup/override-atPwdFormBtn.js';
import './components/signup/override-atPwdForm.js';
import './components/cart/cart.js';
import './components/modal/modal.js';
import './components/stripe/stripes.js';
import './components/stripe/stripe.js';
import './components/orders/orders.js';




import './components/signup/override-atTextInput.js';
import './components/signup/override-atForm.js';

import './body.html'; // import html file to send data



/* start addItem */
Template.addItem.events({
  'submit .add-item'(event){
    // Prevent default browser form submit
     event.preventDefault();

     // Get value from form element
    const target = event.target;

    const title = target.title.value;
    const description = target.description.value;
    const price = target.price.value;
    const ad = target.itemId.value;
    const imag = $("#imgg").attr("src");

    var product ={ title: title, description: description, price: price, imagePath: imag, owner: Meteor.userId(), username:

    Meteor.user().username };

    if(ad == 0){

      Meteor.call('item.insert', product);
    } else {
        Meteor.call('item.update', ad, product);
    }


    target.title.value = '';
    target.description.value = '';
    target.price.value = '';

    $(".close").click();
  },
  'click .start': function (e) {
    e.preventDefault();

    Uploader.startUpload.call(Template.instance(), e);
  }
});
/* end addItem */
Template.addItem.created = function() {
  Uploader.init(this);
}

Template.addItem.rendered = function () {
  Uploader.render.call(this);
};


Template.addItem.helpers({
  'infoLabel': function() {
    var instance = Template.instance();

    // we may have not yet selected a file
    var info = instance.info.get()
    if (!info) {
      return;
    }

    var progress = instance.globalInfo.get();

    // we display different result when running or not
    return progress.running ?
      info.name + ' - ' + progress.progress + '% - [' + progress.bitrate + ']' :
      info.name + ' - ' + info.size + 'B';
  },
  'progress': function() {
    return Template.instance().globalInfo.get().progress + '%';
  }
});

/* start editItem */
Meteor._reload.onMigrate(function() {
     return [false];
});
/*
Template.editItem.events({
  'submit .edit-item'(event){
    // Prevent default browser form submit
     event.preventDefault();

     // Get value from form element
    const target = event.target;

    const title = target.title.value;
    const description = target.description.value;
    const price = target.price.value;
    var product ={ title: title, description: description, price: price, imagePath: 'car.jpg', owner: Meteor.userId(), username: Meteor.username };
    Meteor.call('item.update', this._id, product);

    target.title.value = '';
    target.description.value = '';
    target.price.value = '';
    target.myImage.src = '';
    $(".close").click();
  },
});
/* end editItem */
