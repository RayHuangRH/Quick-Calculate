/* Information for context menu
 * Allows user to evaluate expression by highlighting directly from web page
 */
var contextMenu = {
	"id" : 'evaluate',
	"title" : "Evaluate",
	"contexts" : [ "selection" ]
};
chrome.contextMenus.create(contextMenu);

/*Checks to see if an element is highlighted in webpage and evaluate is selected from context menu
 * Uses methods from exception.js and math.js to check and evaluate valid expressions
 * Notify user of solution of expression
 */
chrome.contextMenus.onClicked.addListener(function(click) {
	if (click.menuItemId == 'evaluate' && click.selectionText) {
		var newEquation = click.selectionText;
		var tf = checkEquation(newEquation) && checkParen(newEquation);
		if (Boolean(tf)) {
			chrome.storage.sync.set({
				'equation' : newEquation
			});
			newEquation = unary(newEquation);
			newEquation = convert(newEquation);
			var result = evaluate(newEquation);
			chrome.storage.sync.set({
				'result' : result
			});
			notify(result);
		}
	}
});
