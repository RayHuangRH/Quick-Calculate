var contextMenu ={
		"id": 'evaluate',
		"title": "Evaluate",
		"contexts": ["selection"]
};
chrome.contextMenus.create(contextMenu);

chrome.contextMenus.onClicked.addListener(function(click){
	if(click.menuItemId == 'evaluate' && click.selectionText){
		var newEquation = click.selectionText;
		var tf = checkEquation(newEquation)&&checkParen(newEquation);
		if(Boolean(tf)){
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
