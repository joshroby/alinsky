var handlers = {

	sidebarPaneExpand: function(pane) {
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
	
	displayContact: function(index) {
		var contact = people[index];
		view.displayContact(contact);
	},
	
	displayNeighborhood: function(index) {
		var neighborhood = neighborhoods[index];
		view.displayNeighborhood(neighborhood);
	},
	
	displayInstitution: function(index) {
		var institution = view.focus.neighborhood.institutions[index];
		view.displayInstitution(institution);
	},

	newPerson: function() {
		var newGuy = new Person();
		view.refreshContacts();
	},

	newNeighborhood: function() {
		var newNeighborhood = new Neighborhood();
		view.focus.neighborhood = newNeighborhood;
		view.refreshMap();
		view.displayNeighborhood(newNeighborhood);
	},

	newInstitution: function() {
		var newInstitution = new Institution(view.focus.neighborhood);
		view.refreshMap();
		view.displayNeighborhood(view.focus.neighborhood);
		view.displayInstitution(newInstitution);
	},
}