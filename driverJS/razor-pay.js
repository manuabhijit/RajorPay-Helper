const RAJOR_PAY_APP_KEY = 'rzp_test_AFegzSP1Wjb6Zj';

var RajorPayImport = document.createElement('script');
RajorPayImport.src = 'https://checkout.razorpay.com/v1/checkout.js';
RajorPayImport.setAttribute('data-buttontext', "Pay with Razorpay");
RajorPayImport.setAttribute('data-name', "GST EDGE");
RajorPayImport.setAttribute('data-description', "https://your-awesome-site.com/your_logo.jpg");
RajorPayImport.setAttribute('data-theme.color', "#F37254");
document.head.appendChild(RajorPayImport);

var RajorPay = {
  configuration:{
    configState: false
  },
  config: function(){
    RajorPay.configuration.configState = true;
  },
  pay: function (userData, paydata){
    if(RajorPay.validate.userData(userData) !== true){
      console.warn("Invalid userData");
    }
    else if(RajorPay.validate.payData(paydata) !== true){
      console.warn("Invalid payData");
    }
    else{
      RajorPay.openGateway(RajorPay.generateOptions(userData, paydata));

    }
  },
  validate:{
    userData: function (userData){
      console.log("userData", userData);
      return true;
    },
    payData: function (paydata){
      console.log("paydata", paydata);
      return true;
    }
  },

  generateOptions: function(userData, paydata){
    let options = {
        key: RAJOR_PAY_APP_KEY,
        amount: paydata.amount.toString(),
        handler: RajorPay.handler,
        prefill: {
            name: typeof(userData.name) === 'string' ? userData.name : '',
            email: typeof(userData.email) === 'string' ? userData.email: ''
        },
        notes: typeof(userData.notes) === 'object' ? userData.notes : {
          submissionURL: window.location
        } ,
        modal:{
          ondismiss: RajorPay.ondismiss
        }
    };

    console.log("options", options);

    return options;
  },

  openGateway: function (options){
    var razorpayObject = new Razorpay(options);
    razorpayObject.open();
  },

  handler: function (response){
      console.log("Success", response);
      RajorPay.ondismiss.response.success();
  },

  ondismiss : function (){
    console.error("Payment Failure");
    RajorPay.ondismiss.response.success();
  },

  response:{
    success : function (){ console.log("response as success"); },
    failure : function (){ console.log("response as failure"); }
  }
};
