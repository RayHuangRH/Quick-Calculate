//Clears chrome.storage.sync
document.addEventListener('DOMContentLoaded', function() {
	var clear = document.getElementById("clear");
	clear.addEventListener('click', function(){
		chrome.storage.sync.clear();
	});
});