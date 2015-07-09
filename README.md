# currencyFormat
格式化input输入框的货币金额，默认保留两位小数，格式化为￥
#使用方法
<input type="text" class="currency" value="1234.56">   
$('.currency').currencyFormat();   
或   
var options = {   
    sign:"$",   
    digit: 3   
  }   
  $('.currency').currencyFormat(options);
