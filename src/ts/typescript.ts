module Calculator {
    var getNumberFromDOM = (selector : string) : number {
        return Number((<HTMLInputElement> document.querySelector(selector)).value);
    }
    export class Adder {
       constructor(public firstNumberQuerySelector : string, public secondNumberQuerySelector) {
       }
       private addNumbers = (a : number, b : number) : number => {
           return a + b;
       };
       add() {
          return this.addNumbers(getNumberFromDOM(this.firstNumberQuerySelector), getNumberFromDOM(this.secondNumberQuerySelector));
       }
    }
}

window.onload = (e) => {
   var adder = new Calculator.Adder("#firstNumber", "#secondNumber");

    var submitButton = <any> document.querySelector("#submitButton");
    submitButton.onclick = () => {
        var result = adder.add();
        var responseField = <HTMLDivElement> document.querySelector("#response");
        responseField.innerHTML = "The sum is " + result + "!";
    };
}