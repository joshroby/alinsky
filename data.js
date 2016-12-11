var dataValues = [
	"care",
	"fairness",
	"liberty",
	"loyalty",
	"authority",
	"purity",
	"ambition",
	];

var dataIssues = {

	racialJustice: {
		name: "Racial Justice",
		coreValue: "fairness",
		conditionalValue: ["race","not white","liberty"],
		},
		
	whiteSupremacy: {
		name: "White Supremacy",
		coreValue: "authority",
		conditionalValue: ["race","white","ambition"]
		},
		
	genderEquity: {
		name: "Gender Equity",
		coreValue: "fairness",
		},
		
	patriarchy: {
		name: "Patriarchy",
		coreValue: "authority",
		},
		
	queerRights: {
		name: "Queer Rights",
		coreValue: "fairness",
		},
		
	homophobia: {
		name: "Homophobia",
		coreValue: "purity",
		},
	
	religiousFreedom: {
		name: "Religious Freedom",
		coreValue: "liberty",
		},
	
	stateReligion: {
		name: "State Religion",
		coreValue: "loyalty",
		},
		
	localEconomy: {
		name: "Local Economy",
		coreValue: "ambition",
		},
		
	schoolReform: {
		name: "School Reform",
		coreValue: "care",
		},
		
	electoralReform: {
		name: "Electoral Reform",
		coreValue: "liberty",
		},
		
	prisonReform: {
		name: "Prison Reform",
		coreValue: "care",
		},
		
	laissezFaire: {
		name: "Laissez-Faire Policy",
		coreValue: "ambition",
		},
		
	environmentalism: {
		name: "Environmentalism",
		coreValue: "purity",
		},
		
	healthcare: {
		name: "Healthcare",
		coreValue: "care",
		},
	
	immigration: {
		name: "Immigration",
		coreValue: "liberty",
		},

	};

var dataGenders = {

	man: {
		name: "Man",
		issues: [dataIssues.patriarchy],
		},

	woman: {
		name: "Woman",
		issues: [dataIssues.genderEquity],
		},

	genderqueer: {
		name: "Genderqueer",
		issues: [dataIssues.genderEquity,dataIssues.queerRights],
		},

	};

var dataEthnicities = {
	
	english: {
		name: "English",
		masculineNames: ["George","Henry"],
		feminineNames: ["Mary","Rebecca"],
		neutralNames: ["Sam","Alex"],
		surnames: ["White","Jackson","Cooper"],
		},
	
	scots: {
		name: "Scots",
		masculineNames: ["Patrick","Hamish"],
		feminineNames: ["Mary","Becky"],
		neutralNames: ["Sam","Alex"],
		surnames: ["McTavish","McGuinness","MacDougal"],
		},
	
	italian: {
		name: "Italian",
		masculineNames: ["Ignacio","Antonio"],
		feminineNames: ["Maria","Beatrice"],
		neutralNames: ["Sam","Alex"],
		surnames: ["Rossi","Russo","Ferrari","Esposito","Bianchi","Romano"],
		},
	
	black: {
		name: "Black",
		masculineNames: ["George","Prince"],
		feminineNames: ["Tanya","Khalessi"],
		neutralNames: ["Sam","Alex"],
		surnames: ["Black","Washington","Africa"],
		},
	
	};

var dataRaces = {

	white: {
		name: "White",
		ethnicities: [dataEthnicities.english,dataEthnicities.scots,dataEthnicities.italian],
		issues: [dataIssues.whiteSupremacy],
		},

	black: {
		name: "Black",
		ethnicities: [dataEthnicities.black],
		issues: [dataIssues.racialJustice],
		},

	};

var dataBackstories = {

	singleMom: {
		name: "Single Mom",
		values: ["care","fairness"],
		issues: [dataIssues.genderEquity],
		resources: [],
		},

	singleDad: {
		name: "Single Dad",
		values: ["care","authority"],
		issues: [dataIssues.patriarchy],
		resources: [],
		},

	religiousUpbringing: {
		name: "Religious Upbringing",
		values: ["purity","loyalty","authority"],
		issues: [dataIssues.patriarchy,dataIssues.homophobia,dataIssues.stateReligion],
		resources: [],
		},

	poorUpbringing: {
		name: "Raised in Poverty",
		values: ["care","ambition"],
		issues: [dataIssues.economicEquity,dataIssues.schoolReform],
		resources: [],
		},

	privilegedUpbringing: {
		name: "Raised in Privilege",
		values: ["liberty","loyalty"],
		issues: [dataIssues.whiteSupremacy,dataIssues.laissezFaire],
		resources: [],
		},

	familyOfColor: {
		name: "Family of Color",
		values: ["care","liberty"],
		issues: [dataIssues.racialJustice],
		resources: [],
		},

	disabledFamily: {
		name: "Disabled Family Member",
		values: ["care","fairness"],
		issues: [dataIssues.healthcare],
		resources: [],
		},

	queerFamily: {
		name: "Queer Family Member",
		values: ["care","liberty"],
		issues: [dataIssues.queerRights],
		resources: [],
		},
	
	foreignBorn: {
		name: "Foreign Born",
		values: [],
		issues: [dataIssues.immigration],
		resources: [],
		},

	higherEducation: {
		name: "Higher Education",
		values: ["liberty","ambition","authority"],
		issues: [],
		resources: [],
		},

	activism: {
		name: "Activism",
		values: ["fairness","loyalty"],
		issues: [dataIssues.random],
		resources: [],
		},

	outdoors: {
		name: "Outdoors",
		values: ["purity","liberty"],
		issues: [dataIssues.environmentalism],
		resources: [],
		},

	friendsOfColor: {
		name: "Friends of Color",
		values: ["fairness","liberty"],
		issues: [dataIssues.racialJustice],
		resources: [],
		},

	queerFriend: {
		name: "Queer Friend",
		values: ["fairness","liberty"],
		issues: [dataIssues.queerRights],
		resources: [],
		},

	oldTimeReligion: {
		name: "Old Time Religion",
		values: ["purity","loyalty"],
		issues: [dataIssues.homophobia,dataIssues.patriarchy,dataIssues.stateReligion],
		resources: [],
		},
	
	nonChristianReligion: {
		name: "Non-Christian Religion",
		values: ["purity","loyalty"],
		issues: [dataIssues.homophobia,dataIssues.patriarchy,dataIssues.religiousFreedom],
		resources: [],
		},
	
	liberalReligion: {
		name: "Liberal Religion",
		values: ["purity","liberty"],
		issues: [dataIssues.religiousFreedom],
		resources: [],
		},
		
	lossOfFaith: {
		name: "Crisis of Faith",
		values: ["liberty","care"],
		issues: [dataIssues.religiousFreedom],
		resources: [],
		},

	crime: {
		name: "Criminal Activity",
		values: ["liberty","ambition"],
		issues: [dataIssues.economicEquity,dataIssues.prisonReform],
		resources: [],
		},

	comingOut: {
		name: "Coming Out of the Closet",
		values: ["liberty","loyalty"],
		issues: [dataIssues.queerRights],
		resources: [],
		},

	stableEmployment: {
		name: "Stable Employment",
		values: ["authority","loyalty"],
		issues: [dataIssues.localEconomy,dataIssues.laissezFaire],
		resources: [],
		},

	homemaker: {
		name: "Homemaker",
		values: ["care","purity"],
		issues: [],
		resources: [],
		},

	unemployment: {
		name: "Unemployment",
		values: ["care","ambition"],
		issues: [dataIssues.economicEquity],
		resources: [],
		},

	homeless: {
		name: "Homelessness",
		values: ["care","liberty"],
		issues: [dataIssues.economicEquity,dataIssues.healthcare],
		resources: [],
		},

	imprisonment: {
		name: "Imprisonment",
		values: ["liberty","ambition"],
		issues: [dataIssues.prisonReform],
		resources: [],
		},

	parenthood: {
		name: "Parenthood",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform],
		resources: [],
		},

	parentOfQueer: {
		name: "Parent of a Queer Kid",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform,dataIssues.queerRights],
		resources: [],
		},

	parentOfDisabled: {
		name: "Parent of a Disabled Kid",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform,dataIssues.healthcare],
		resources: [],
		},

	addiction: {
		name: "Addiction",
		values: ["care","purity"],
		issues: [dataIssues.healthcare],
		resources: [],
		},

	medicalHardship: {
		name: "Medical Hardship",
		values: ["care","fairness"],
		issues: [dataIssues.healthcare,dataIssues.economicEquity],
		resources: [],
		},

	backToSchool: {
		name: "Back to School",
		values: ["fairness","ambition"],
		issues: [dataIssues.schoolReform,dataIssues.electoralReform],
		resources: [],
		},

	template: {
		name: "Template",
		values: ["one","two"],
		issues: [dataIssues.patriarchy],
		resources: [],
		},

	};

var backstoriesFamily = [
		dataBackstories.singleMom,
		dataBackstories.singleDad,
		dataBackstories.religiousUpbringing,
		dataBackstories.nonChristianReligion,
		dataBackstories.liberalReligion,
		dataBackstories.poorUpbringing,
		dataBackstories.privilegedUpbringing,
		dataBackstories.familyOfColor,
		dataBackstories.disabledFamily,
		dataBackstories.queerFamily
	];

var backstoriesYouth = [
		dataBackstories.higherEducation,
		dataBackstories.activism,
		dataBackstories.outdoors,
		dataBackstories.friendsOfColor,
		dataBackstories.queerFriend,
		dataBackstories.oldTimeReligion,
		dataBackstories.nonChristianReligion,
		dataBackstories.liberalReligion,
		dataBackstories.crime,
		dataBackstories.comingOut
	];

var backstoriesMature = [
		dataBackstories.stableEmployment,
		dataBackstories.homemaker,
		dataBackstories.unemployment,
		dataBackstories.homeless,
		dataBackstories.imprisonment,
		dataBackstories.parenthood,
		dataBackstories.parentOfQueer,
		dataBackstories.parentOfDisabled,
		dataBackstories.addiction,
		dataBackstories.oldTimeReligion,
		dataBackstories.nonChristianReligion,
		dataBackstories.liberalReligion,
		dataBackstories.medicalHardship,
		dataBackstories.outdoors,
		dataBackstories.backToSchool
	];