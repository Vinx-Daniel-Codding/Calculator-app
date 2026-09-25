let display = document.getElementById("display");
let previous = document.getElementById("previous");
let historyList = document.getElementById("historyList");

let memory = 0;


/* =========================
   ADD TO DISPLAY
========================= */

function addToDisplay(value) {

    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}


/* =========================
   CLEAR
========================= */

function clearDisplay() {

    display.value = "0";
    previous.textContent = "";
}


/* =========================
   DELETE
========================= */

function deleteLast() {

    if (display.value.length <= 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}


/* =========================
   CALCULATE
========================= */

function calculate() {

    try {

        let expression = display.value;

        let result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!isFinite(result)) {
            throw new Error();
        }

        previous.textContent = expression + " =";

        display.value = Number(result.toFixed(10));

        addHistory(expression + " = " + display.value);

    } catch {

        display.value = "Error";

        setTimeout(() => {
            display.value = "0";
        }, 1200);
    }
}


/* =========================
   SQUARE
========================= */

function square() {

    try {

        let number = Number(display.value);

        let result = number * number;

        previous.textContent = number + "²";

        display.value = result;

        addHistory(number + "² = " + result);

    } catch {

        display.value = "Error";

    }
}


/* =========================
   SQUARE ROOT
========================= */

function squareRoot() {

    let number = Number(display.value);

    if (number < 0) {
        display.value = "Error";
        return;
    }

    let result = Math.sqrt(number);

    previous.textContent = "√" + number;

    display.value = result;

    addHistory("√" + number + " = " + result);
}


/* =========================
   PERCENTAGE
========================= */

function percentage() {

    let number = Number(display.value);

    let result = number / 100;

    previous.textContent = number + "%";

    display.value = result;

    addHistory(number + "% = " + result);
}


/* =========================
   POWER
========================= */

function power() {

    let base = prompt("Enter the base number:");

    let exponent = prompt("Enter the power:");

    if (base === null || exponent === null) {
        return;
    }

    let result = Math.pow(Number(base), Number(exponent));

    previous.textContent = base + "^" + exponent;

    display.value = result;

    addHistory(base + "^" + exponent + " = " + result);
}


/* =========================
   RECIPROCAL
========================= */

function reciprocal() {

    let number = Number(display.value);

    if (number === 0) {
        display.value = "Error";
        return;
    }

    let result = 1 / number;

    previous.textContent = "1/" + number;

    display.value = result;

    addHistory("1/" + number + " = " + result);
}


/* =========================
   PLUS / MINUS
========================= */

function plusMinus() {

    let number = Number(display.value);

    display.value = number * -1;
}


/* =========================
   FACTORIAL
========================= */

function factorial() {

    let number = Number(display.value);

    if (number < 0 || !Number.isInteger(number)) {
        display.value = "Error";
        return;
    }

    let result = 1;

    for (let i = 1; i <= number; i++) {
        result *= i;
    }

    previous.textContent = number + "!";

    display.value = result;

    addHistory(number + "! = " + result);
}


/* =========================
   MEMORY STORE
========================= */

function memoryStore() {

    memory = Number(display.value);

    alert("Number saved to memory.");
}


/* =========================
   MEMORY RECALL
========================= */

function memoryRecall() {

    display.value = memory;
}


/* =========================
   MEMORY ADD
========================= */

function memoryAdd() {

    memory += Number(display.value);
}


/* =========================
   MEMORY SUBTRACT
========================= */

function memorySubtract() {

    memory -= Number(display.value);
}


/* =========================
   MEMORY CLEAR
========================= */

function memoryClear() {

    memory = 0;

    alert("Memory cleared.");
}


/* =========================
   HISTORY
========================= */

function addHistory(text) {

    let li = document.createElement("li");

    li.textContent = text;

    historyList.prepend(li);

}


/* =========================
   CLEAR HISTORY
========================= */

function clearHistory() {

    historyList.innerHTML = "";
}


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", function(event) {

    let key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "(" ||
        key === ")"
    ) {

        addToDisplay(key);

    }

    if (key === "Enter") {

        calculate();

    }

    if (key === "Backspace") {

        deleteLast();

    }

    if (key === "Escape") {

        clearDisplay();

    }

    if (key === "%") {

        percentage();

    }

});


/* =========================
   DARK / LIGHT MODE
========================= */

document.getElementById("themeBtn").addEventListener("click", function() {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        this.textContent = "☀️";

    } else {

        this.textContent = "🌙";

    }

});