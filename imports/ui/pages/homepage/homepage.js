import { Template } from 'meteor/templating';
import { Products } from '../../../api/products.js'; // import products

Template.homepage.helpers({

  products() {
    console.log(Products.find({}));
    return Products.find({});
  },
});
