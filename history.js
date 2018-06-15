/*Records and stores last 5 equations 
 * Adds new equation to Solution History popup and discards oldest equation
 */
function eqReformat(equation) {
	var str1 = "eq5";
	var str2 = "eq4";
	for (var i = 5; i > 1; i--) {
		str1 = str1.substring(0, 2) + i;
		var j = i - 1;
		str2 = str2.substring(0, 2) + j;
		var newEq = document.getElementById(str2).innerHTML;
		if (newEq == undefined) {
			continue;
		}
		document.getElementById(str1).innerHTML = newEq;
	}
	document.getElementById("eq1").innerHTML = equation;
}

/*Records and stores last 5 solutions
 * Adds new solution to Solution History popup and discards oldest solution
 */
function ansReformat(answer) {
	var str1 = "ans5";
	var str2 = "ans4";
	for (var i = 5; i > 1; i--) {
		str1 = str1.substring(0, 3) + i;
		var j = i - 1;
		str2 = str2.substring(0, 3) + j;
		var newAns = document.getElementById(str2).innerHTML;
		if (newAns == undefined) {
			continue;
		}
		document.getElementById(str1).innerHTML = newAns;
	}
	document.getElementById("ans1").innerHTML = answer;
	record();
}

//Stores equation and solution history into chrome.sync.storage
function record() {
	chrome.storage.sync.set({
		'eq1' : document.getElementById("eq1").innerHTML
	});
	chrome.storage.sync.set({
		'eq2' : document.getElementById("eq2").innerHTML
	});
	chrome.storage.sync.set({
		'eq3' : document.getElementById("eq3").innerHTML
	});
	chrome.storage.sync.set({
		'eq4' : document.getElementById("eq4").innerHTML
	});
	chrome.storage.sync.set({
		'eq5' : document.getElementById("eq5").innerHTML
	});
	chrome.storage.sync.set({
		'ans1' : document.getElementById("ans1").innerHTML
	});
	chrome.storage.sync.set({
		'ans2' : document.getElementById("ans2").innerHTML
	});
	chrome.storage.sync.set({
		'ans3' : document.getElementById("ans3").innerHTML
	});
	chrome.storage.sync.set({
		'ans4' : document.getElementById("ans4").innerHTML
	});
	chrome.storage.sync.set({
		'ans5' : document.getElementById("ans5").innerHTML
	});
}

//retrieves solution and equation history from chrome.sync.storage
function load(){
	chrome.storage.sync.get('equation', function(math) {
		document.getElementById("currentEq").innerHTML = math.equation;
	});
	chrome.storage.sync.get('result', function(math) {
		document.getElementById("solution").innerHTML = math.result;
	});
	chrome.storage.sync.get('eq1', function(math) {
		document.getElementById("eq1").innerHTML = math.eq1;
	});
	chrome.storage.sync.get('eq2', function(math) {
		document.getElementById("eq2").innerHTML = math.eq2;
	});
	chrome.storage.sync.get('eq3', function(math) {
		document.getElementById("eq3").innerHTML = math.eq3;
	});
	chrome.storage.sync.get('eq4', function(math) {
		document.getElementById("eq4").innerHTML = math.eq4;
	});
	chrome.storage.sync.get('eq5', function(math) {
		document.getElementById("eq5").innerHTML = math.eq5;
	});
	chrome.storage.sync.get('ans1', function(math) {
		document.getElementById("ans1").innerHTML = math.ans1;
	});
	chrome.storage.sync.get('ans2', function(math) {
		document.getElementById("ans2").innerHTML = math.ans2;
	});
	chrome.storage.sync.get('ans3', function(math) {
		document.getElementById("ans3").innerHTML = math.ans3;
	});
	chrome.storage.sync.get('ans4', function(math) {
		document.getElementById("ans4").innerHTML = math.ans4;
	});
	chrome.storage.sync.get('ans5', function(math) {
		document.getElementById("ans5").innerHTML = math.ans5;
	});
}