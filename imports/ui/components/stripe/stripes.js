import { Cart } from '../cart/cart.js';
import { Session } from 'meteor/session';

if (Meteor.isClient) {
  Meteor.startup(function(){
    Stripe.setPublishableKey('pk_test_shLbt1EljT6oxr6gKKrPb9ir');
  });

  Template.stripes.events({
    "submit .payment-form": function(event){
      event.preventDefault();

      var cardDetails = {
        "number": event.target.cardNumber.value,
        "cvc": event.target.cardCVC.value,
        "exp_month": event.target.cardExpiryMM.value,
        "exp_year": event.target.cardExpiryYY.value
      }

      Stripe.createToken(cardDetails, function(status, result){
        if(result.error){
          alert(result.error.message);
        }else{
            var cart = new Cart(Session.get('cart'));
          Meteor.call("chargeCard", result.id, cart.totalPrice *100, function(err, response){
            if(err){
              alert(err.message);
            }else{
              var cart = new Cart(Session.get('cart'));
              console.log(cart);
              var orderss = {user: Meteor.userId(), cart: cart, paymentId: result.id, name: Meteor.user().username ,totalPrice: cart.totalPrice  };
              console.log(orderss);
              Meteor.call('order.insert', orderss);
              Session.setPersistent('cart', null);
              alert("You were successfully charged ");

              event.target.cardNumber.value = '';
              event.target.cardCVC.value = '';
              event.target.cardExpiryMM.value = '';
              event.target.cardExpiryYY.value = '';

              $('.closepayment').click();

            }
          })
        }
      })
    }
  })
}

if (Meteor.isServer) {
  var stripe = StripeAPI('sk_test_bQL3unACqC1KhsIlvuXUYwK3');

  Meteor.methods({
    "chargeCard": function(cardToken, totalPrice){
      stripe.charges.create({
        amount: totalPrice,
        currency: "usd",
        source: cardToken
      }, function(err, result){
        if(err){
          throw new Meteor.error(500, "stripe-error", err.message);
        }else{



        }
      })
    }
  })
}
