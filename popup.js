/*Loads previously stored equations and solutions from chrome.storage.sync
 * Adds Event Listener for history, option and Submit button 
 * Uses methods from exception.js and math.js to determine if expressions are valid
 * Stores solutions in solution history popup
 */
document.addEventListener('DOMContentLoaded', function() {
	load();
	var history = document.getElementById("popupInfo");
	history.addEventListener('click', function() {
		var popup = document.getElementById("history");
		popup.classList.toggle("show");
	});
	var options = document.getElementById("options");
	options.addEventListener('click', function() {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	});
	var calc = document.getElementById("calc");
	calc.addEventListener('click', function() {
		var newEquation = document.getElementById("equation").value;
		var tf = checkEquation(newEquation) && checkParen(newEquation);
		if (Boolean(tf)) {
			eqReformat(newEquation);
			document.getElementById("currentEq").innerHTML = newEquation;
			chrome.storage.sync.set({
				'equation' : newEquation
			});
			newEquation = unary(newEquation);
			newEquation = convert(newEquation);
			var result = evaluate(newEquation);
			document.getElementById("solution").innerHTML = result;
			chrome.storage.sync.set({
				'result' : result
			});
			notify(result);
			ansReformat(result);
		}
	});
});