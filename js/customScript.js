

var addOption = function (text, selectElement) {
    var option = document.createElement("option");
    option.text = text;
    selectElement.add(option);
};

var setActive = function (option) {
    document.getElementById(option).classList.add('active');
};

var setInactive = function (option) {
    document.getElementById(option).classList.remove('active');
};

var setINR = function () {
    // currency = document.getElementById('customCurrency').textContent = '₹';
    let currency = '₹';
    document.getElementById('currency').textContent = currency;
    // setAmountByCurrency(currency);
};


var setSAARC = function () {
    let currency = '₹';
    document.getElementById('currency').textContent = currency;
    // setAmountByCurrency(currency);
};

var setUSD = function () {
   // currency = document.getElementById('customCurrency').textContent = '$';
    let currency = '$';
    document.getElementById('currency').textContent = currency;
    // setAmountByCurrency(currency);
};

// var amountMap = {
//     "$": {"11": 72, "12": 150, "13": "NA", "21": 120, "22": 270,"23": "NA", "31": 300, "32": 675,"33":"NA", "41": 6000, "42": 15000 , "43":"NA"},
//     "₹": {"11": 1200, "12": 3000, "13":600 ,"21": 2100, "22": 5250,"23":1050, "31": 5400, "32": 13500,"33":"NA", "41": 60000, "42": 150000,"43":"NA"},
//     "Rs": {"11": 1800, "12": 3600, "13":"NA" ,"21": 3300, "22": 6450,"23":"NA", "31": 8400, "32": 16500,"33":"NA", "41": 72000, "42": 165000,"43":"NA"}
// };




var updateButtonTextAmount = function(amount,currency){
    document.getElementById('btn_pay').textContent = "Pay "+currency+" "+amount;
    setBillingAmount(amount);
}


var updateBtnPayAmount = function (currency, amount) {

    setBillingAmount(amount);
    updateButtonTextAmount(amount,currency);
}

var getSelectedCurrency = function () {
    return document.getElementById('currency').innerText;
}

 function getCurrency(){
    console.log("currency=",document.getElementById('currency').innerText);
    return document.getElementById('currency').innerText;
};

var setBillingAmount = function (value) {
    setElementValue('amount',value);
};

var setAmountType = function (currency) {
    if(currency==='INR'){
        setINR();
    }else if(currency === 'SAARC'){
        setSAARC();
    }
    else{
        setUSD();
    }
}

var setElementValue = function (id, value) {
    document.getElementById(id).value = value;
};

var setElementValueWithURL = function (id, value) {
    setElementValue(id, baseServerURL + value);
};

var setSubmitButtonState = function (enabled) {
    var submitButton = document.getElementById('btn_pay');
    submitButton.disabled = !enabled;
};

var enableSubmitIfAllFilled = function () {
    console.log("paymentfield",arePaymentFieldsSelected(),"non-payment",areNonPaymentFieldsSelected());
    setSubmitButtonState(arePaymentFieldsSelected() && areNonPaymentFieldsSelected());
};

var areNonPaymentFieldsSelected = function () {
    return hasValue("billing_name") && hasValue("billing_address") && hasValue("billing_city") && hasValue("billing_state") && hasValue("billing_zip") && hasValue("billing_tel");
};

var arePaymentFieldsSelected = function () {
    return  isValueSelected("billing_country") && hasValue("currency") && isAmountSet("amount");
};

function isValidEmail()
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("emailId").value))
    {
        return true
    }else{
        return false
    }
}



var isAmountSet = function (elementId) {
    var amountValue = getSelectedValue(elementId);
    if(parseInt(amountValue) === 0){
        document.getElementById(elementId).style.borderColor="red";
        return false;
    }else {
        document.getElementById(elementId).style.borderColor="";
        return true;
    }
};

var isValueSelected = function (elementId) {
    if(document.getElementById(elementId).selectedIndex !== 0){
        document.getElementById(elementId).style.borderColor="";
        return  true;
    }else {
        document.getElementById(elementId).style.borderColor="red";
        return false
    }
    // return document.getElementById(elementId).selectedIndex !== 0;
};

var hasValue = function (elementId) {
    if(getSelectedValue(elementId) !== ''){
        document.getElementById(elementId).style.borderColor="";
        return true;
    }else {
        document.getElementById(elementId).style.borderColor="red";
        return false;
    }
    // return getSelectedValue(elementId) !== '';
};

var getSelectedValue = function (elementId) {
    return document.getElementById(elementId).value;
};

var checkFields = function () {
    if(ifAllFilled()){
        clickSubmit();
        return true;
    }
};



function getAmountFromJson() {

    let subscriberType = $("input[name=subscriberType]:checked").val();
    let years = $("input[name=timePeriod]:checked").val();
    // let paymentType = $("input[name=paymentType]:checked").val();
    let paymentType = "OneTime";
    let countryType = getCountryType();

    // console.log("values> subtype=",subscriberType," years = ",years, " paymentType = ",paymentType, " countryType = ",countryType);

    var amountData = getAmountMap();
    var amountObject = _.find(amountData,function (data) {
        return (data.subscriberType === subscriberType && data.years === years && data.paymentType === paymentType && data.countryType === countryType);
    });
    
    if(!_.isUndefined(amountObject)){
        // console.log(amountObject.amount);
        return amountObject.amount;
    }else{
        return 0;
    }
};


function getCountryType() {
    let country = document.getElementById("billing_country").value;

    if (country === "India") {
        return "India";
    } else if (country === "Select") {
        return  "";
    } else if (isSAARCountry(country)){
        return "SAARC";
    }
    else {
        return "International";
    }
}



function setOptions() {

    if(isStudent()){
        disableRadioOption("timePeriod4");
        disableRadioOption("timePeriod3");
        resetRadioButton("timePeriod","timePeriod4");
        resetRadioButton("timePeriod","timePeriod3");
        // $('input[name=timePeriod]').attr('checked',false);
    }
    else{
        enableRadioOption("timePeriod4");
        enableRadioOption("timePeriod3");
    }
    updateBtnPayAmount(getCurrency(), getAmountFromJson())
}

function isStudent() {
    let subscriberType = $("input[name=subscriberType]:checked").val();
    if(subscriberType === "student"){
        return true;
    }else {
        return false;
    }
}

function clickSubmit() {
    document.getElementById("submit").click();
}


var ifAllFilled = () => {
    let check = true;

    if(!hasValue("billing_name")){check = false;}

    if(!hasValue("billing_address")){check = false;}
    if(!hasValue("billing_city")){check = false;}
    if(!hasValue("billing_state")){check = false;}
    if(!hasValue("billing_zip")){check = false;}

    if(!isValueSelected("billing_country")){check = false;}
    if(!hasValue("contactNumber")){check = false};
    if(!hasValue("countryCode")){check = false };
    if(!hasValue("FinalCurrency")){check = false};
    if(!isNotBlank("emailId")){check = false};
    if (!isValidEmail()){
        check = false;
        document.getElementById("emailId").style.border = "solid 1px red";
    }

    if(!isChecked("subscriptionOption1") && !isChecked("subscriptionOption2")){
        check = false
        document.getElementById("subscriptionTypeBox").style.border = "solid 1px red";
    }else {
        document.getElementById("subscriptionTypeBox").style.border = "";
    };


    if(!isChecked("subscriberType1") && !isChecked("subscriberType2") && !isChecked("subscriberType3") ){
        check = false
        document.getElementById("subscriberTypeBox").style.border = "solid 1px red";
    }else {
        document.getElementById("subscriberTypeBox").style.border = "";
    };

    if(!isChecked("timePeriod1") && !isChecked("timePeriod2") && !isChecked("timePeriod3")&& !isChecked("timePeriod4") ){
        check = false
        document.getElementById("timePeriodBox").style.border = "solid 1px red";
    }else {
        document.getElementById("timePeriodBox").style.border = "";
    };

    if(!isAmountSet('amount')){
        check = false;
        setSubmitButtonState('false')
    }else{
        setSubmitButtonState('true');
    }

    // if(!isChecked("paymentType1") && !isChecked("paymentType2")){
    //     check = false
    //     document.getElementById("paymentTypeBox").style.border = "solid 1px red";
    // }else {
    //     document.getElementById("paymentTypeBox").style.border = "";
    // };
    console.log("check",check);
    return check;
};

var isChecked = function (elementId) {
    return document.getElementById(elementId).checked;
};


var isNotBlank = function (elementID) {
    if(document.getElementById(elementID).value ==""){
        document.getElementById(elementID).style.borderColor="red";
        return false;
    }else{

        document.getElementById(elementID).style.borderColor="";
        return true;
    }
};


function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
};

var hideTableColumn  = function (columnNumber) {
    $('#selectable tr > *:nth-child('+columnNumber+')').hide();
};

var showTableColumn  = function (columnNumber) {
    $('#selectable tr > *:nth-child('+columnNumber+')').show();
};


var isSAARCountry = function (country) {
    console.log("here=",country);
    if(country === 'Bangladesh' || country === 'Bhutan' || country === 'Maldives'|| country === 'Nepal' || country === 'Pakistan' || country === 'Sri Lanka')
    {
        console.log("true");
        return true;
    }else{
        console.log("false");

        return false;
    }

};


function disableRadioOption(optionName) {
    document.getElementById(optionName).disabled = true;
}

function enableRadioOption(optionName) {
    document.getElementById(optionName).disabled = false;
}

function resetRadioButton(optionName,id) {
    $('input[name="'+optionName+'"][id="'+id+'"]').prop("checked", false);

    // $('input[name=timePeriod][id=timePeriod3]').attr('checked',false);


}