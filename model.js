
var people = [];
var neighborhoods = [];
var institutions = [];
var housing = [];

var churchesByFaith = {};
var churchesBySect = {};
var churchesByReligion = {};

function Community() {
	
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
	
	ethnicitiesPickList = Array(100);
	total = 0;
	for (i in ethnicities) {
			ethnicitiesPickList.fill(ethnicities[i],total,total + demographics.ethnicity[ethnicities[i]] * 100);
			total += demographics.ethnicity[ethnicities[i]]*100;
		}
	
	faithsPickList = Array(100);
	total = 0;
	for (i in faiths) {
			faithsPickList.fill(faiths[i],total,total + demographics.faith[faiths[i]] * 100);
			total += demographics.faith[faiths[i]]*100;
		}
	
	this.demographics = demographics;
	this.pickList = {};
	this.pickList.ethnicities = ethnicitiesPickList;
	this.pickList.faiths = faithsPickList;
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
	var ethnicity = dataEthnicities[ethnicities[ethnicities.length * Math.random() << 0]];
	var race = ethnicity.assignedRace;
	
	var attraction = [];
	var orientation;
	var attractions = Math.round(Math.random()*3)
	for (i = 0; i < attractions; i++) {
		attraction.push(dataGenders[genders[genders.length * Math.random() << 0]]);
		}
	
	if (attraction.length === 1 && genderIdentity.name === "Man" && attraction[0].name === "Woman") {
			orientation = "Straight";
		} else if (attraction.length === 1 && genderIdentity.name === "Woman" && attraction[0].name === "Man") {
			orientation = "Straight";
		} else {
			orientation = "Queer";
		}
	
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
	var resources = {status:1,money:1,education:1,network:0,child:0,devotion:0,closet:0};
	
	var faith = dataFaiths[ethnicity.majorityFaith];
	
	var age = Math.round(Math.max(Math.random()*20+Math.random()*20+Math.random()*20+Math.random()*20,18));
	
	// Here's where we change the randomly-generated information in order to fit the arguments of the Person() call
	
	var backstories = [];
	var backstoriesPickList = [];
	var newBackstory;
	
	// Adding Family and Youth Backstory Blocks
	
	backstoriesPickList = backstoriesFamily;
	for (i = 0; i < 3; i++) {
		backstories.push(backstoriesPickList[backstoriesPickList.length * Math.random() << 0]);
		}
		
	for (i = 0; i < 2; i++) {
		backstoriesPickList = backstoriesYouth;
		if (orientation === "Queer" && resources.closet === 0) {backstoriesPickList=backstoriesPickList.concat(backstoriesQueer)};
		if (genderIdentity.name !== genderPublic.name) {backstoriesPickList=backstoriesPickList.concat(backstoriesTrans)};
		backstories.push(backstoriesPickList[backstoriesPickList.length * Math.random() << 0]);
		if (backstories[backstories.length-1].resourceLosses[0] === "closet") {resources.closet--};
		if (backstories[backstories.length-1].updateDemo[0] === "gender") {genderPublic = genderIdentity};
		}

	// Processing Youth+Family Backstory Blocks' Effects Here
	for (i in backstories) {
		for (n in backstories[i].values) {
			values[backstories[i].values[n]]++;
			}
		for (n in backstories[i].resources) {
			resources[backstories[i].resources[n]]++;
			}
		for (n in backstories[i].resourceLosses) {
			resources[backstories[i].resourceLosses[n]]--;
			}
		for (n in backstories[i].issues) {
			if (issues.indexOf(backstories[i].issues[n]) == -1) {
				issues.push(backstories[i].issues[n]);
				}
			}
		if (backstories[i].updateDemo !== undefined) {
			var type = backstories[i].updateDemo[0];
			var list = backstories[i].updateDemo[1];
			if (type === "faith") {
				var newFaith = list[list.length * Math.random() << 0];
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
		backstories.push(newBackstory);
		
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
		if (issues.indexOf(identityIssues[n]) == -1) {
			issues.push(identityIssues[n]);
			}
	}
	
		
	// Picking Names, now that we've established current Gender Identity in Backstory	
	if (genderPublic.name === dataGenders.man.name) {
		var firstNames = ethnicity.masculineNames;
		firstNames = firstNames.concat(common.masculineNames);
	} else if (genderPublic.name === dataGenders.woman.name) {
		var firstNames = ethnicity.feminineNames;
		firstNames = firstNames.concat(common.feminineNames);
	} else {
		var firstNames = ethnicity.neutralNames;
		firstNames = firstNames.concat(common.neutralNames);
	}
	firstNames = firstNames.concat(ethnicity.neutralNames);
	firstNames = firstNames.concat(common.neutralNames);
	var firstName = firstNames[firstNames.length * Math.random() << 0];
	var middleName = firstNames[firstNames.length * Math.random() << 0];
	var lastName = ethnicity.surnames[ethnicity.surnames.length * Math.random() << 0];
	
	
	// Network Connection Functions
	this.connections = [];
	if (resources.spouse > 0 || Math.random() > 0.5) {
		console.log('Add Spouse');
	}
	
	// findJob() pays no attention to money, status, or education, and it should
	this.findJob = function(institution,level) {
		if (institution == undefined && Math.random() < 0.8) {
			var institution = institutions[institutions.length * Math.random() << 0];
		} else if (institution == undefined) {
			institution = new Institution();
		};
		if (level == undefined) {	
			var level = ["volunteer","entry","management","executive"][4 * Math.random() << 0];
		};
		this.connections.push([institution,"works at",level]);
		institution.employees.push([this,level]);
	};

	// findHousing() pays no attention to money or status, and it should
	this.findHousing = function(institution,level) {
		if (institution == undefined && Math.random() < 0.8) {
			institution = housing[housing.length * Math.random() << 0];
		} else if (institution == undefined) {
			institution = new Institution(undefined,"residential");
		};
		if (level == undefined) {	
			var level = ["squatter","renter","leaser","owner"][4 * Math.random() << 0];
		}
		this.connections.push([institution,"lives at",level]);
		institution.clients.push([this,level]);
	};
	
	this.findChurch = function(church,level) {
		if (church == undefined) {
			if (churchesByFaith[this.faith.key] !== undefined && Math.random() > 0.1) {
				var churches = churchesByFaith[this.faith.key];
				church = churches[churches.length * Math.random() << 0];
			} else if (churchesBySect[this.faith.sect] !== undefined && Math.random() > 0.3) {
				var churches = churchesBySect[this.faith.sect];
				church = churches[churches.length * Math.random() << 0];
			} else if (churchesByReligion[this.faith.name] !== undefined && Math.random() > 0.5) {
				var churches = churchesByReligion[this.faith.name];
				church = churches[churches.length * Math.random() << 0];
			} else {
				church = new Institution(undefined,"religious",this.faith);
			}
		};
		if (level == undefined) {	
			var level = ["friend","member","volunteer","officer"][Math.min(3,Math.max(0,this.resources.devotion))];
		}
		this.connections.push([church,"attends",level]);
		church.employees.push([this,level]);
	};
	
	// Sticking stuff on the actual object for later reference now
	this.name = {};
	this.name.first = firstName;
	this.name.middle = middleName;
	this.name.last = lastName;
	
	this.neighborhood = neighborhood;
	
	this.race = race;
	this.ethnicity = ethnicity;
	
	this.gender = {};
	this.gender.assigned = genderAssigned;
	this.gender.identity = genderIdentity;
	this.gender.public = genderPublic;
	
	this.orientation = {};
	this.orientation.name = orientation;
	this.orientation.attraction = attraction;
	
	this.faith = faith;
	
	this.age = age;
	this.backstories = backstories;
	
	this.values = values;
	this.issues = issues;
	this.resources = resources;
	
	people.push(this);
	
	// Functions
	

};

function Neighborhood() {

	var statusDemographics = 1 + Math.random() * 6 << 0;
	var moneyDemographics = Math.max(1,statusDemographics + [-2,-1,-1,-1,0,1,1,1,2][9 * Math.random() << 0]);
	
	var residential = Math.random() * 2 ;
	var commerce = Math.random();
	var industry = Math.random();
	var municipal = Math.random() / 2 ;
	var total = residential + commerce + industry + municipal;
	var zoning = {
		residential: residential/total,
		commerce: commerce/total,
		industry: industry/total,
		municipal: municipal/total,
		}
	
	var races = Object.keys(dataRaces);
	var residents = {};
	var total = 0;
	for (i in races) {
		residents[races[i]] = Math.random();
		total += residents[races[i]];
		}
	var raceDemographics = {}
	for (i in races) {
			raceDemographics[races[i]] = residents[races[i]]/total;
		}
		
	var name = dataNeighborhoodNames.first[dataNeighborhoodNames.first.length * Math.random() << 0] + dataNeighborhoodNames.last[dataNeighborhoodNames.last.length * Math.random() << 0];
	
	
	this.demographics = {};
	this.demographics.status = statusDemographics;
	this.demographics.money = moneyDemographics;
	this.demographics.race = raceDemographics;
	
	this.zoning = zoning;
	
	this.institutions = [];
	
	this.name = name;

	neighborhoods.push(this);
	
	this.color = neighborhoods.length - 1;

};

function Institution(neighborhood,type,faith) {

	if (neighborhood == undefined) {
		neighborhood = neighborhoods[neighborhoods.length * Math.random() << 0];
	}

	if (type == undefined) {
		type = ["residential","commerce","industry","municipal","greenspace","religious"][Math.random() * 6 << 0]
	}
	
	if (type === "religious" && faith == undefined) {
		var faiths = Object.keys(dataFaiths);
		faith = dataFaiths[faiths[faiths.length * Math.random() << 0]]
	}
	
	if (type !== "religious") {
		var firstName = dataInstitutionNames[type].first[dataInstitutionNames[type].first.length * Math.random() << 0];
		var productName = dataInstitutionNames[type].product[dataInstitutionNames[type].product.length * Math.random() << 0];
		var lastName = dataInstitutionNames[type].last[dataInstitutionNames[type].last.length * Math.random() << 0];
		var name = firstName + " " + productName + " " + lastName;
	} else {
		var name = "First " + faith.congregation[faith.congregation.length * Math.random() << 0 ];
		this.faith = faith;
	}

	var status = Math.random() * 3 << 0;
	status += neighborhood.demographics.status - 1;
	var rent = Math.random() * 3 << 0;
	rent += neighborhood.demographics.money - 1;
	
	// Paygrade
	var entry = Math.random() * 10 << 0;
	var management = entry + 1 + Math.random() * 10 << 0;
	var executive = management + 1 + Math.random() * 10 << 0;
	
	var typicalClientele = "Placeholder";
	var typicalEmployees = "Placeholder";
	
	var activeUnions = [];

	this.name = name;
	this.type = type;
	this.status = status;
	this.rent = rent;
	this.paygrade = {entry:entry,management:management,executive:executive};
	this.typicalClientele = typicalClientele;
	this.typicalEmployees = typicalEmployees;
	
	this.employees = [];
	this.clients = [];
	
	this.organizations = {};
	this.organizations.unions = activeUnions;
	
	this.neighborhood = neighborhood;
	
	neighborhood.institutions.push(this);
	
	institutions.push(this);
	
	if (type === "residential") {
		housing.push(this);
	} else if (type === "religious") {
		if (churchesByFaith[faith.key] == undefined) {
			churchesByFaith[faith.key] = [this];
		} else {
			churchesByFaith[faith.key].push(this);
		}
		if (churchesBySect[faith.sect] == undefined) {
			churchesBySect[faith.sect] = [this];
		} else {
			churchesBySect[faith.sect].push(this);
		}
		if (churchesByReligion[faith.name] == undefined) {
			churchesByReligion[faith.name] = [this];
		} else {
			churchesByReligion[faith.name].push(this);
		}
	}

};
