import '../imports/api/products.js'; // allow server to load products.js
import '../imports/api/order.js'; 

import '../imports/ui/components/stripe/stripes.js';
Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/public/tmp',
    uploadDir: process.env.PWD + '/public/',
    checkCreateDirectories: true //create the directories for you
  });
});
