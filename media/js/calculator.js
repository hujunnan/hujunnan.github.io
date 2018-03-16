(function(){
var GetResultHasOnclick;

window.onload = function() {
    GetElementFromNum();
    GetElementFromOperator();
    DeleteOneElement();
    DeleteAllElements();
    GetResult();
};

var GetElementFromNum = function() {
    $('.num').click(function(event){
        if(GetResultHasOnclick == 1) $('#operand').val('');
        GetResultHasOnclick = 0;
        var s = $('#operand').val() + event.target.innerHTML;
        $('#operand').val(s).focus();
    });
};

var GetElementFromOperator = function() {
    $('.operator').click(function(event){
        GetResultHasOnclick = 0;
        var s = $('#operand').val() + event.target.innerHTML;
        $('#operand').val(s).focus();
    });
};

var DeleteOneElement = function() {
    $('#delete').click(function(){
        GetResultHasOnclick = 0;
        var s = $('#operand').val();
        s = s.substring(0, s.length-1);
        $('#operand').val(s).focus();
    });
};

var DeleteAllElements = function() {
    $('#opCE').click(function(){
        GetResultHasOnclick = 0;
        $('#operand').val('');
    });
};

var GetResult = function() {
    $('#getResult').click(function(){
        GetResultHasOnclick = 1;
        var s = $('#operand').val();
        if (s.length !== 0){
            if (isError(s) === true) alert("error");
            else calcularTheExpression(s);
        }
    });
};

var calcularTheExpression = function(s) {
    s = result(replacejian(s));
    if(s == Infinity || isNaN(s)) {
        $('#operand').val('');
        alert("error");
    }
    else 
        $('#operand').val(parseFloat(parseFloat(result(s)).toFixed(16)));
};

var isError = function(str2) {
    var right = 0, left = 0;
    for (var a = 0; a < str2.length; a++) {
        if (a === 0 && (str2[a] == '/' || str2[a] == '*')) return true;
        if (str2[a] == '(') left++;
        if (str2[a] == ')') {
            if (++right > left || !isNaN(str2[a+1])) return true;
        }
    }
};

var replacejian = function(str) {
    str = str.replace(/-/g, "+-");
    str = str.replace(/\)\(/g, ")*(");
    for (var a = 0; a < str.length; a++) {
        if (str[a] == '(' && a !== 0 && !isNaN(str[a-1])) {
            str = str.substring(0, a) + "*" + str.substring(a, str.length);
        }
    }
    return str;
};

function find(str1) {
    var left = 0, right = 0;
    for (var c = 0; c < str1.length; c++) {
        if (str1[c] == '(') left++;
        if (str1[c] == ')') right++;
        if(right > left) return parseInt(c);
    }
    return str1.length;
}

var result = function(str) {
    var pos = ThePositionOfOperator(str);
    if(pos != -1){
        return doTheRightOperationTotheOperator(str,pos);
    } else {
        return str;
    }
};

var ThePositionOfOperator = function(str) {
    for (var a = 0; a < str.length; a++) {
        if(str[a] == '+' || str[a] == '*' || str[a] == '/' || str[a] =='(') 
            return a;
    }
    return -1;
};

var doTheRightOperationTotheOperator = function(str, pos) {
    if (str[pos] == '+') return operationToThePlus(str, pos);
    else if (str[pos] == '*') return operationToTheMul(str, pos);
    else if (str[pos] == '/') return operationToTheDivide(str, pos);
    else if (str[pos] == '(') return operationToTheBracket(str, pos);
};

var operationToThePlus = function(str, pos) {
    if (pos === 0) return result(str.substring(1, str.length));
    return parseFloat(str.substring(0,pos)) + parseFloat(result(str.substring(pos+1, str.length)));
};

var operationToTheMul = function(str, pos) {
    if (str[pos+1] == '(') {
        var end = pos + 2 + find(str.substring(pos+2, str.length));
        return result(parseFloat(str.substring(0,pos)) * parseFloat(result(str.substring(pos+1, end+1))) + str.substring(end+1, str.length));
    } else {
        var pos1 = FindTheOperationOfPlusMulDiv(str,pos);
        if (pos1 >= str.length) return parseFloat(str.substring(0, pos)) * parseFloat(str.substring(pos+1, pos1));
        return result(parseFloat(str.substring(0, pos)) * parseFloat(str.substring(pos+1, pos1)) + str.substring(pos1, str.length));
    }
};

var operationToTheDivide = function(str, pos) {
    if (str[pos+1] == '(') {
        var end = pos + 2 + find(str.substring(pos+2, str.length));
        return result(parseFloat(str.substring(0,pos)) / parseFloat(result(str.substring(pos+1, end+1))) + str.substring(end+1, str.length));
    } else {
        var pos1 = FindTheOperationOfPlusMulDiv(str,pos);
        if (pos1 >= str.length) return parseFloat(str.substring(0, pos)) / parseFloat(str.substring(pos+1, pos1));
        return result(parseFloat(str.substring(0, pos)) / parseFloat(str.substring(pos+1, pos1)) + str.substring(pos1, str.length));
    }
};

var operationToTheBracket = function(str, pos) {
    var end = 1 + find(str.substring(1, str.length));
    if(end == str.length) return result(str.substring(1, end));
    return result(parseFloat(result(str.substring(1, end))) + str.substring(end+1, str.length));
};

var FindTheOperationOfPlusMulDiv = function(str, pos) {
    for (var b = pos+1; b < str.length; b++) {
        if (str[b] == '+' || str[b] == '*' || str[b] == '/') {
            return b;
        }
    }
    return str.length;
};
})();