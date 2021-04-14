<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>IJME Subscription Form</title>

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
          integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <link rel="stylesheet" href="css/customStyle.css">


    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
            integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
            crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
            integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
            crossorigin="anonymous"></script>

    <script src="js/selectable.table.min.js"></script>

    <script src="https://unpkg.com/selectable.js@latest/selectable.min.js"></script>

    <script type="text/javascript" src="js/moment.js"></script>
    <script type="text/javascript" src="js/lodash-min.js"></script>
    <script type="text/javascript" src="js/countries.js"></script>
    <script type="text/javascript" src="amountMap.js"></script>

    <script src="js/customScript.js"></script>

    <script>
        var countryList = countries();
        var amount = "0";
        var currency = "$";
        var baseServerURL = 'https://ijme.in/IjmeSubscriptionForm/';

        var displayCountries = function () {
            var selectElement = document.getElementById("billing_country");
            addOption('Select', selectElement);
            var allCountries = _.sortBy(countryList["low"].concat(countryList["low-middle"], countryList["upper-middle"], countryList["high"]));
            allCountries.forEach(function (country) {
                addOption(country, selectElement)
            });
        };

        var countrySelected = function () {
            var country = document.getElementById("billing_country").value;
            var currency = "USD";
            if (country === "India") {
                currency = "INR";
                enableRadioOption('subscriberType3');
                updateBtnPayAmount("₹", getAmountFromJson())
            } else if (country === "Select") {
                currency = "";
                disableRadioOption('subscriberType3');
                resetRadioButton('subscriberType','subscriberType3');
                resetRadioButton("timePeriod",'timePeriod3');
                resetRadioButton("timePeriod",'timePeriod4');

            } else if (isSAARCountry(country)) {
                currency = "SAARC";
                disableRadioOption('subscriberType3');
                resetRadioButton('subscriberType','subscriberType3');
                resetRadioButton("timePeriod",'timePeriod3');
                resetRadioButton("timePeriod",'timePeriod4');
                updateBtnPayAmount("₹", getAmountFromJson())
            } else {
                currency = "USD";
                disableRadioOption('subscriberType3');
                resetRadioButton('subscriberType','subscriberType3');
                resetRadioButton("timePeriod",'timePeriod3');
                resetRadioButton("timePeriod",'timePeriod4');
                updateBtnPayAmount("$", getAmountFromJson())
            }

            if (currency === "INR") {
                document.getElementById("FinalCurrency").value = "INR";
            } else if (currency === "SAARC") {
                document.getElementById("FinalCurrency").value = "INR";
            } else {
                document.getElementById("FinalCurrency").value = "USD";
            }
            setAmountType(currency);
            setFinalAmount();
        };

        var setFinalAmount = function () {
            document.getElementById("amount").value = amount;
        }

        var setBillingTel = function () {
            var code = document.getElementById("countryCode").value;
            var number = document.getElementById("contactNumber").value;
            document.getElementById("billing_tel").value = code + number;
            enableSubmitIfAllFilled();
        }


    </script>

    <script>
        window.onload = function () {
            displayCountries();
            setElementValue('tid', moment().format('YYMMDDhhmmss'));
            setElementValue("order_id", '00000000000000' + moment().format('YYYYMMDDhhmmssss'));
            setElementValueWithURL('redirect_url', 'ccavResponseHandler.php');
            setElementValueWithURL('cancel_url', 'ccavResponseHandler.php');


            $("#selectable").selectable({
                filter: 'td',
                selected: function (event, ui) {
                    console.log(ui.selected.id);
                    updateBtnPayAmount(getSelectedCurrency(), ui.selected.id);
                }
            });

            $(function () {
                $("#selectable").selectable({
                    selecting: function (event, ui) {
                        if ($(".ui-selected, .ui-selecting").length > 1) {
                            $(ui.selecting).removeClass("ui-selecting");
                        }
                    }
                });
            });

        };
    </script>

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"/>

    <script src="https://code.jquery.com/jquery-1.9.1.js"></script>

    <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>


</head>
<body>

<nav class="navbar">
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 i-header-logo">
        <a href="https://ijme.in"><img src="https://ijme.in/wp-content/themes/ijme/images/logo.jpg" alt="Page Header"
                                       class="ijmelogo"></a>
    </div>
</nav>


<div class="container">
    <div class="card">
        <div class="card-header">
            Subscription Form
        </div>
        <form method="post" action="ccavRequestHandler.php" role="form">
            <div class="card-body">
                <h5 class="card-title">Please Enter the following details</h5>
                <!--Personal Details -->
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="billing_name">Name*</label>
                        <input type="text" name="billing_name" id="billing_name" class="form-control" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="billing_address">Address*</label>
                    <input type="text" name="billing_address" class="form-control" id="billing_address" required>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="billing_city">City*</label>
                        <input type="text" name="billing_city" class="form-control" id="billing_city" required>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="billing_state">State*</label>
                        <input type="text" name="billing_state" id="billing_state" class="form-control" required>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="billing_zip">Zip/Postal*</label>
                        <input type="text" name="billing_zip" class="form-control" id="billing_zip" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="billing_country">Country*</label>
                        <select id="billing_country" name="billing_country" class="form-control"
                                onchange="countrySelected()" required>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="designation">Designation</label>
                        <input type="text" name="designation" id="designation" class="form-control">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="organisation">Organisation</label>
                        <input type="text" name="organisation" id="organisation" class="form-control">
                    </div>
                </div>

                <div class="form-row">
                    <div class="col-sm-12 col-md-6">
                        <label for="countryCode">Contact Phone Number</label>
                        <div class="input-group mb-3" id="contact-container">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">+</span>
                            </div>
                            <input type="text" id="countryCode" class="form-control col-2" aria-label="Country Code"
                                   aria-describedby="basic-addon1" maxlength="3" onkeypress="return isNumberKey(event)">
                            <input type="text" id="contactNumber" class="form-control col-auto"
                                   aria-label="Country Code" aria-describedby="basic-addon1" onchange="setBillingTel()"
                                   maxlength="10" onkeypress="return isNumberKey(event)">
                        </div>
                    </div>

                </div>

                <div class="form-row">
                    <div class="col-sm-12 col-md-6">
                        <label for="emailId">Email ID</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text"><i class="fa fa-envelope text-info"></i></div>
                            </div>
                            <input type="email" class="form-control" id="emailId" name="billing_email" required>
                        </div>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-sm-12 col-md-6" id="subscriptionTypeBox">
                        <div><label>Subscription Type*</label></div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="subscriptionOption1" name="subscriptionType"
                                   class="custom-control-input" value="new">
                            <label class="custom-control-label" for="subscriptionOption1">New</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="subscriptionOption2" name="subscriptionType"
                                   class="custom-control-input" value="renew">
                            <label class="custom-control-label" for="subscriptionOption2">Renewal</label>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-12" id="subscriberTypeBox">
                        <div><label>Subscriber Type*</label></div>
                        <div class="custom-control custom-radio custom-control-inline" >
                            <input type="radio" id="subscriberType1" name="subscriberType" class="custom-control-input"
                                   value="individual" onclick="setOptions()">
                            <label class="custom-control-label" for="subscriberType1">Individual</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="subscriberType2" name="subscriberType" class="custom-control-input"
                                   value="institutional" onclick="setOptions()">
                            <label class="custom-control-label" for="subscriberType2">institutional</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="subscriberType3" name="subscriberType" class="custom-control-input"
                               value="student" onclick="setOptions()">
                        <label class="custom-control-label" for="subscriberType3">Student</label>
                        </div>
                </div>
            </div>
                <div class="form-row">
                    <div class="form-group col-md-12" id="journalTypeBox">
                        <div><label>Journal Type*</label></div>
                        <div class="custom-control custom-radio custom-control-inline" >
                            <input type="radio" id="journalType1" name="journalType" class="custom-control-input"
                                   value="Print copy" onclick="setOptions()">
                            <label class="custom-control-label" for="journalType1">Print copy</label>
                        </div>
                        <div class="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="journalType2" name="journalType" class="custom-control-input"
                                   value="E copy (pdf)" onclick="setOptions()">
                            <label class="custom-control-label" for="journalType2">E copy (pdf)</label>
                        </div>
                    </div>
                </div>
            <div class="form-row">
                <div class="form-group col-sm-12 col-md-12" id="timePeriodBox">
                    <div><label>Time Period*</label></div>
                    <div class="custom-control custom-radio custom-control-inline" onclick="setOptions()">
                        <input type="radio" id="timePeriod1" name="timePeriod" class="custom-control-input" value="1">
                        <label class="custom-control-label" for="timePeriod1">One year</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline" onclick="setOptions()">
                        <input type="radio" id="timePeriod2" name="timePeriod" class="custom-control-input" value="2">
                        <label class="custom-control-label" for="timePeriod2">Two year</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline" onclick="setOptions()">
                        <input type="radio" id="timePeriod3" name="timePeriod" class="custom-control-input" value="5">
                        <label class="custom-control-label" for="timePeriod3">Five year</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline" onclick="setOptions()">
                        <input type="radio" id="timePeriod4" name="timePeriod" class="custom-control-input"
                               value="life">
                        <label class="custom-control-label" for="timePeriod4">Life</label>
                    </div>
                </div>
            </div>
            <!--                <div class="form-row">-->
            <!--                    <div class="col-sm-12 col-md-12" id="paymentTypeBox" >-->
            <!--                        <div> <label>How do you want to make the payment*</label></div>-->
            <!--                        <div class="custom-control custom-radio custom-control-inline" onclick="setOptions()">-->
            <!--                            <input type="radio" id="paymentType1" name="paymentType" class="custom-control-input" value="OneTime">-->
            <!--                            <label class="custom-control-label" for="paymentType1">One time</label>-->
            <!--                        </div>-->
            <!--                        <div class="custom-control custom-radio custom-control-inline" onclick="setOptions()">-->
            <!--                            <input type="radio" id="paymentType2" name="paymentType" class="custom-control-input" value="Yearly">-->
            <!--                            <label class="custom-control-label" for="paymentType2">Yearly</label>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </div>-->
    </div>

    <!--            <div class="card-body" id="subscriptionBox">-->
    <!--                                <h6 class="card-title">Please choose the subscription below:</h6>-->
    <!--               <table class="table table-bordered" id="selectable">-->
    <!--                   <thead>-->
    <!--                    <tr>-->
    <!--                       <th valign="top"></th>-->
    <!--                       <th valign="top" data-selectable="column"><strong>Individual</strong></th>-->
    <!--                       <th valign="top" data-selectable="column"><strong>Institutional</strong></th>-->
    <!--                       <th valign="top" data-selectable="column"><strong>Student</strong></th>-->
    <!--                    </tr>-->
    <!--                   </thead>-->
    <!--                   <tbody>-->
    <!--                       <tr>-->
    <!--                           <th valign="top">One Year</th>-->
    <!--                           <td valign="top" id = "11"></td>-->
    <!--                           <td valign="top" id = "12"></td>-->
    <!--                           <td valign="top" id = "13"></td>-->
    <!--                       </tr>-->
    <!--                       <tr>-->
    <!--                           <th valign="top">Two Year</th>-->
    <!--                           <td valign="top" id = "21"></td>-->
    <!--                           <td valign="top" id = "22"></td>-->
    <!--                           <td valign="top" id = "23"></td>-->
    <!--                       </tr>-->
    <!--                       <tr>-->
    <!--                           <th valign="top">Five Year</th>-->
    <!--                           <td valign="top" id = "31"></td>-->
    <!--                           <td valign="top" id = "32"></td>-->
    <!--                           <td valign="top" id = "33"></td>-->
    <!--                       </tr>-->
    <!--                       <tr>-->
    <!--                           <th valign="top">Life</th>-->
    <!--                           <td valign="top" id="41"></td>-->
    <!--                           <td valign="top" id="42"></td>-->
    <!--                           <td valign="top" id="43"></td>-->
    <!--                       </tr>-->
    <!--                   </tbody>-->
    <!--               </table>-->
    <!--            </div>-->


    <div class="card-body">

        <!--                <div class="form-row" id="gstField">-->
        <!--                    <div class="col-sm-12 col-md-6">-->
        <!--                        <label for="gstIn">GST Number(Optional)</label>-->
        <!--                        <input type="text" id="gstIn" class="form-control" aria-describedby="gstHelpBdy">-->
        <!--                    </div>-->
        <!--                </div>-->


        <div class="clearfix"></div>
        <br><br>
        <div class="form-row">
            <div class="btn btn-info btn-lg btn-block" id="btn_pay" onclick="checkFields()">Pay</div>
        </div>

        <input type="text" name="language" value="en" hidden/>
        <input type="text" name="integration_type" value="iframe_normal" hidden/>
        <input type="text" name="redirect_url" id="redirect_url" hidden/>
        <input type="text" name="cancel_url" id="cancel_url" hidden/>
        <input type="text" name="tid" id="tid" hidden/>
        <input type="text" name="merchant_id" value="146983" hidden/>
        <input type="text" name="order_id" id="order_id" hidden/>
        <input type="text" name="currency" id="currency" hidden>
        <input type="text" name="FinalCurrency" id="FinalCurrency" hidden>
        <input type="text" name="amount" id="amount" hidden>
        <input type="text" name="billing_tel" id="billing_tel" hidden>
        <input type="submit" value="Submit" id="submit" hidden>


    </div>
    </form>

</div>

</div>


</body>
</html>