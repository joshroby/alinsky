
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

for (i in player.backstories) {
	player.backstories[i].known = 1;
	};

// for (qwe=0;qwe<3;qwe++) {
// 	handlers.newPerson();
// 	}

for (qwe = 0;qwe < 10;qwe++) {
	var date = new Date().getDate() + (Math.random() * 20 << 0);
	var hour = [8,12,16,20][Math.random() * 4 << 0];
	var eventDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), date,hour)
	var type = Object.keys(dataEventTypes)[Math.random() * 8 << 0]
	var venue = institutions[institutions.length * Math.random() << 0];
	var sponsors = [{sponsor:institutions[institutions.length * Math.random() << 0],contribution:0}];
	var causes = Object.keys(dataIssues);
	var cause = dataIssues[causes[Math.random() * causes.length << 0]];
	var eventDemand = new Demand("donate",institutions[0],cause);
	var appeal = ["purity","care","fairness"][Math.random() * 3 << 0]
	new Event(cause.name + " " + dataEventTypes[type].name,type,eventDate,sponsors,venue,undefined,eventDemand,appeal,-1);
	}

player.currencies = {};
player.currencies.mana = 50;
player.currencies.cash = player.resources.money;
playerOrganization.currencies = {};
playerOrganization.currencies.cash = 0;

player.issues.sort(function(a,b) {return (a.value(player) > b.value(player)) ? -1 : 1 });

institutions[0].newList(player.issues[0].name + " News",player.issues[0]);
institutions[0].newList(player.issues[1].name + " Dispatches",player.issues[1]);
institutions[0].newList(player.issues[2].name + " Report",player.issues[2]);

// New Game UI Setup
view.refreshHeader();
view.refreshMap();
view.displayContact(player);
view.displayNeighborhood(neighborhoods[0]);
handlers.sidebarPaneExpand("contact");
view.refreshCalendar();
view.refreshActions();
handlers.actionPaneExpand('actionOperations');