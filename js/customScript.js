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
    setAmountByCurrency(currency);
};


var setSAARC = function () {
    let currency = 'Rs';
    document.getElementById('currency').textContent = currency;
    setAmountByCurrency(currency);
};

var setUSD = function () {
   // currency = document.getElementById('customCurrency').textContent = '$';
    let currency = '$';
    document.getElementById('currency').textContent = currency;
    setAmountByCurrency(currency);
};

var amountMap = {
    "$": {"11": 72, "12": 150, "13": "NA", "21": 120, "22": 270,"23": "NA", "31": 300, "32": 675,"33":"NA", "41": 6000, "42": 15000 , "43":"NA"},
    "₹": {"11": 1200, "12": 3000, "13":600 ,"21": 2100, "22": 5250,"23":1050, "31": 5400, "32": 13500,"33":"NA", "41": 60000, "42": 150000,"43":"NA"},
    "Rs": {"11": 1800, "12": 3600, "13":"NA" ,"21": 3300, "22": 6450,"23":"NA", "31": 8400, "32": 16500,"33":"NA", "41": 72000, "42": 165000,"43":"NA"}
};

var setAmountByCurrency = function (currency) {
    //reset the selection and set the values
    clearPaymentSelection();

    document.getElementById('11').textContent = currency + getAmountForOpField('11',currency);
    document.getElementById('12').textContent = currency + getAmountForOpField('12',currency);
    document.getElementById('13').textContent = currency + getAmountForOpField('13',currency);
    document.getElementById('21').textContent = currency + getAmountForOpField('21',currency);
    document.getElementById('22').textContent = currency + getAmountForOpField('22',currency);
    document.getElementById('23').textContent = currency + getAmountForOpField('23',currency);
    document.getElementById('31').textContent = currency + getAmountForOpField('31',currency);
    document.getElementById('32').textContent = currency + getAmountForOpField('32',currency);
    document.getElementById('33').textContent = currency + getAmountForOpField('33',currency);
    document.getElementById('41').textContent = currency + getAmountForOpField('41',currency);
    document.getElementById('42').textContent = currency + getAmountForOpField('42',currency);
    document.getElementById('43').textContent = currency + getAmountForOpField('43',currency);
};


var getAmountForOpField = function (fieldName,currency) {
    return amountMap[currency][fieldName];
};


var clearPaymentBox = function () {
    document.getElementById('op1').classList.remove('active');
    document.getElementById('op2').classList.remove('active');
    document.getElementById('op3').classList.remove('active');
};

var clearPaymentSelection = function () {
    $.each($('#selectable td'), function(idx, val) {
        $(this).removeClass('ui-selected');
    });
};


var updateButtonTextAmount = function(amount,currency){
    document.getElementById('btn_pay').textContent = "Pay "+currency+" "+amount;
    setBillingAmount(amount);
}

var updateButtonState = function (value) {
    switch (value) {
        case 'op1':setActive('op1');setInactive('op2');setInactive('op3'); break;
        case 'op2':setInactive('op1');setActive('op2');setInactive('op3'); break;
        case 'op3':setInactive('op1');setInactive('op2');setActive('op3'); break;
    }
    updateBtnPayAmount();
}


var updateBtnPayAmount = function (currency, mapValue) {

    amount = getValueFromAmountMap(currency, mapValue);

    setBillingAmount(amount);
    updateButtonTextAmount(amount,currency);
}

var getValueFromAmountMap = function (currency, mapValue) {
    console.log("mapvalue"+mapValue+"currency"+currency);
    return amountMap[currency][mapValue];

}

var getSelectedCurency = function () {
    return document.getElementById('currency').innerText;
}

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

var isAmountSet = function (elementId) {
    var amountValue = getSelectedValue(elementId);
    console.log("amount",amountValue);
    if(amountValue==="0"){
        console.log("false"); return false;
    }else {
        console.log("true");
        return true;
    }
};



var isAmountSet = function (elementId) {
    var amountValue = getSelectedValue(elementId);
    if(amountValue==="0"){
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


var hideSubscriptionBox = function () {
    document.getElementById('subscriptionBox').hidden = true;
}

var showSubscriptionBox = function () {
    document.getElementById('subscriptionBox').hidden = false;
}

var hideGSTfield = function () {
    document.getElementById('gstField').hidden = true;
}

var showGSTfield = function () {
    document.getElementById('gstField').hidden = false;
}

var checkFields = function () {
    if(ifAllFilled()){
        clickSubmit();
        return true;
    }
};

function clickSubmit() {
    document.getElementById("submit").click();
}


var ifAllFilled = function() {
    var check = true;

    if(!hasValue("billing_name")){check = false;}

    if(!hasValue("billing_address")){check = false;}
    if(!hasValue("billing_city")){check = false;}
    if(!hasValue("billing_state")){check = false;}
    if(!hasValue("billing_zip")){check = false;}

    if(!isValueSelected("billing_country")){check = false;}
    if(!hasValue("contactNumber")){check = false};
    if(!hasValue("currency")){check = false};
    if(!isNotBlank("emailId")){check = false};

    if(!isChecked("subscriptionOption1") && !isChecked("subscriptionOption2")){
        check = false
        document.getElementById("subscriptionTypeBox").style.border = "solid 1px red";
    }else {
        document.getElementById("subscriptionTypeBox").style.border = "";
    };

    if(!isNotBlank("amount")||!isAmountSet("amount")){
        check = false
        document.getElementById("selectable").style.border = "solid 3px red";
    }else{
        document.getElementById("selectable").style.border = "";
    }

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