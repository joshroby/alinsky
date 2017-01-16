
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
player.connections[0][3]=[];

var playerHome = new Institution(player.neighborhood,"residential");
player.findHousing(playerHome);

var playerChurch = new Institution(undefined,"religious",player.faith);
player.findChurch(playerChurch);

for (qwe=0;qwe<10;qwe++) {
	handlers.newPerson();
	}

// for (qwe = 0;qwe < 10;qwe++) {
// 	var date = new Date().getDate() + (Math.random() * 20 << 0);
// 	var hour = [8,12,16,20][Math.random() * 4 << 0];
// 	var eventDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), date,hour)
// 	var venue = institutions[institutions.length * Math.random() << 0];
// 	var sponsors = [institutions[institutions.length * Math.random() << 0]];
// 	if (Math.random() > 0.5) {sponsors = [people[0]]};
// 	var cost = (Math.random() * 100 << 0) * 10;
// 	var prep = (Math.random() * 100 << 0) * 10;
// 	new Event("event " + qwe,eventDate,sponsors,venue,cost,prep);
// 	}

institutions[0].subscriptionLists[0].subscribers = [people[1],people[2]];

player.currencies = {};
player.currencies.mana = 50;
player.currencies.cash = player.resources.money;
playerOrganization.currencies = {};
playerOrganization.currencies.cash = 0;

view.refreshHeader();
view.refreshMap();
view.displayContact(player);
view.displayNeighborhood(neighborhoods[0]);
handlers.sidebarPaneExpand("contact");
view.refreshCalendar();
view.refreshActions();
handlers.actionPaneExpand('actionOperations');