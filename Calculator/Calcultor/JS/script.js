
const getElementById = (id) => document.getElementById(id);


function getHistory() {
  return getElementById("history-value").textContent;
}

function printHistory(num) {
  getElementById("history-value").textContent = num;
}

function getOutput() {
  return getElementById("output-value").textContent;
}

function printOutput(num) {
  getElementById("output-value").textContent =
    num === "" ? num : getFormattedNumber(num);
}


function getFormattedNumber(num) {
  if (num === "-") {
    return "";
  }
  return Number(num).toLocaleString("en");
}

function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}


const operators = document.getElementsByClassName("operator");
Array.from(operators).forEach((operator) => {
  operator.addEventListener("click", function () {
    if (this.id === "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id === "backspace") {
      let output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      let output = getOutput();
      let history = getHistory();
      if (output === "" && history !== "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output !== "" || history !== "") {
        output = output === "" ? output : reverseNumberFormat(output);
        history += output;
        if (this.id === "=") {
          let result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history += this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
});


const numbers = document.getElementsByClassName("number");
Array.from(numbers).forEach((number) => {
  number.addEventListener("click", function () {
    let output = reverseNumberFormat(getOutput());
    if (output !== NaN) {

      output += this.id;
      printOutput(output);
    }
  });
});
