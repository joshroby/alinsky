
var people = [];

function Person(block) {

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
	

	var races = Object.keys(dataRaces);
	var race = dataRaces[races[races.length * Math.random() << 0]];

	var ethnicities = Object.keys(race.ethnicities);
	var ethnicity = race.ethnicities[ethnicities[ethnicities.length * Math.random() << 0]];
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
	
// 	if (Math.random() < 0.2) {
// 		genderIdentity = dataGenders[genders[genders.length * Math.random() << 0]];
// 		if (Math.random() < 0.5) {
// 		genderPublic = genderIdentity;
// 		}
// 	}
	
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
	var resources = {status:1,money:1,education:1,network:0,child:0};
	
	var age = Math.round(Math.random()*82)+18;
	var backstories = [];
	
	// Adding new Backstory Blocks Here
	for (i = 0; i < 3; i++) {
		backstories.push(backstoriesFamily[backstoriesFamily.length * Math.random() << 0]);
		}
		
	for (i = 0; i < 2; i++) {
		backstories.push(backstoriesYouth[backstoriesYouth.length * Math.random() << 0]);
		}
		
	for (i = 18; i < age; i += 10) {
		backstories.push(backstoriesMature[backstoriesMature.length * Math.random() << 0]);
		}
	
	// Processing Backstory Blocks' Effects Here
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
		}
		
		// Will need to incorporate the effects into the add code so that the add code can take the current totals of resources to determine what the next block should be
	
	this.name = {};

	this.home = block;
	
	this.race = race;
	this.ethnicity = ethnicity;
	
	this.gender = {};
	this.gender.assigned = genderAssigned;
	this.gender.identity = genderIdentity;
	this.gender.public = genderPublic;
	this.gender.attraction = attraction;
	this.gender.orientation = orientation;
	
	this.age = age;
	this.backstories = backstories;
	
	this.values = values;
	this.issues = issues;
	this.resources = resources;

	this.name.first = firstName;
	this.name.middle = middleName;
	this.name.last = lastName;
	
	people.push(this);

}