function unary(str) {
	var result = "";
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == '-') {
			if (i == 0) {
				result += "$";
			} else if (str.charAt(i - 1) == '(') {
				result += "$";
			} else if (str.charAt(i - 1) == '*' || str.charAt(i - 1) == '-' || str.charAt(i - 1) == '+'
					|| str.charAt(i - 1) == '/' || str.charAt(i - 1) == '^') {
				result += "$";
			} else {
				result += str.charAt(i);
			}
		}
		else if(str.charAt(i)=='x'){
			result+="*";
		}
		else if('0123456789.'.indexOf(str.charAt(i)) != -1&&i!=str.length-1){
			result += str.charAt(i);
			if(str.charAt(i+1)=='('){
				result += "*";
			}
		}else if (str.charAt(i) == ' ') {
			continue;
		} else {
			result += str.charAt(i);
		}
	}
	return result;
}

function checkEquation(newEquation) {
	var chars = " x()0123456789+-/*^.";
	for (var i = 0; i < newEquation.length; i++) {
		if (chars.indexOf(newEquation.charAt(i)) == -1) {
			var notifOptions = {
				type : "basic",
				iconUrl : "icon48.png",
				title : "Error!",
				message : "Invalid Expression."
			};
			chrome.notifications.create('errorNotif', notifOptions);
			return false;
		}
	}
	return true;
}

function operate(c) {
	switch (c) {
	case '+':
	case '-':
		return 1;
	case '*':
	case '/':
		return 2;
	case '^':
		return 3;
	case '$': 
		return 4; 
	}
	return -1;
}

function convert(str) {
	var result = "";
	var stack = [];
	var num = "";
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if ('0123456789.'.indexOf(c) != -1||operate(c)==4) {
			result += c;
			if (i + 1 >= str.length
					|| '0123456789.'.indexOf((str.charAt(i + 1))) == -1) {
				result += ' ';
			}
		} else if (c == '(') {
			stack.push(c);
		} else if (c == ')') {
			while (stack.length != 0 && stack[stack.length - 1] != '(') {
				result += stack.pop();
				if (stack.length != 0 && stack[stack.length - 1] != '(' && stack[stack.length - 1] != '$') {
					var notifOptions = {
						type : "basic",
						iconUrl : "icon48.png",
						title : "Error!",
						message : "Syntax Error"
					};
					chrome.notifications.create('errorNotif', notifOptions);
				} else {
					stack.pop();
				}
			}
		} else {
			while (stack.length != 0
					&& operate(c) <= operate(stack[stack.length - 1])) {
				result += stack.pop();
				result += ' ';
			}
			stack.push(c);
		}
	}

	while (stack.length != 0) {
		result += stack.pop();
		result += ' ';
	}
	return result;
}

function evaluate(str) {
	var stack = [];
	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);
		if ('0123456789'.indexOf(c) != -1 ||c=='$') {
			var index = str.indexOf(" ", i);
			var num = "";
			if(c=='$'){
				num = str.substring(i+1, index)*-1;
			}else{
				num = str.substring(i, index);
			}
			if (num % 1 === 0) {
				stack.push(parseInt(num));
			}
			else{
				stack.push(parseFloat(num));
			}
			str = str.substring(index);
			i = 0;
		} else if (c == ' ') {
			continue;
		} else {
			var a = stack.pop();
			var b = stack.pop();
			switch (c) {
			case '+':
				stack.push(b + a);
				break;
			case '-':
				stack.push(b - a);
				break;
			case '*':
				stack.push(b * a);
				break;
			case '/':
				stack.push(b / a);
				break;
			case '^':
				stack.push(Math.pow(b, a));
				break;
			}
		}
	}
	return stack.pop();
}

function notify(result){
	var message = result+"";
	var options ={
			type : "basic",
			iconUrl : "icon48.png",
			title : "Solution",
			message : message
	};
	chrome.notifications.create('solutionNotif', options);
}
