
var people = [];
var neighborhoods = [];
var institutions = [];
var housing = [];

var congregationsByFaith = {};
var congregationsBySect = {};
var congregationsByReligion = {};

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
	this.population = 100;
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
	console.log(ethnicities);
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
	var resources = {status:1,money:1,debt:0,education:1,network:0,child:0,devotion:0,closet:0,tourOfDuty:0};
	
	var faith = dataFaiths[ethnicity.majorityFaith];
	
	var age = Math.round(Math.max(Math.random()*20+Math.random()*20+Math.random()*20+Math.random()*20,18));
	
	// Here's where we change the randomly-generated information in order to fit the arguments of the Person() call
	
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
		
	console.log(issues);
	
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
	console.log(identityIssues);
	console.log(issues);
	
		
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
	var surnames = ethnicity.surnames.concat(common.surnames);
	var lastName = surnames[surnames.length * Math.random() << 0];
	
	
	// Network Connection Functions
	this.connections = [];
	if (resources.spouse > 0 || Math.random() > 0.5) {
		console.log('Add Spouse');
	}
	
	this.findJob = function(institution,level) {
		if (institution == undefined && level == undefined) {
			var jobSearchPower = (1+Math.max(0,this.resources.status))*(1+Math.max(0,this.resources.education))*(1+Math.max(0,this.resources.network));
			var openings = [];
			for (i in institutions) {
				for (l in {unskilled:"unskilled",skilled:"skilled",management:"management",executive:"executive"})
					if (institutions[i].employees[l].length < institutions[i].payroll[l] && institutions[i].paygrade[l] < jobSearchPower) {
						openings.push([institutions[i],l]);
						}
			}
			var opening = openings[openings.length * Math.random() << 0];
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
			console.log("ONLY level undefined; set level");
			level = "unskilled";
		};
		if (institution !== undefined) {
			this.connections.push([institution,"works at",level]);
			institution.employees[level].push(this);
			console.log(this.name.first + " " + this.name.last + "'s jobSeachPower of " + jobSearchPower + " pulled down a " + institution.paygrade[level] + " " + level + " job at " + institution.name);
		} else {
			console.log(this.name.first + " " + this.name.last + "'s jobSeachPower of " + jobSearchPower + " cannot find a job and is unemployed!");
		}
	};

	this.findHousing = function(institution,level) {
		if (institution == undefined) {
			var vacancies = [];
			for (i in housing) {
				if (housing[i].capacity > housing[i].clients.length && housing[i].rent < this.resources.money) {
					vacancies.push(housing[i])
				}
			}
			
			if (vacancies.length === 0) {
				institution = new Institution(undefined,"residential");
				institution.rent = this.resources.money;
				institution.status = Math.ceil(institution.status / 2 )
			} else {
				institution = vacancies[vacancies.length * Math.random() << 0];
			}
		}
		if (level == undefined) {	
			var level = ["squatter","renter","lessee","homeowner"][4 * Math.random() << 0];
		}
		this.connections.push([institution,"lives at",level]);
		institution.clients.push([this,level]);
	};
	
	// Needs to privilege churches with similar ethnicities, races, status, money
	this.findChurch = function(church,level) {
		if (church == undefined && this.faith.denomination !== "Athiest") {
			if (congregationsByFaith[this.faith.key] !== undefined && Math.random() > 0.1) {
				var churches = congregationsByFaith[this.faith.key];
				church = churches[churches.length * Math.random() << 0];
			} else if (congregationsBySect[this.faith.sect] !== undefined && Math.random() > 0.3) {
				var churches = congregationsBySect[this.faith.sect];
				church = churches[churches.length * Math.random() << 0];
			} else if (congregationsByReligion[this.faith.name] !== undefined && Math.random() > 0.5) {
				var churches = congregationsByReligion[this.faith.name];
				church = churches[churches.length * Math.random() << 0];
			} else {
				church = new Institution(undefined,"religious",this.faith);
			}
		} else if (this.faith.denomination == "Athiest") {
			church = undefined;
		};
		if (level == undefined) {	
			var level = ["friend","member","volunteer","officer"][Math.min(3,Math.max(0,this.resources.devotion))];
		}
		if (church !== undefined) {
			this.connections.push([church,"attends",level]);
			church.clients.push([this,level]);
		}
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
	
	var races = Object.keys(dataRaces);
	var residents = {};
	var total = 0;
	for (i in races) {
		residents[races[i]] = Math.random()*Math.random();
		total += residents[races[i]];
		}
		
	var name = dataNeighborhoodNames.first[dataNeighborhoodNames.first.length * Math.random() << 0] + dataNeighborhoodNames.last[dataNeighborhoodNames.last.length * Math.random() << 0];
	
	
	this.demographics = {};
	this.demographics.status = statusDemographics;
	this.demographics.money = moneyDemographics;
	this.demographics.race = residents;
	
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
		type = ["residential","commercial","industrial","municipal","greenspace","religious"][Math.random() * 6 << 0]
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
	
	// Paygrade
	var unskilled = 5 + Math.random() * 5 << 0;
	var skilled = Math.round(unskilled * (1 + Math.random()));
	var management = Math.round(skilled * (1 + Math.random()));
	var executive = Math.round(management * (1 + Math.random()));
	
	var typicalClientele = "Placeholder";
	var typicalEmployees = "Placeholder";
	
	if (type === "religious") {typicalClientele = faith.denomination + 's'};
	
	var activeUnions = [];

	this.name = name;
	this.type = type;
	this.status = status;
	this.rent = rent;
	this.capacity = capacity;
	this.payroll = {unskilled:unskilledCap,skilled:skilledCap,management:managementCap,executive:executiveCap};
	this.paygrade = {unskilled:unskilled,skilled:skilled,management:management,executive:executive};
	this.typicalClientele = typicalClientele;
	this.typicalEmployees = typicalEmployees;
	
	this.employees = {unskilled:[],skilled:[],management:[],executive:[]};
	this.clients = [];
	
	this.organizations = {};
	this.organizations.unions = activeUnions;
	
	this.neighborhood = neighborhood;
	
	neighborhood.institutions.push(this);
	
	institutions.push(this);
	
	if (type === "residential") {
		housing.push(this);
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
