var renderInput = document.querySelector('.input');
var numbers = document.querySelectorAll('.numbers div');
var operators = document.querySelectorAll('.operators div');
var result = document.querySelector('#result');
var clear = document.querySelector('#clear');
var resultDisplayed = false;

// duyệt tất cả các số trong array number, qua mỗi phần tử ta add event
// listener click, khi click các phần tử đó, thì nếu không gặp phải kí tự
// đặc biệt thì ta sẽ nối vào để tạo thành phần tử mới
for(var number of numbers){
    number.addEventListener('click', (e) => {

        var currentString = renderInput.innerHTML;
        // ví dụ input vào là 98 thì currentString lúc này sẽ là 9,tức là bằng display trên input - 1 phần tử
        var lastChar = currentString[currentString.length - 1];

        if(resultDisplayed === false){
            // nếu vẫn chưa display ra thì ta cộng tiếp vào
            renderInput.innerHTML += e.target.innerHTML;
        }else if(resultDisplayed === true && lastChar === '+'
        || lastChar === '-' || lastChar === "×" || lastChar === "÷"){
            // nếu đã display ra rồi và phần tử cuối cùng thuộc nhóm
            // opertators thì ta thực hiện việc tạo thành số thứ 2
            resultDisplayed = false;
            renderInput.innerHTML += e.target.innerHTML;
        }else{
            resultDisplayed = false;
            renderInput.innerHTML = "";
            renderInput.innerHTML += e.target.innerHTML;
        }
    });
}

for (var operator of operators){
    operator.addEventListener('click', (e) => {
        var currentString = renderInput.innerHTML;
        // sau khi input vào operator thì currentString sẽ nhận vào giá trị
        var lastChar = currentString[currentString.length - 1];
        if(lastChar === '+' || lastChar === '-' || lastChar === "×" 
        || lastChar === "÷"){
            // số thứ 2
            var newString = currentString.substring(0, currentString.length - 1)
                + e.target.innerHTML;
            renderInput.innerHTML = newString;
        } else if(currentString.length == 0){
            console.log("enter a number first");
        }else{
            renderInput.innerHTML += e.target.innerHTML;
        }
    });
}

result.addEventListener('click', () => {
    var inputString = renderInput.innerHTML;
    // lấy toàn bộ những thứ đang có trên màn hình out
    var arrayNumbers = inputString.split(/\+|\-|\×|\÷/g);
    // mảng các number đang có
    var arrayOperators = inputString.replace(/[0-9]|\./g, "").split("");
    // mảng các operator đang có

    // thực hiện logic cho phép chia
    var divide = arrayOperators.indexOf("÷");
    while(divide != -1){
        arrayNumbers.splice(divide, 2, arrayNumbers[divide] / arrayNumbers[divide + 1]);
        arrayOperators.splice(divide, 1);
        divide = arrayOperators.indexOf("÷");
    }
    // thực hiện logic phép nhân
    var multiply = arrayOperators.indexOf("×");
    while(multiply != -1){
        arrayNumbers.splice(multiply, 2, arrayNumbers[multiply] * arrayNumbers[multiply + 1]);
        arrayOperators.splice(multiply, 1);
        multiply = arrayOperators.indexOf("×");
    }
    // thực hiện logic phép trừ
    var substract = arrayOperators.indexOf('-');
    while(substract != -1){
        arrayNumbers.splice(substract, 2, parseFloat(arrayNumbers[substract]) - parseFloat(arrayNumbers[substract + 1]));
        arrayOperators.splice(substract, 1);
        substract = arrayOperators.indexOf('-');
    }
    // thực hiện logic phép cộng
    var add = arrayOperators.indexOf('+');
    while(add != -1){
        arrayNumbers.splice(add, 2, parseFloat(arrayNumbers[add]) + parseFloat(arrayNumbers[add + 1]));
        arrayOperators.splice(add, 1);
        add = arrayOperators.indexOf('+');
    }
    // render ra phần tử ở vị trí arrayNumbers[0] chính là phần tử cuối cùng sau khi bấm equal
    renderInput.innerHTML = arrayNumbers[0];
    resultDisplayed = true;
});

clear.addEventListener('click', () => {
    renderInput.innerHTML = "";
})
