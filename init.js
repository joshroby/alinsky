
var community = new Community();
console.log(community);

var player = new Person();
player.growUp();

var playerOrganization = new Institution(player.neighborhood,"municipal");
playerOrganization.name = "Organize Now!";
playerOrganization.paygrade = {unskilled:0,skilled:0,management:0,executive:0};
playerOrganization.payroll = {unskilled:0,skilled:0,management:0,executive:1};
playerOrganization.neighborhood = player.neighborhood;
playerOrganization.typicalClientele = {genders:undefined,orientation:undefined,faiths:undefined,ethnicities:[]};;
playerOrganization.typicalEmployees = {executive:{race:player.race,gender:player.gender.identity,orientation:player.orientation.name}};
player.findJob(playerOrganization,"executive");

var playerDayJob = new Institution();
player.findJob(playerDayJob);

var playerHome = new Institution(player.neighborhood,"residential");
player.findHousing(playerHome);

var playerChurch = new Institution(undefined,"religious",player.faith);
player.findChurch(playerChurch);

// for (qwe=0;qwe<100;qwe++) {
// 	handlers.newPerson();
// 	}

view.refreshMap();
view.displayContact(player);
view.displayNeighborhood(neighborhoods[0]);
handlers.sidebarPaneExpand("contact");