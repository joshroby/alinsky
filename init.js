
var community = new Community();

var downtown = new Neighborhood();
downtown.name = "Downtown";

for (qwe=0;qwe<10;qwe++) {
	new Neighborhood();
	}

var player = new Person();

view.refreshMap();
view.displayContact(player);
view.displayNeighborhood(downtown);