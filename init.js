
var community = new Community();
console.log(community);

var downtown = new Neighborhood();
downtown.name = "Downtown";

for (qwe=0;qwe<11;qwe++) {
	new Neighborhood();
	}

var player = new Person();

var playerOrganization = new Institution(undefined,"greenspace");
playerOrganization.name = "Organize Now!";
playerOrganization.paygrade = {unskiled:0,skilled:0,management:0,executive:0};
playerOrganization.payroll = 1;
playerOrganization.neighborhood = player.neighborhood;
player.findJob(playerOrganization,"executive");

var playerDayJob = new Institution();
player.findJob(playerDayJob);

var playerHome = new Institution(player.neighborhood,"residential");
player.findHousing(playerHome);

var playerChurch = new Institution(undefined,"religious",player.faith);
player.findChurch(playerChurch);

view.refreshMap();
view.displayContact(player);
view.displayNeighborhood(downtown);
handlers.sidebarPaneExpand("contact");