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

function errorNotif(){
	var notifOptions = {
			type : "basic",
			iconUrl : "icon48.png",
			title : "Error!",
			message : "Invalid Expression."
	};
	chrome.notifications.create('errorNotif', notifOptions);
}