var people = [];
var neighborhoods = [];
var institutions = [];
var housing = [];
var shelters = [];
var drafts=[];

function GameLog() {
	this.log = [];
	
	this.add = function(type,text,result,person) {
		this.log.push([gameDate,type,text]);
		
		if (result) {
			var newResult = document.createElement('p');
			var pic = '<div class="pic"></div>';
			newResult.innerHTML = pic + text;
			newResult.className = 'result' + type;
			resultsLast=document.getElementById('resultsLast').appendChild(newResult);
		}
	};
};

var gameLog = new GameLog();

var events = {};
var demands = [];

var congregationsByFaith = {};
var congregationsBySect = {};
var congregationsByReligion = {};
for (i in dataFaiths) {
	congregationsByFaith[i] = [];
	congregationsBySect[dataFaiths[i].sect] = [];
	congregationsByReligion[dataFaiths[i].name] = [];
	};

var date = {year:2018,month:10,day:5};
var gameDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate(),8);

function advanceClock() {
	gameDate = new Date(gameDate.getFullYear(),gameDate.getMonth(),gameDate.getDate(),gameDate.getHours()+4);
	view.refreshHeader();
	};

function curveRandom(depth) {
		if (depth == undefined) {depth = 10};
		var random = Math.random();
		return (1 - random)/(depth * random + 1)
	};

function Community(size) {

	if (size == undefined) {size = 10};
	
	var ethnicities = Object.keys(dataEthnicities);
	var residentsByEthnicity = {};
	var total = 0;
	for (i in ethnicities) {
		residentsByEthnicity[ethnicities[i]] = Math.random();
		total += residentsByEthnicity[ethnicities[i]];
		}
	
	var races = Object.keys(dataRaces);
	var residentsByRace = {};
	for (i in races) {
		residentsByRace[races[i]] = 0;
		}
	residentsByRace.multiracial = Math.random();
	for (i in ethnicities) {
		residentsByRace[dataEthnicities[ethnicities[i]].assignedRace.key] += residentsByEthnicity[ethnicities[i]];
		}
		
	var faiths = Object.keys(dataFaiths);
	var residentsByFaith = {};
	var residentsBySect = {};
	var residentsByReligion = {};
	var totalFaiths = 0;
	for (i in faiths) {
		residentsByFaith[faiths[i]] = Math.random();
		totalFaiths += residentsByFaith[faiths[i]];
		if (residentsBySect[dataFaiths[faiths[i]].sect] == undefined) {
			residentsBySect[dataFaiths[faiths[i]].sect] = residentsByFaith[faiths[i]];
		} else {
			residentsBySect[dataFaiths[faiths[i]].sect] += residentsByFaith[faiths[i]];
			}
		if (residentsByReligion[dataFaiths[faiths[i]].name] == undefined) {
			residentsByReligion[dataFaiths[faiths[i]].name] = residentsByFaith[faiths[i]];
		} else {
			residentsByReligion[dataFaiths[faiths[i]].name] += residentsByFaith[faiths[i]];
			}
		}
	
	var demographics = {ethnicity:{},race:{},faith:{},sect:{},religion:{},}
	for (i in ethnicities) {
			demographics.ethnicity[ethnicities[i]] = residentsByEthnicity[ethnicities[i]]/total;
		}
	for (i in races) {
			demographics.race[races[i]] = residentsByRace[races[i]]/total;
		}
	for (i in faiths) {
			demographics.faith[faiths[i]] = residentsByFaith[faiths[i]]/totalFaiths;
		}
	for (i in residentsBySect) {
			demographics.sect[i] = residentsBySect[i]/totalFaiths;
		}
	for (i in residentsByReligion) {
			demographics.religion[i] = residentsByReligion[i]/totalFaiths;
		}
	
	var ethnicitiesPickList = Array(100);
	total = 0;
	for (i in ethnicities) {
			ethnicitiesPickList.fill(ethnicities[i],total,total + demographics.ethnicity[ethnicities[i]] * 100);
			total += demographics.ethnicity[ethnicities[i]]*100;
		}
	if (ethnicitiesPickList[99] === undefined) {ethnicitiesPickList[99] = ethnicitiesPickList[0];};
	
	var faithsPickList = Array(100);
	total = 0;
	for (i in faiths) {
			faithsPickList.fill(faiths[i],total,total + demographics.faith[faiths[i]] * 100);
			total += demographics.faith[faiths[i]]*100;
		}
	if (faithsPickList[99] === undefined) {faithsPickList[99] = "unitarianUniversalist";};
	
	var privilegeByRace = [];
	for (i in races) {
		privilegeByRace[dataRaces[races[i]].privilegeRanking] = races[i];
		};
	
	var privilegeByGender = [];
	var genders = Object.keys(dataGenders);
	for (i in genders) {
		privilegeByGender[dataGenders[genders[i]].privilegeRanking] = genders[i];
		};
	
	this.demographics = demographics;
	this.pickList = {};
	this.pickList.ethnicities = ethnicitiesPickList;
	this.pickList.faiths = faithsPickList;
	
	this.privilegeList = {};
	this.privilegeList.race = privilegeByRace;
	this.privilegeList.gender = privilegeByGender;
	this.privilegeList.orientation = ["Straight","Queer"];
	
	this.population = 10000;
	
	// Neighborhoods
	for (neighborhood = 0;neighborhood < size; neighborhood++) {
		var status;
		if (neighborhood < size / 2 && neighborhood < 6) {
			status = neighborhood;
		} else {
			status = Math.random() * 6 << 0;
		}
		new Neighborhood(status);
		};
	neighborhoods[neighborhoods.length * Math.random() << 0].name = "Downtown";
	
	for (i in neighborhoods) {
		neighborhoods[i].setupDemographics(this);
		};
	
	};

function Neighborhood(status) {

	if (status === undefined) {
		status = (Math.random()+Math.random()) * 3 << 0;
	};
	
	var accesses = {};
	for (i in dataAccesses) {
		accesses[i] = Math.random();
		}
	var total = 0;
	for (a in accesses) {
		total += accesses[a];
	};
	for (a in accesses) {
		accesses[a] = Math.min(5,Math.floor(status/2 + Object.keys(accesses).length*Math.pow(1.5,status)*accesses[a]/total));
	};

	var statusDemographics = status;
	var moneyDemographics = Math.max(0,statusDemographics + [-2,-1,-1,-1,0,1,1,1,2][9 * Math.random() << 0]);
	
	var residential = Math.random() * 2 ;
	var commercial = Math.random();
	var industrial = Math.random();
	var municipal = Math.random() / 2 ;
	var total = residential + commercial + industrial + municipal;
	var zoning = {
		residential: residential/total,
		commercial: commercial/total,
		industrial: industrial/total,
		municipal: municipal/total,
		}
	
	var ethnicities = Object.keys(dataEthnicities);
	var shareOfEthnicities = {};
	for (i in ethnicities) {
		shareOfEthnicities[ethnicities[i]] = Math.random()*Math.random();
		}

//	REDLINING CODE that will not compile because it is dependent on community being set up already	
// 	var privilegeByRace = community.privilegeList.race;
// 	if (status < 3) {
// 		var loops = 3 - status;
// 		for (i=0;i<loops;i++) {
// 			privilegeByRace.reverse();
// 			var newResidentsRace = privilegeByRace[curveRandom * privilegeByRace.length << 0];
// 			var ethnicities = dataRaces[newResidentsRace].ethnicities;
// 			var newResidentsEthnicity = ethnicities[ethnicities.length * Math.random << 0];
// 			shareOfEthnicities[newResidentsEthnicity] += Math.random();
// 			};
// 	} else if (status > 3) {
// 		var loops = status - 3;
// 		for (i=0;i<loops;i++) {
// 			var newResidentsRace = privilegeByRace[curveRandom * privilegeByRace.length << 0];
// 			var ethnicities = dataRaces[newResidentsRace].ethnicities;
// 			var newResidentsEthnicity = ethnicities[ethnicities.length * Math.random << 0];
// 			shareOfEthnicities[newResidentsEthnicity] += Math.random();
// 			};
// 	};
	
	var races = Object.keys(dataRaces);
	var residentsByRace = {};
	for (i in races) {
		residentsByRace[races[i]] = 0;
		}
		
	var name = dataNeighborhoodNames.first[dataNeighborhoodNames.first.length * Math.random() << 0] + dataNeighborhoodNames.last[dataNeighborhoodNames.last.length * Math.random() << 0];
	
	this.demographics = {};
	this.demographics.status = statusDemographics;
	this.demographics.money = moneyDemographics;
	this.demographics.race = residentsByRace;
	this.demographics.ethnicity = shareOfEthnicities;
	this.demographics.population = 0;
	
	this.zoning = zoning;
	this.accesses = accesses;
	
	this.institutions = [];
	
	this.name = name;

	neighborhoods.push(this);
	
	this.color = neighborhoods.length - 1;
	
	// Functions
	
	this.setupDemographics = function(community) {
		var races = Object.keys(dataRaces);
		for (i in races) {
			this.demographics.race[races[i]] = 0;
			};
		for (i in this.demographics.ethnicity) {
			var total = 0;
			for (n in neighborhoods) {
				total += neighborhoods[n].demographics.ethnicity[i];
			}
			this.demographics.ethnicity[i] /= total; // Gives us percentage of community pop of that ethnicity
			this.demographics.ethnicity[i] *= community.demographics.ethnicity[i] * community.population;
			this.demographics.ethnicity[i] = Math.round(this.demographics.ethnicity[i]);
			this.demographics.race[dataEthnicities[i].assignedRace.key] += this.demographics.ethnicity[i];
			this.demographics.population += this.demographics.ethnicity[i];
			};
		
		var ethnicitiesPickList = Array(100);
		var ethnicities = Object.keys(dataEthnicities);
		total = 0;
		for (i in ethnicities) {
				ethnicitiesPickList.fill(ethnicities[i],total,total + (this.demographics.ethnicity[ethnicities[i]]/this.demographics.population)*100);
				total += (this.demographics.ethnicity[ethnicities[i]]/this.demographics.population)*100;
			}
		if (ethnicitiesPickList[99] === undefined) {ethnicitiesPickList[99] = ethnicitiesPickList[0];};
		
		this.pickList = {};
		this.pickList.ethnicity = ethnicitiesPickList;

	};

};

function Institution(neighborhood,type,faith) {

	if (neighborhood == undefined) {
		neighborhood = neighborhoods[neighborhoods.length * Math.random() << 0];
	}

	if (type == undefined) {
		type = ["residential","commercial","industrial","municipal","greenspace","religious","shelter"][Math.random() * 6 << 0]
	}
	
	if (type === "religious" && faith == undefined) {
		var faiths = Object.keys(dataFaiths);
		faith = dataFaiths[faiths[faiths.length * Math.random() << 0]]
	}
	
	if (type !== "religious") {
		var firstName = dataInstitutionNames[type].first[dataInstitutionNames[type].first.length * Math.random() << 0];
		var productName = dataInstitutionNames[type].product[dataInstitutionNames[type].product.length * Math.random() << 0];
		var lastName = dataInstitutionNames[type].last[dataInstitutionNames[type].last.length * Math.random() << 0];
		if (Math.random() < 0.3) {firstName = neighborhood.name};
		var name = firstName + " " + productName + " " + lastName;
	} else {
		var name = ["","First ","The "][3 * Math.random() << 0] + faith.congregation[faith.congregation.length * Math.random() << 0 ] + [" of "," at "," in "," of "][4 * Math.random() << 0] + neighborhood.name;
		this.faith = faith;
	}

	var status = Math.random() * 3 << 0;
	status += neighborhood.demographics.status - 1;
	var rent = Math.random() * 3 << 0;
	rent += neighborhood.demographics.money - 1;
	
	var capacity = 1 + Math.random() * 6 << 0;
	capacity *= Math.max(1,rent);
	if (type === "religious") {capacity *= 20};
	
	var venue = {available:false, capacity:capacity, cost:undefined, permitRequired: false};
	if (type === "greenspace") {
		venue.available = true;
		venue.cost = 0;
		venue.permitRequired = true;
	} else if (type === "religious") {
		venue.available = true;
		venue.cost = Math.ceil(capacity * rent / 100 ) * 100;
	} else if (type === "municipal") {
	} else if (capacity > 10 && Math.random() > 0.5 ) {
		venue.available = true;
		venue.cost = Math.ceil(capacity * rent / 100 ) * 100;
		}
	
	if (type === "religious" || type === "greenspace") {
			var payroll = capacity / 50;
		} else {
			var payroll = 2 ^ Math.random() * 10 << 0;
			payroll *= Math.max(1,rent);
		}
	
	var unskilledCap = Math.ceil(payroll * 0.3);
	var skilledCap = Math.ceil(payroll * 0.3);
	var managementCap = Math.ceil(payroll * 0.2);
	var executiveCap = Math.ceil(payroll * 0.1);
	var payroll = {unskilled:unskilledCap,skilled:skilledCap,management:managementCap,executive:executiveCap};
	
	// Paygrade
	var unskilled = 5 + Math.random() * 5 << 0;
	var skilled = Math.round(unskilled * (1 + Math.random()));
	var management = Math.round(skilled * (1 + Math.random()));
	var executive = Math.round(management * (1 + Math.random()));
	
	// Demographics
	var typicalClientele = {};
	var clientGenders = [[],[],[],[],[],[dataGenders.man],[dataGenders.man],[dataGenders.woman],[dataGenders.woman],[dataGenders.woman,dataGenders.genderqueer]][Math.random()* 10 << 0];
	var clientOrientation = [undefined,undefined,undefined,undefined,undefined,undefined,"Straight","Straight","Straight","Queer"][Math.random()* 10 << 0];

	var clientEthnicities = [dataEthnicities[neighborhood.pickList.ethnicity[neighborhood.pickList.ethnicity.length * Math.random() << 0]]];
	for (i = 0; i < 3; i++) {
		var newEthnicity = dataEthnicities[neighborhood.pickList.ethnicity[neighborhood.pickList.ethnicity.length * Math.random() << 0]];
		if (newEthnicity.name !== clientEthnicities[0].name && newEthnicity.assignedRace === clientEthnicities[0].assignedRace) {
			clientEthnicities.push(newEthnicity);
			};
		};
	
	if (type === "religious") {
		var clientFaiths = [faith];
		clientEthnicities = [];
		for (n=0;n<faith.typicalEthnicities.length/3;n++) {
			clientEthnicities.push(faith.typicalEthnicities[faith.typicalEthnicities.length * Math.random() << 0]);
			}
		if (clientEthnicities[0] == undefined) {clientEthnicities=[]};
		if (faith.issues.indexOf(dataIssues.homophobia) !== -1 && Math.random() < 0.8) {
				clientOrientation = "Straight";
			}
		};
	
	races = {};
	for (i in clientEthnicities) {
		races[clientEthnicities[i].assignedRace.key] = 1;
		};
	if (Object.keys(races).length === 1) {
		var clientRace = clientEthnicities[0].assignedRace ;
		};
		
	var typicalEmployees = {unskilled:{},skilled:{},management:{},executive:{}};
	var q = {unskilled:2,skilled:10,management:20,executive:30};
	for (e in typicalEmployees) {
		var races = community.privilegeList.race;
		if (Math.random() < 0.5) {typicalEmployees[e].race = dataRaces[races[curveRandom(q[e]) * races.length << 0]]};
		var orientations = community.privilegeList.orientation;
		if (Math.random() < 0.5) {typicalEmployees[e].orientation = orientations[curveRandom(q[e]) * orientations.length << 0]};
		var genders = community.privilegeList.gender;
		if (Math.random() < 0.5) {typicalEmployees[e].gender = dataGenders[genders[curveRandom(q[e]) * genders.length << 0]];typicalEmployees[e].orientation = "Queer"};
		if (Math.random() < 0.5) {typicalEmployees[e].faith = community.pickList.faiths[Math.random() * community.pickList.faiths.length << 0]};
// 		if (Math.random() < 0.5) {typicalEmployees[e].money = 2};
// 		if (Math.random() < 0.5) {typicalEmployees[e].status = 5};
		var num = Object.keys(typicalEmployees[e]);
		num = num.length;
		if (num === 0 || payroll[e] < 3) {delete typicalEmployees[e]};
		};
	if (type === "religious") {
		if (typicalEmployees.management == undefined) {typicalEmployees.management = {}};
		if (typicalEmployees.executive == undefined) {typicalEmployees.executive = {}};
		typicalEmployees.management.faith = faith.key;
		typicalEmployees.executive.faith = faith.key;
		if (faith.issues.indexOf(dataIssues.homophobia) !== -1) {
			for (e in typicalEmployees) {
				typicalEmployees[e].orientation = "Straight";
				};
			};
		if (faith.issues.indexOf(dataIssues.patriarchy) !== -1) {
			for (e in typicalEmployees) {
				typicalEmployees[e].gender = dataGenders.man;
				};
			};
		if (faith.typicalEthnicities !== undefined) {
			typicalEmployees.executive.ethnicities = faith.typicalEthnicities;
			};
		};
	
	var activeUnions = [];
	
	// Functions
	this.rename = function(newName) {
		this.name = newName;
		};
	
	this.newClient = function() {

		var newClient = new Person();
		
		if (this.typicalClientele.genders[0] !== undefined && Math.random() < 0.8) {
			var gender = this.typicalClientele.genders[this.typicalClientele.genders.length * Math.random() << 0];
			newClient.gender.public = gender;
			if (Math.random() < 0.8) {newClient.gender.identity = gender};
			if (Math.random() < 0.8) {newClient.gender.assigned = gender};
			};
		
		if (this.typicalClientele.ethnicities[0] !== undefined) {
			var ethnicity = this.typicalClientele.ethnicities[this.typicalClientele.ethnicities.length * Math.random() << 0];
			if (Math.random() < 0.8) {newClient.ethnicity[0] = ethnicity};
			if (Math.random() < 0.8) {newClient.ethnicity[1] = ethnicity};
			if (Math.random() < 0.8) {newClient.ethnicity[2] = ethnicity};
			if (Math.random() < 0.8) {newClient.ethnicity[3] = ethnicity};
			};
		
		if (this.typicalClientele.orientation !== undefined && newClient.orientation.name !== this.typicalClientele.orientation && Math.random() < 0.8) {
			newClient.orientation.name = this.typicalClientele.orientation;
			if (this.typicalClientele.orientation === "Queer" && newClient.orientation.attraction.length == 1) {
				if (Math.random() > 0.5) {
					newClient.orientation.attraction = [newClient.gender.identity];
				} else {
					newClient.orientation.attraction = [];
					genders = Object.keys(dataGenders);
					newClient.orientation.attraction.push(dataGenders[genders[genders.length * Math.random() << 0]]);
					newClient.orientation.attraction.push(dataGenders[genders[genders.length * Math.random() << 0]]);
				};
			} else {
				var opposite = dataGenders.man;
				if (newClient.gender.identity.name === "Man") {opposite = dataGenders.woman};
				newClient.orientation.attraction = [opposite];
				}
			};
		
		if (this.typicalClientele.faiths !== undefined && Math.random() < 0.8) {
				newClient.faith = this.typicalClientele.faiths[this.typicalClientele.faiths * Math.random() << 0];
			};
		
		newClient.growUp();
				
		if (this.type === "religious") {
			newClient.findChurch(this);
			newClient.findJob();
			newClient.findHousing();
		} else if (this.type = "residential") {
			newClient.findHousing(this);
			newClient.findChurch();
			newClient.findJob();
		} else {
			level = "regular";
			this.clients.push([newClient,level]);
			newClient.findHousing();
			newClient.findChurch();
			newClient.findJob();
			};
		
		view.displayNeighborhood(this.neighborhood);
		view.displayInstitution(this);
		
		return newClient;
		
		};
		
	this.newEmployee = function(level) {
		
		if (level === undefined) {
			level = 'unskilled';
			};

		var newEmployee = new Person();
		
		if (this.typicalEmployees[level] !== undefined) {
			if (this.typicalEmployees[level].gender !== undefined && Math.random() < 0.8) {
				var gender = this.typicalEmployees[level].gender;
				newEmployee.gender.public = gender;
				if (Math.random() < 0.8) {newEmployee.gender.identity = gender};
				if (Math.random() < 0.8) {newEmployee.gender.assigned = gender};
				};
		
			if (this.typicalEmployees[level].race !== undefined) {
				var ethnicities = this.typicalEmployees[level].race.ethnicities;
				if (Math.random() < 0.9) {newEmployee.ethnicity[0] = ethnicities[ethnicities.length * Math.random() << 0]};
				if (Math.random() < 0.9) {newEmployee.ethnicity[1] = ethnicities[ethnicities.length * Math.random() << 0]};
				if (Math.random() < 0.9) {newEmployee.ethnicity[2] = ethnicities[ethnicities.length * Math.random() << 0]};
				if (Math.random() < 0.9) {newEmployee.ethnicity[3] = ethnicities[ethnicities.length * Math.random() << 0]};			
				};
		
			if (this.typicalEmployees[level].orientation !== undefined && Math.random() < 0.8) {
				newEmployee.orientation.name = this.typicalEmployees[level].orientation;
				if (this.typicalEmployees[level].orientation === "Queer" && newEmployee.orientation.attraction.length == 1) {
					if (Math.random() > 0.5) {
						newEmployee.orientation.attraction = [newEmployee.gender.identity];
					} else {
						newEmployee.orientation.attraction = [];
						genders = Object.keys(dataGenders);
						newEmployee.orientation.attraction.push(dataGenders[genders[genders.length * Math.random() << 0]]);
						newEmployee.orientation.attraction.push(dataGenders[genders[genders.length * Math.random() << 0]]);
					};
				} else {
					var opposite = dataGenders.man;
					if (newEmployee.gender.identity.name === "Man") {opposite = dataGenders.woman};
					newEmployee.orientation.attraction = [opposite];
					}
				};
		
			if (this.typicalEmployees[level].faith !== undefined && Math.random() < 0.8) {
					newEmployee.faith = dataFaiths[this.typicalEmployees[level].faith];
				};
			};

		if (this.type === "religious" && level === "executive") {
			if (this.faith.clergyRestrictions.gender !== undefined && Math.random() < 0.9) {
				newEmployee.gender.identity = this.faith.clergyRestrictions.gender;
				newEmployee.gender.assigned = this.faith.clergyRestrictions.gender;
				newEmployee.gender.public = this.faith.clergyRestrictions.gender;
				}
			if (this.typicalEmployees.executive.ethnicities !== undefined) {
				var chance = 0.8;
				var ethnicities = this.typicalEmployees.executive.ethnicities;
				if (Math.random() < chance) {newEmployee.ethnicity[0] = ethnicities[ethnicities.length * Math.random() << 0]};
				if (Math.random() < chance) {newEmployee.ethnicity[1] = ethnicities[ethnicities.length * Math.random() << 0]};
				if (Math.random() < chance) {newEmployee.ethnicity[2] = ethnicities[ethnicities.length * Math.random() << 0]};
				if (Math.random() < chance) {newEmployee.ethnicity[3] = ethnicities[ethnicities.length * Math.random() << 0]};
				}
			};
		
		for (i=0;i<5;i++) {
			newEmployee.growUp();
			if (newEmployee.jobSearchPower() > this.paygrade[level]) {
				i = 100;
				};
			};
			
		if (this.type === "religious" && level === "executive") {
			newEmployee.faith = this.faith;
			if (this.faith.clergyRestrictions.gender !== undefined) {
				newEmployee.gender.public = this.faith.clergyRestrictions.gender;
				var firstNames = newEmployee.ethnicity[0].masculineNames;
				newEmployee.name.first = firstNames[firstNames.length * Math.random() << 0];;
				};
			if (this.faith.clergyRestrictions.orientation !== undefined) {
				if (newEmployee.orientation.name === "Queer") {newEmployee.orientation.closet = true};
				}
			if (this.faith.clergyRestrictions.celibacy === true) {newEmployee.personalNetwork = []}
			};
				
		if (this.type === "religious") {
			newEmployee.findChurch();
			newEmployee.findJob(this,level);
			newEmployee.findHousing();
		} else if (this.type = "residential") {
			newEmployee.findHousing();
			newEmployee.findChurch();
			newEmployee.findJob(this,level);
		} else {
			this.Employees.push([newEmployee,level]);
			newEmployee.findHousing();
			newEmployee.findChurch();
			newEmployee.findJob(this,level);
			};
		
		view.displayNeighborhood(this.neighborhood);
		view.displayInstitution(this);
		
		return newEmployee;
		
		};
		
	this.newList = function(name,issue) {
		if (name == undefined) {name = "New List"};
		this.subscriptionLists.push({name:name,subscribers:[],issue:issue});
		};
	
	this.renameList = function(list,newName) {
		this.subscriptionLists[list].name = newName;
		};
	
	this.addToList = function(list,subscriber) {
		var subscriber = this.subscriptionLists[0].subscribers[subscriber];
		this.subscriptionLists[list].subscribers.push(subscriber);
		};
		
	this.removeFromList = function(list,subscriber) {
		this.subscriptionLists[list].subscribers.splice(subscriber,1);
		};
	
	this.deleteList = function(list) {
		this.subscriptionLists.splice(list,1);
		};
		
	this.gainReputation = function(kind,gain,ceiling) {
		if (this.reputation[kind] !== undefined) {
			if (this.reputation[kind]+gain > ceiling) {
				gain = ceiling - this.reputation[kind];
				this.reputation[kind] = ceiling;
			} else {
				this.reputation[kind] += gain;
			};
		} else {
			this.reputation[kind] = gain;
		};
		if (kind === "efficacy") {
			kind = "Efficacy";
		} else if (kind === "corruption") {
			kind = "Corruption";
		} else {
			kind = dataIssues[kind].name;
		};
		var text = this.name + " gains " + gain + " reputation for " + kind + ".";
		gameLog.add("rep",text,true,this);
		};
		
	this.highestCauseReputation = function() {
		var highest = 0;
		var current = 'playerReputation';
		for (i in dataIssues) {
			if (this.reputation[i] > highest) {
				highest = this.reputations[i];
				current = i;
				};
			};
		return current;
		};

	// And now sticking data on the object for later reference
	this.name = name;
	this.type = type;
	this.status = status;
	this.rent = rent;
	this.capacity = capacity;
	this.venue = venue;
	this.payroll = payroll;
	this.paygrade = {unskilled:unskilled,skilled:skilled,management:management,executive:executive};

	this.typicalEmployees = typicalEmployees;
	
	this.employees = {volunteer:[],unskilled:[],skilled:[],management:[],executive:[]};
	this.clients = [];
	
	this.typicalClientele = {genders:clientGenders,orientation:clientOrientation,faiths:clientFaiths,ethnicities:clientEthnicities,race:clientRace};
	
	this.reputation = {efficacy:0,corruption:0};
	this.achievements = [];
	
	this.subscriptionLists = [{name:'All Subscribers',subscribers:[],issue:undefined}];
	
	this.organizations = {unions: activeUnions,allies:[]};
	
	this.neighborhood = neighborhood;
	
	neighborhood.institutions.push(this);
	
	institutions.push(this);
	
	if (type === "residential") {
		housing.push(this);
	} else if (type === "greenspace" || type === "shelter") {
		shelters.push(this);
	} else if (type === "religious") {
		if (congregationsByFaith[faith.key] == undefined) {
			congregationsByFaith[faith.key] = [this];
		} else {
			congregationsByFaith[faith.key].push(this);
		}
		if (congregationsBySect[faith.sect] == undefined) {
			congregationsBySect[faith.sect] = [this];
		} else {
			congregationsBySect[faith.sect].push(this);
		}
		if (congregationsByReligion[faith.name] == undefined) {
			congregationsByReligion[faith.name] = [this];
		} else {
			congregationsByReligion[faith.name].push(this);
		}
	}
	
	view.refreshMap();

};

function Person(neighborhood) {
	
	if (neighborhood === undefined) {
		neighborhood = neighborhoods[neighborhoods.length * Math.random << 0];
		}

	var genders = Object.keys(dataGenders);
	var n = Math.random();
	if (n < 0.4) {
			genderIdentity = dataGenders.man
		} else if (n < 0.8) {
			genderIdentity = dataGenders.woman
		} else {
			genderIdentity = dataGenders[genders[genders.length * Math.random() << 0]];		
		}

	var cisgender = Math.random();
	if ( cisgender < 0.8 && genderIdentity.name === "Man" ) {
			var genderAssigned = genderIdentity;
		} else if (cisgender < 0.8 && genderIdentity.name === "Woman") {
			var genderAssigned = genderIdentity;
		} else if (genderIdentity.name === "Woman") {
			var genderAssigned = dataGenders.man;
		} else if (genderIdentity.name === "Man") {
			var genderAssigned = dataGenders.woman;
		} else if (Math.random() > 0.5) {
			var genderAssigned = dataGenders.man;
		} else {
			var genderAssigned = dataGenders.woman;
		}
	if (Math.random() > 0.5) {
		var genderPublic = genderAssigned;
		} else {
		var genderPublic = genderIdentity;
		}
	
	var ethnicities = community.pickList.ethnicities;
	var ethnicity = [dataEthnicities[ethnicities[ethnicities.length * Math.random() << 0]]];
	ethnicity[1] = dataEthnicities[ethnicities[ethnicities.length * Math.random() << 0]];
	if (Math.random() < ethnicity[0].endogamy) {
		ethnicity[1] = ethnicity[0];
		ethnicity[2] = ethnicity[0];
		ethnicity[3] = ethnicity[0];
	} else if (Math.random() < ethnicity[1].endogamy) {
		ethnicity[2] = ethnicity[0];
		ethnicity[3] = ethnicity[1];
	} else {
		ethnicity[2] = dataEthnicities[ethnicities[ethnicities.length * Math.random() << 0]];
		ethnicity[3] = dataEthnicities[ethnicities[ethnicities.length * Math.random() << 0]];
	}
	var faith = [dataFaiths[ethnicity[0].majorityFaith],dataFaiths[ethnicity[1].majorityFaith],dataFaiths[ethnicity[2].majorityFaith],dataFaiths[ethnicity[3].majorityFaith]][4 * Math.random() << 0];
	
	var attraction = [];
	var orientation;
	var attractions = [Math.random()*3 << 0];
	for (i = 0; i < attractions; i++) {
		attraction.push(dataGenders[genders[genders.length * Math.random() << 0]]);
		}
	if (genderIdentity.name === "Man") {var opposite = dataGenders.woman}
	else if (genderIdentity.name === "Woman") {var opposite = dataGenders.man}
	if (Math.random() > 0.1 && opposite !== undefined) {attraction = [opposite]};
	
	if (attraction.length === 1 && genderIdentity.name === "Man" && attraction[0].name === "Woman") {
			orientation = "Straight";
		} else if (attraction.length === 1 && genderIdentity.name === "Woman" && attraction[0].name === "Man") {
			orientation = "Straight";
		} else {
			orientation = "Queer";
		}

	// Tagging Birth Details onto Object
	this.neighborhood = neighborhood;
	
	this.ethnicity = ethnicity;
	
	this.gender = {};
	this.gender.assigned = genderAssigned;
	this.gender.identity = genderIdentity;
	this.gender.public = genderPublic;
	
	this.orientation = {};
	this.orientation.name = orientation;
	this.orientation.attraction = attraction;
	
	this.faith = faith;
	
	people.push(this);
	
	// Gameplay Functions
	
	this.highestValue = function() {
		var highest = 0;
		var current = '';
		for (v in this.values) {
			if (this.values[v] > highest) {
				current = v;
				highest = this.values[v];
				};
			};
		return current;
		};
	
	this.selfCare = function(cost) {
		people[0].currencies.mana = Math.min(100,people[0].currencies.mana + 20);
		people[0].currencies.cash -= cost;
		advanceClock();
		};
	
	this.sleep = function(wake) {
		if (people[0].currencies.mana < 50) {
				people[0].currencies.mana = Math.min(50,people[0].currencies.mana + 20);
			};
		advanceClock();
		if (gameDate.getHours() !== wake) {
			this.sleep(wake);
			};
		};
	
	// Network Connection Functions	
	this.connections = [];
	
	this.jobSearchPower = function() {
		return (1+Math.max(0,this.resources.status))*(1+Math.max(0,this.resources.education))*(1+Math.max(0,this.resources.network));
		};
	
	this.findJob = function(institution,level) {
		var jobSearchPower = this.jobSearchPower();
		if (institution == undefined && level == undefined) {
			var openings = [];
			var crappyOpenings = [];
			for (i in institutions) {
				for (l in {unskilled:"unskilled",skilled:"skilled",management:"management",executive:"executive"})
					var threshold = institutions[i].paygrade[l];
					if (institutions[i].typicalEmployees[l] !== undefined) {
						if (institutions[i].typicalEmployees[l].faith !== this.faith.key) {threshold *= 1.3;};
						if (institutions[i].typicalEmployees[l].gender !== this.gender.public) {threshold *= 1.3;};
						if (institutions[i].typicalEmployees[l].gender !== this.gender.assigned) {threshold *= 1.3;};
						if (institutions[i].typicalEmployees[l].orientation !== this.orientation.name) {threshold *= 1.3;};
						if (institutions[i].typicalEmployees[l].race !== this.race) {threshold *= 1.3;};
						};
					if (institutions[i].employees[l].length < institutions[i].payroll[l] && threshold < jobSearchPower && threshold < jobSearchPower/2) {
						crappyOpenings.push([institutions[i],l]);
					} else if (institutions[i].employees[l].length < institutions[i].payroll[l] && institutions[i].paygrade[l] < jobSearchPower) {
						openings.push([institutions[i],l]);
					};
			}
			if (openings.length === 0) {
				var opening = crappyOpenings[crappyOpenings.length * Math.random() << 0];
			} else {
				var opening = openings[openings.length * Math.random() << 0];
				}
			
			if (opening !== undefined) {
				institution = opening[0];
				level = opening[1];
			} else {
				institution = new Institution();
				if (institution.paygrade.unskilled > jobSearchPower) {
					institution = undefined;
					level = undefined;
				} else if (institution.paygrade.skilled > jobSearchPower) {
					level = "unskilled";
				} else if (institution.paygrade.management > jobSearchPower) {
					level = "management";
				} else {
					level = "executive";
				}
			}
		} else if (level == undefined) {
			if (institution.paygrade.executive < jobSearchPower) {
				level = "executive";
			} else if (institution.paygrade.management < jobSearchPower) {
				level = "management";
			} else if (institution.paygrade.skilled < jobSearchPower) {
				level = "skilled";
			} else if (institution.paygrade.unskilled < jobSearchPower) {
				level = "unskilled";
			} else {
				level = "volunteer";
			}
		};
		if (institution !== undefined) {
			this.connections.push([institution,"works at",level,["morning","afternoon"]]);
			institution.employees[level].push(this);
			console.log(this.name.first + " " + this.name.last + "'s jobSeachPower of " + jobSearchPower + " pulled down a " + institution.paygrade[level] + " " + level + " job at " + institution.name);
		} else {
			console.log(this.name.first + " " + this.name.last + "'s jobSeachPower of " + jobSearchPower + " cannot find a job and is unemployed!");
		}
	};

	this.findHousing = function(institution,level) {
		if (institution == undefined) {
			var vacancies = [];
			console.log(this);
			for (i in housing) {
				if (housing[i].capacity > housing[i].clients.length && housing[i].rent * 0.33 < this.resources.money) {
					vacancies.push(housing[i])
				}
			}
			
			if (vacancies.length === 0) {
				institution = new Institution(undefined,"residential");
			} else {
				institution = vacancies[vacancies.length * Math.random() << 0];
			}
		}
		if (level == undefined) {
			if (this.resources.money - this.resources.debt >= institution.rent) {
				var level = "homeowner";
			} else if (this.resources.money >= institution.rent * 0.8) {
				var level = "lessee";
			} else if (this.resources.money + this.resources.network >= institution.rent * 0.8) {
				var level = "lessee";
				this.personalNetwork.push(["a roomate"])
			} else if (this.resources.money >= institution.rent * 0.4) {
				var level = "renter";
			} else if (this.resources.money + this.resources.network >= institution.rent * 0.4) {
				var level = "renter";
				this.personalNetwork.push(["a roomate"])
			} else if (this.resources.network >= institution.rent * 0.2) {
				var level = "guest";
				this.personalNetwork.push(["a roomate"])
			} else {
				var level = "homeless";
			}
		}
		if (level === "homeless") {
			institution = shelters[shelters.length * Math.random() << 0];
			if (institution === undefined || Math.random() > 0.5) {
				institution = new Institution(undefined,"greenspace");
				}
		}
		this.connections.push([institution,"lives at",level]);
		institution.clients.push([this,level]);
	};
	
	this.findChurch = function(church,level) {
		console.log(this.faith);
		var churches = [];
		if (church == undefined && this.faith.denomination !== "Athiest") {
			churches = churches.concat(congregationsByFaith[this.faith.key]);
			churches = churches.concat(congregationsBySect[this.faith.sect]);
			churches = churches.concat(congregationsByReligion[this.faith.name]);
//			this produces lists with a lot of duplicates
		} else if (church !== undefined) {
			churches = [church];
		} else if (this.faith.denomination == "Athiest") {
			churches = [];
		};
		if (level == undefined) {	
			var level = ["friend","member","volunteer","officer"][Math.min(3,Math.max(0,this.resources.devotion))];
		}
		for (i in churches) {
			var score = Math.random() * 3 << 0;
			if (churches[i].status > this.resources.status-2 && churches[i].status < this.resources.status+2) {score++};
			if (churches[i].faith.denomination === this.faith.denomination) {score += 5};
			if (churches[i].faith.sect === this.faith.sect) {score += 4};
			if (churches[i].faith.name === this.faith.name) {score += 3};
			if (churches[i].typicalClientele.ethnicities.indexOf(this.ethnicity[0]) !== -1) {score ++};
			if (churches[i].typicalClientele.ethnicities.indexOf(this.ethnicity[1]) !== -1) {score ++};
			if (churches[i].typicalClientele.ethnicities.indexOf(this.ethnicity[2]) !== -1) {score ++};
			if (churches[i].typicalClientele.ethnicities.indexOf(this.ethnicity[3]) !== -1) {score ++};
			if (churches[i].typicalClientele.genders.indexOf(this.gender.identity) !== -1) {score ++};
			if (churches[i].typicalClientele.race === this.race) {score++};
			if (churches[i].typicalClientele.orientation === this.orientation.name) {score++};
			if (churches[i].neighborhood.name === this.neighborhood.name) {score++};
			churches[i] = [churches[i],score];
			}
		churches.sort(function(a,b) {return (a[1] < b[1]) ? 1 : ((b[1] < a[1]) ? -1 : 0);});
		if (churches.length !== 0 && churches[0][1] > 10) {
			church = churches[0][0];
			this.connections.push([church,"attends",level]);
			church.clients.push([this,level]);
		} else {
			church = new Institution(undefined,"religious",this.faith);
			this.connections.push([church,"attends",level]);
			church.clients.push([this,level]);
		}
	};
		
	this.growUp = function() {
	
		var race;
		if (this.ethnicity[0].assignedRace.name == this.ethnicity[1].assignedRace.name && this.ethnicity[0].assignedRace.name == this.ethnicity[2].assignedRace.name && this.ethnicity[0].assignedRace.name == this.ethnicity[3].assignedRace.name) {
				race = this.ethnicity[0].assignedRace;
			} else {
				race = dataRaces.multiracial;
			};
	
		var issues = [];
		var values = {
			care: 1 + Math.random() * 3 << 0,
			fairness: 1 + Math.random() * 3 << 0,
			liberty: 1 + Math.random() * 3 << 0,
			loyalty: 1 + Math.random() * 3 << 0,
			authority: 1 + Math.random() * 3 << 0,
			purity: 1 + Math.random() * 3 << 0,
			ambition: 1 + Math.random() * 3 << 0,
			};
		var resources = {status:1,money:1,debt:0,education:1,network:0,spouse:0,child:0,devotion:0,closet:0,tourOfDuty:0};
	
	
		var age = Math.round(Math.max(Math.random()*20+Math.random()*20+Math.random()*20+Math.random()*20,18));
		
		var backstories = [];
		var backstoriesPickList = [];
		var newBackstory;
	
		// Adding Family and Youth Backstory Blocks
	
		backstoriesPickList = backstoriesFamily;
		for (i = 0; i < 3; i++) {
			backstories.push({type:backstoriesPickList[backstoriesPickList.length * Math.random() << 0],known:0,details:[Math.random(),Math.random(),Math.random()]});
			}
		
		for (i = 0; i < 2; i++) {
			backstoriesPickList = backstoriesYouth;
			if (orientation === "Queer" && resources.closet === 0) {backstoriesPickList=backstoriesPickList.concat(backstoriesQueer)};
			if (genderIdentity.name !== genderPublic.name) {backstoriesPickList=backstoriesPickList.concat(backstoriesTrans)};
			backstories.push({type:backstoriesPickList[backstoriesPickList.length * Math.random() << 0],known:0,details:[Math.random(),Math.random(),Math.random()]});
			if (backstories[backstories.length-1].type.resourceLosses[0] === "closet") {resources.closet--};
			if (backstories[backstories.length-1].type.updateDemo[0] === "gender") {genderPublic = genderIdentity};
			}

		// Processing Youth+Family Backstory Blocks' Effects Here
		for (i in backstories) {
			for (n in backstories[i].type.values) {
				values[backstories[i].type.values[n]]++;
				}
			for (n in backstories[i].type.resources) {
				resources[backstories[i].type.resources[n]]++;
				}
			for (n in backstories[i].type.resourceLosses) {
				resources[backstories[i].type.resourceLosses[n]]--;
				}
			for (n in backstories[i].issues) {
				if (issues.indexOf(backstories[i].type.issues[n]) == -1) {
					issues.push(backstories[i].type.issues[n]);
					}
				}
			if (backstories[i].updateDemo !== undefined) {
				var type = backstories[i].type.updateDemo[0];
				var list = backstories[i].type.updateDemo[1];
				if (type === "faith") {
					var newFaith = list[list.length * backstories[i].details[0] << 0];
					faith = newFaith;
				} else if (type === "gender") {
					genderPublic = genderIdentity;
					}
				}
			}

		// Mature Phase Backstory Blocks	
		for (y = 18; y < age; y += 12) {
			backstoriesPickList = backstoriesMature;
			if (orientation === "Queer" && resources.closet === 0) {backstoriesPickList=backstoriesPickList.concat(backstoriesQueer)};
			if (genderIdentity.name !== genderAssigned.name) {backstoriesPickList=backstoriesPickList.concat(backstoriesTrans)};
			for (i=0;i<resources.education;i++) {
				backstoriesPickList = backstoriesPickList.concat(backstoriesMatureEducation);
			}
			for (i=0;i<resources.money;i++) {
				backstoriesPickList = backstoriesPickList.concat(backstoriesMatureMoney);
			}
			for (i=0;i<resources.status;i++) {
				backstoriesPickList = backstoriesPickList.concat(backstoriesMatureStatus);
			}
			for (i=0;i<resources.network;i++) {
				backstoriesPickList = backstoriesPickList.concat(backstoriesMatureNetwork);
			}
			for (i=0;i<resources.child;i++) {
				backstoriesPickList = backstoriesPickList.concat(backstoriesMatureChild);
			}
			newBackstory = backstoriesPickList[backstoriesPickList.length * Math.random() << 0];
			backstories.push({type:newBackstory,known:0,details:[Math.random(),Math.random(),Math.random()]});
		
			for (n in newBackstory.values) {
				values[newBackstory.values[n]]++;
				}
			for (n in newBackstory.resources) {
				resources[newBackstory.resources[n]]++;
				}
			for (n in newBackstory.resourceLosses) {
				resources[newBackstory.resourceLosses[n]]--;
				}
			for (n in newBackstory.issues) {
				if (issues.indexOf(newBackstory.issues[n]) == -1) {
					issues.push(newBackstory.issues[n]);
					}
				}
			if (newBackstory.updateDemo !== undefined) {
				var type = newBackstory.updateDemo[0];
				var list = newBackstory.updateDemo[1];
				if (type === "faith") {
					var newFaith = list[list.length * Math.random() << 0];
					faith = newFaith;
				} else if (type === "gender") {
					genderPublic = genderIdentity;
					}
				}
		
			}
			
		// Identity-based Issues not handled in Backstory
		var identityIssues = [];
		identityIssues = identityIssues.concat(genderIdentity.issues);
		identityIssues = identityIssues.concat(race.issues);
		identityIssues = identityIssues.concat(faith.issues);
		if (orientation === "Queer") {identityIssues = identityIssues.concat(dataIssues.queerRights)};
		for (i in identityIssues) {
			if (issues.indexOf(identityIssues[i]) == -1) {
				issues.push(identityIssues[i]);
				}
		}
	
		
		// Picking Names, now that we've established current Gender Identity in Backstory	
		var firstNames = [];
		if (genderPublic.name === dataGenders.man.name) {
			firstNames = ethnicity[0].masculineNames;
			firstNames = firstNames.concat(ethnicity[1].masculineNames);
			firstNames = firstNames.concat(ethnicity[2].masculineNames);
			firstNames = firstNames.concat(ethnicity[3].masculineNames);
			firstNames = firstNames.concat(common.masculineNames);
		} else if (genderPublic.name === dataGenders.woman.name) {
			firstNames = ethnicity[0].feminineNames;
			firstNames = firstNames.concat(ethnicity[1].feminineNames);
			firstNames = firstNames.concat(ethnicity[2].feminineNames);
			firstNames = firstNames.concat(ethnicity[3].feminineNames);
			firstNames = firstNames.concat(common.feminineNames);
		}
		firstNames = firstNames.concat(ethnicity[0].neutralNames);
		firstNames = firstNames.concat(ethnicity[1].neutralNames);
		firstNames = firstNames.concat(ethnicity[2].neutralNames);
		firstNames = firstNames.concat(ethnicity[3].neutralNames);
		firstNames = firstNames.concat(common.neutralNames);
		
		var firstName = firstNames[firstNames.length * Math.random() << 0];
		var middleName = firstNames[firstNames.length * Math.random() << 0];
		var surnames = ethnicity[0].surnames.concat(common.surnames);
		var lastName = surnames[surnames.length * Math.random() << 0];
	
	
	
		// Create stubs for Personal Network
		this.personalNetwork = [];
		var so = attraction[attraction.length * Math.random() << 0];
		if (resources.spouse > 0 || Math.random() > 0.7) {
			if (so === undefined) {
				this.personalNetwork.push(["a spouse"])
			} else if (so.name === "Man") {
				this.personalNetwork.push(["a husband"])
			} else if (so.name === "Woman") {
				this.personalNetwork.push(["a wife"])
			} else {
				this.personalNetwork.push(["a spouse"])
			}
		} else if (Math.random() > 0.4) {
			if (so === undefined) {
				this.personalNetwork.push(["a significant other"])
			} else if (so.name === "Man") {
				this.personalNetwork.push(["a boyfriend"])
			} else if (so.name === "Woman") {
				this.personalNetwork.push(["a girlfriend"])
			} else {
				this.personalNetwork.push(["a significant other"])
			}
		}
		var children = resources.child + Math.random() * 2 << 0 ;
		for (i=0;i<children;i++) {
			var childBirth = new Date(new Date() - (Math.random() * (age-15) * 31536000000));
			this.personalNetwork.push(["a child",undefined,childBirth])
		}
	
		// Sticking stuff on the actual object for later reference now
		
		this.race = race;
		
		this.name = {};
		this.name.first = firstName;
		this.name.middle = middleName;
		this.name.last = lastName;
	
	
		this.age = age;
		this.backstories = backstories;
	
		this.values = values;
		this.issues = issues;
		this.resources = resources;
		
	};
	
	this.reception = function(action) {
		console.log("action:",action);
		console.log(this.name.first + " responds to " + action.constructor.name);
		
		var baseCauseValue = 0;
		var appeal = 0;
		
		var reticence = 0;
		if (action.demand.type === "subscribe") {reticence = 10}
		else if (action.demand.type === "donate") {reticence = 30}
		else if (action.demand.type === "attend") {reticence = 50}
		else if (action.demand.type === "sponsor") {reticence = 80}
		else if (action.demand.type === "policy") {reticence = 100}
		else if (action.demand.type === "employment") {reticence = 1000}
		else if (action.demand.type === "alliance") {reticence = 1000}
		
		console.log(action.demand.cause);
		
		if (this.issues.indexOf(action.demand.cause) !== -1) {
			baseCauseValue = action.demand.cause.value(this);
			appeal = this.values[action.appeal];
//			is the appeal complementary?
		} else if (Math.random()*20 < this.values[action.appeal] && action.demand.cause !== dataIssues.playerReputation) {
			this.issues.push(action.demand.cause);
			baseCauseValue = action.demand.cause.value(this) / 2;
			appeal = this.values[action.appeal];
			gameLog.add("introduceCause",this.name.first + " " + this.name.last + " seems to have been unfamiliar with the issue but takes a provisional interest.",true,this);
			};
		
		var reputation = 0;
		for (i in action.sponsors) {
			reputation += action.sponsors[i][0].reputation.efficacy;
			reputation -= action.sponsors[i][0].reputation.corruption;
			}
		
		var power = baseCauseValue + appeal + reputation;
		
		var peopleIndex = people.indexOf(this);
		action.demand.log(peopleIndex,action.sponsors[0][0],power);
		
		var donation = Math.ceil(5 * Math.pow(2,1+this.resources.money));
		
		var strength = action.demand.strength(peopleIndex);
		
		var text = this.name.first + " " + this.name.last + ": ";
		if (strength < reticence) {
			if (strength === 0) {
				text += "'Sorry, I am completely disinterested in that sort of thing.'";
			} else if (this.issues.indexOf(action.demand.cause) !== -1 && baseCauseValue > 10) {
				text += "'That's an issue I really care about, I just… can't right now.'";
			} else {
				text += "'No thank you.'";
			}
			text += " <span class='gameNumbers'>(" + action.demand.strength(peopleIndex) + "/" + reticence + ")</span>";
			gameLog.add("reception",text,true,this);
		} else if (action.demand.type === "subscribe") {
			console.log(action.demand);
			if (action.demand.subject[0].subscribers.indexOf(this) == -1) {action.demand.subject[0].subscribers.push(this)};
			if (action.demand.subject.length > 1 && action.demand.subject[1].subscribers.indexOf(this) == -1) {
				action.demand.subject[1].subscribers.push(this);
				};
			gameLog.add("reception",text+"'I'd love to hear more, sign me up!'",true,this);
			view.refreshActions();
		} else if (action.demand.type === "donate") {
			action.demand.subject.currencies.cash += donation;
			action.demand.log(peopleIndex,this,-80);
			gameLog.add("reception",text+"'I can donate $" + donation + ", I hope that helps.'",true,this);
			view.refreshHeader();
		} else if (action.demand.type === "attend") {
			if (action.demand.subject.rsvps.acceptances.indexOf(this) == -1) {
				action.demand.subject.rsvps.acceptances.push(this);
			};
			gameLog.add("reception",text+"'I'll be there!'",true,this);
		} else if (action.demand.type === "sponsor") {
			action.demand.subject[1].sponsors.push({sponsor:action.demand.subject[0],contribution:10*(action.demand.subject[0].rent+4)});
			gameLog.add("reception",text+"'I'd love to!'",true,this);
		} else if (action.demand.type === "policy") {
			gameLog.add("reception",text+"'I'll change that policy!'",true,this);
		} else if (action.demand.type === "employment") {
			gameLog.add("reception",text+"'I'd love to work with you!'",true,this);
		} else if (action.demand.type === "alliance") {
			gameLog.add("reception",text+"'My organization is your ally!'",true,this);
		} else {
			console.log("error! unknown demand type:");
			console.log(action.demand.type);
			};
	};
	
	this.revealBackstory = function(event) {
		var unknownBackstories = [];
		for (i in this.backstories) {
			if (this.backstories[i].known === 0) {
				unknownBackstories.push(this.backstories[i]);
				};
			}
		var reveals = 2;
		if (event === 'connect') {
			reveals = 4;
		} else if (event === 'visit') {
			reveals = 3;
		} else if (event === 'call') {
			reveals = 1;
		};
		
		for (i=0;i<reveals;i++) {
			var tellBackstory = unknownBackstories[unknownBackstories.length * Math.random() << 0];
			if (tellBackstory.known === 0) {
				var backstoryText = "You also learn a bit of their story: " + tellBackstory.type.name;
				tellBackstory.known = 1;
				gameLog.add("backstory",backstoryText,true,this);
				};
			};
	};
	

};

function Event(name,type,date,sponsors,venue,rsvps,demand,appeal,target) {
	this.name = name;
	this.type = type;
	this.date = date;
	
	this.venue = venue;
	
	this.demand = demand;
	this.appeal = appeal;
	this.target = target;
	this.sponsors = sponsors;
	
	this.rsvps = {declines:[],acceptances:[]};
	this.playerRSVP = false;
	
	this.amenities = {};
	
	this.prep = 0;
	
	var key = date.getFullYear().toString() + ('0' + date.getMonth()).slice(-2) + ('0' + date.getDate()).slice(-2);
	if (events[key] == undefined) {
		events[key] = [this];
	} else {
		events[key].push(this);
		};
	
	};

function Communication(type,articles,publisher,audience) {
	this.type = type;
	this.articles = articles;
	this.publisher = publisher;
	this.audience = audience;
	this.progress = 0;
	this.published = false;
	drafts.push(this);
	};

function Article(demand,appeal,target,issue,publisher) {
	this.demand = demand;
	this.appeal = appeal;
	this.target = target;
	this.issue = issue;
	this.sponsors = [[publisher,0]];
};

function Call(demand,appeal,target,caller) {
	this.demand = demand;
	this.appeal = appeal;
	this.target = [target];
	this.sponsors = [[caller,0]];
};

function Visit(demand,appeal,target,visitor) {
	this.demand = demand;
	this.appeal = appeal;
	this.target = [target];
	this.sponsors = [[visitor,0]];
};

function Demand(type,subject,cause) {
	
	this.type = type;
	this.subject = subject;
	this.cause = cause;
	this.history = {};
	
	this.strength = function(peopleIndex) {
		var total = 0;
		for (i in this.history[peopleIndex]) {
			total += this.history[peopleIndex][i].power;
		}
		return total;
	};
	
	this.log = function(person,sponsor,power) {
		if (this.history[person] !== undefined) {
			this.history[person].push({sponsor:sponsor,power:power,timestamp:new Date(gameDate)});
		} else {
			this.history[person] = [{sponsor:sponsor,power:power,timestamp:new Date(gameDate)}];
			};
	};
	
	demands.push(this);

};

function lookupDemand(type,subject,cause) {
	for (i in demands) {
		if (demands[i].type === type && demands[i].subject === subject && demands[i].cause === cause) {
			return demands[i]
		};
		if (subject.length !== undefined && demands[i].type === type && demands[i].cause === cause) {
			var check = true;
			for (n in subject) {
				if (demands[i].subject[n] !== subject[n]) {
				check = false;
				};
			};
			if (check === true) {return demands[i]}
		};
	};
	return new Demand(type,subject,cause);
};