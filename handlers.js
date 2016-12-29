var handlers = {

	sidebarMapExpand: function(pane) {
		var mapPane = document.getElementById('mapPane');
		var mapBarContents = document.getElementById('mapBarContents');
		var calPane = document.getElementById('calPane');
		var calBarContents = document.getElementById('calBarContents');
		var contactPane = document.getElementById('contactPane');
		var contactBarContents = document.getElementById('contactBarContents');
		var actionPane = document.getElementById('actionPane');
		var actionBarContents = document.getElementById('actionBarContents');
		
			mapPane.style.display = 'none';
			mapBarContents.style.display = 'none';
			calPane.style.display = 'none';
			calBarContents.style.display = 'none';
			contactPane.style.display = 'none';
			contactBarContents.style.display = 'none';
			actionPane.style.display = 'none';
			actionBarContents.style.display = 'none';


		if (pane == "map") {
			mapPane.style.display = 'block';
			mapBarContents.style.display = 'block';
			}
		
		else if (pane == "cal") {
			calPane.style.display = 'block';
			calBarContents.style.display = 'block';
			}
		
		else if (pane == "contact") {
			view.refreshContacts();
			contactPane.style.display = 'block';
			contactBarContents.style.display = 'block';
			}

		else if (pane == "action") {
			actionPane.style.display = 'block';
			actionBarContents.style.display = 'block';
			}
			
	},

	sidebarCalExpand: function() {
	},

	sidebarContactExpand: function() {
	},

	sidebarActionExpand: function() {
	},

	newPerson: function() {
		var newGuy = new Person();
		view.refreshContacts();
	},
}