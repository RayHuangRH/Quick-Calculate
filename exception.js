//Checks expression for invalid characters
function checkEquation(newEquation) {
	var chars = " x()0123456789+-/*^.";
	if(newEquation.length==0){
		errorNotif();
		return false;
	}
	for (var i = 0; i < newEquation.length; i++) {
		if (chars.indexOf(newEquation.charAt(i)) == -1) {
			errorNotif();
			return false;
		}
	}
	return true;
}

//Checks expression to see if parentheses are paired properly
function checkParen(newEquation){
	var stack = [];
	for(var i = 0;i<newEquation.length;i++){
		if(newEquation.charAt(i)=="("){
			stack.push('(');
		}
		else if(newEquation.charAt(i)==")"){
			if(stack.length==0){
				errorNotif();
				return false;
			}
			stack.pop();
		}
	}
	if(stack.length!=0){
		errorNotif();
		return false;
	}
	return true;	
}

//Checks if number of operators exceeds the number of operands
function opCheck(newEquation){
	newEquation = unary(newEquation);
	var operator=0;
	var operand=0;
	for(var i = 0;i<newEquation.length;i++){
		var c = newEquation.charAt(i);
		if("0123456789".indexOf(c)!=-1){
			if(i+1>=newEquation.length||"0123456789".indexOf(newEquation.charAt(i+1))==-1){
				operand++;
			}
			else{
				continue;
			}
		}
		else if("+-*^/".indexOf(c)!=-1){
			operator++;
		}
	}
	if(operator<operand){
		return true;
	}
	errorNotif();
	return false;
}

//Method for error notification
function errorNotif(){
	var notifOptions = {
			type : "basic",
			iconUrl : "icon48.png",
			title : "Error!",
			message : "Invalid Expression."
	};
	chrome.notifications.create('errorNotif', notifOptions);
}