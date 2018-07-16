import { Template } from 'meteor/templating';
import { Products } from '../../../api/products.js'; // import products


Template.myItems.events({
  'click .add'(event){
    $('#title').val('');
    $('#description').val('');
    $('#price').val('');
    $("#imgg").attr("src",'');
    $('#itemId').val(0);
    $("#progressBar").css("width", "0");

  },

});
/* end addItem */
