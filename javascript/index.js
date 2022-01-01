
// Validate Bill Input Field via Event Handler
document.querySelector(".bill input").addEventListener("input", function() {
    var billInputValue = document.querySelector(".bill input").value;

    if (billInputValue == "0" || billInputValue == "") {
        document.querySelector(".bill .error-msg").innerHTML = "Can't be zero";
        document.querySelector(".bill input").style = "outline: 2px solid red";
    } else {
        document.querySelector(".bill .error-msg").innerHTML = "";
        document.querySelector(".bill input").style = "revert";
        splitCalculation();
    }
});

// Validate Number of People Input Field via Event Handler
document.querySelector(".select-people input").addEventListener("input", function() {
    var peopleInputValue = document.querySelector(".select-people input").value;

    if (peopleInputValue == "0" || peopleInputValue == "") {
        document.querySelector(".select-people .error-msg").innerHTML = "Can't be zero";
        document.querySelector(".select-people input").style = "outline: 2px solid red";
    } else {
        document.querySelector(".select-people .error-msg").innerHTML = "";
        document.querySelector(".select-people input").style = "revert";
        splitCalculation();
    }
});

// Validate Custom Percent Input Field via Event Handler
document.querySelector(".select-tip-buttons input").addEventListener("input", function() {
    var customInputValue = document.querySelector(".select-tip-buttons input").value;

    if (customInputValue > 100) {
        document.querySelector(".select-tip .error-msg").innerHTML = "Can't be over 100%";
        document.querySelector(".select-tip-buttons input").style = "outline: 2px solid red";
        document.querySelector(".select-tip-buttons input").style = "background-color: hsl(189, 41%, 97%);";
    } else {
        document.querySelector(".select-tip .error-msg").innerHTML = "";
        document.querySelector(".select-tip-buttons input").style = "revert";
        document.querySelector(".select-tip-buttons input").style = "background-color: hsl(189, 41%, 97%);";
        splitCalculation();
    }
});

// Select Tip % Button functionality
for (i = 0; i < document.querySelectorAll(".select-tip-buttons .tip-percent").length; i++) {
    document.querySelectorAll(".select-tip-buttons .tip-percent")[i].addEventListener("click", function() {
        if (document.getElementById("active-button")) {
            document.getElementById("active-button").removeAttribute("id");
            this.setAttribute("id", "active-button");
            // Check if element is the Custom Input instead of Button and apply custom Style
            if (this.classList.contains("custom")) {
                this.style = "background-color: hsl(189, 41%, 97%);";
            }
            splitCalculation();
        } else {
            this.setAttribute("id", "active-button");
            // Check if element is the Custom Input instead of Button and apply custom Style
            if (this.classList.contains("custom")) {
                this.style = "background-color: hsl(189, 41%, 97%);";
            }
            splitCalculation();
        }
    });
}

// Split Calculation
function splitCalculation() {

        var people = parseFloat(document.querySelector(".select-people input").value);
        var bill = parseFloat(document.querySelector(".bill input").value);

        if (document.querySelector("#active-button").classList.contains("custom")) {
            var tipPercent = parseFloat(document.querySelector("#active-button").value);
        } else {
             var tipPercent = parseFloat(document.querySelector("#active-button").name);
        }

        if (people != 0 && bill != 0) {
            total = bill / people;
            tipAmount = (total * tipPercent) / 100;

            totalRounded = Math.round(total * 100) / 100;
            tipAmountRounded = Math.round(tipAmount * 100) / 100;

            if (isNaN(total) && isNaN(tipAmount)) {
                document.querySelector(".tip-output").innerHTML = "$0.00";
                document.querySelector(".total-output").innerHTML = "$0.00";
            } else if (isNaN(tipAmount)) {
                document.querySelector(".tip-output").innerHTML = "$0.00";
                document.querySelector(".total-output").innerHTML = "$" + totalRounded;
            } else if (isNaN(total)) {
                document.querySelector(".total-output").innerHTML = "$0.00";
                document.querySelector(".tip-output").innerHTML = "$" + tipAmountRounded;
            } else {
                document.querySelector(".tip-output").innerHTML = "$" + tipAmountRounded;
                document.querySelector(".total-output").innerHTML = "$" + totalRounded;
            }
        }
}

// Resets Input Fields and Buttons
function resetButton() {
    document.querySelector(".bill input").value = "";
    document.querySelector(".select-people input").value = "";
    document.getElementById("active-button").removeAttribute("id");
    document.querySelector(".tip-output").innerHTML = "$0.00";
    document.querySelector(".total-output").innerHTML = "$0.00";
}

// Makes sure only Number Keystrokes are accepted for Input Fields
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57)))
        return false;
    return true;
}