
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
	
	// Sticking stuff on the actual object for later reference now
	this.name = {};
	this.name.first = firstName;
	this.name.middle = middleName;
	this.name.last = lastName;
	
	this.home = block;
	
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
	

}

