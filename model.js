
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
	if (genderPublic == dataGenders.man) {
		var firstNames = ethnicity.masculineNames;
	} else if (genderPublic == dataGenders.woman) {
		var firstNames = ethnicity.feminineNames;
	} else {
		var firstNames = ethnicity.neutralNames;
	}
	var firstName = firstNames[firstNames.length * Math.random() << 0];
	var lastName = ethnicity.surnames[ethnicity.surnames.length * Math.random() << 0];
	
	if (Math.random() < 0.2) {
		genderIdentity = dataGenders[genders[genders.length * Math.random() << 0]];
		if (Math.random() < 0.5) {
		genderPublic = genderIdentity;
		}
	}
	
	var attraction = [];
	var attractions = Math.round(Math.random()*3)
	for (i = 0; i < attractions; i++) {
		attraction.push(dataGenders[genders[genders.length * Math.random() << 0]]);
		}
	
	var age = Math.round(Math.random()*82)+18;
	var backstories = [];
	
	for (i = 0; i < 3; i++) {
		backstories.push(backstoriesFamily[backstoriesFamily.length * Math.random() << 0]);
		}
		
	for (i = 0; i < 2; i++) {
		backstories.push(backstoriesYouth[backstoriesYouth.length * Math.random() << 0]);
		}
		
	for (i = 18; i < age; i += 10) {
		backstories.push(backstoriesMature[backstoriesMature.length * Math.random() << 0]);
		}
	
	var issues = [];
	var values = {
		care: Math.random() * 3 << 0,
		fairness: Math.random() * 3 << 0,
		liberty: Math.random() * 3 << 0,
		loyalty: Math.random() * 3 << 0,
		authority: Math.random() * 3 << 0,
		purity: Math.random() * 3 << 0,
		ambition: Math.random() * 3 << 0,
		}
	
	for (i in backstories) {
		for (n in backstories[i].values) {
			values[backstories[i].values[n]]++;
			}
		for (n in backstories[i].issues) {
			if (issues.indexOf(backstories[i].issues[n]) == -1) {
				issues.push(backstories[i].issues[n]);
				}
			}
	}
	
	this.name = {};

	this.home = block;
	
	this.race = race;
	this.ethnicity = ethnicity;
	
	this.gender = {};
	this.gender.assigned = genderAssigned;
	this.gender.identity = genderIdentity;
	this.gender.public = genderPublic;
	this.attraction = attraction;
	
	this.age = age;
	this.backstories = backstories;
	
	this.values = values;
	this.issues = issues;

	this.name.first = firstName;
	this.name.last = lastName;
	
	people.push(this);

}