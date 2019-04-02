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
}

var setUSD = function () {
   // currency = document.getElementById('customCurrency').textContent = '$';
    let currency = '$';
    document.getElementById('currency').textContent = currency;
    setAmountByCurrency(currency);
}

var amountMap = {
    "$": {"11": 60, "12": 100, "21": 100, "22": 180, "31": 250, "32": 450, "41": 5000, "42": 10000},
    "₹": {"11": 1000, "12": 2000, "21": 1750, "22": 3500, "31": 4500, "32": 9000, "41": 50000, "42": 100000}
};

var setAmountByCurrency = function (currency) {
    //reset the selection and set the values
    clearPaymentSelection();

    document.getElementById('11').textContent = currency + getAmountForOpField('11',currency);
    document.getElementById('12').textContent = currency + getAmountForOpField('12',currency);
    document.getElementById('21').textContent = currency + getAmountForOpField('21',currency);
    document.getElementById('22').textContent = currency + getAmountForOpField('22',currency);
    document.getElementById('31').textContent = currency + getAmountForOpField('31',currency);
    document.getElementById('32').textContent = currency + getAmountForOpField('32',currency);
    document.getElementById('41').textContent = currency + getAmountForOpField('41',currency);
    document.getElementById('42').textContent = currency + getAmountForOpField('42',currency);
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
    enableSubmitIfAllFilled();
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
}

var setAmountType = function (currency) {
    if(currency==='INR'){
        setINR();
    }else{
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

var isValueSelected = function (elementId) {
    return document.getElementById(elementId).selectedIndex !== 0;
};

var hasValue = function (elementId) {
    return getSelectedValue(elementId) !== '';
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