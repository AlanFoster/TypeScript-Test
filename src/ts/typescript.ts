window.onload = (e) => {
    var getNumberFromDOM = (selector : string) : number {
        return Number((<HTMLInputElement> document.querySelector(selector)).value);
    }
    var addNumbers = (a : number, b : number) : number => {
        return a + b;
    };
    var submitButton = <any> document.querySelector("#submitButton");
    submitButton.onclick = () => {
        var firstNumber = getNumberFromDOM("#firstNumber") || 0;
        var secondNumber = getNumberFromDOM("#secondNumber") || 0;
        var responseField = <HTMLDivElement> document.querySelector("#response");
        responseField.innerHTML = "The sum of " + firstNumber + " + " + secondNumber + " is " + addNumbers(firstNumber, secondNumber) + "!";
    };
}