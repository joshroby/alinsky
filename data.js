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
		conditionalValue: ["race","is not","White","liberty"],
		},
		
	whiteSupremacy: {
		name: "White Supremacy",
		coreValue: "authority",
		conditionalValue: ["race","is","White","loyalty"]
		},
		
	genderEquity: {
		name: "Gender Equity",
		coreValue: "fairness",
		conditionalValue: ["gender","is not","Man","liberty"],
		},
		
	patriarchy: {
		name: "Patriarchy",
		coreValue: "authority",
		conditionalValue: ["race","is","Man","loyalty"],
		},
		
	queerRights: {
		name: "Queer Rights",
		coreValue: "fairness",
		conditionalValue: ["orientation","is","Queer","liberty"],
		},
		
	homophobia: {
		name: "Homophobia",
		coreValue: "purity",
		conditionalValue: ["orientation","is","Straight","authority"],
		},
	
	religiousFreedom: {
		name: "Religious Freedom",
		coreValue: "liberty",
		conditionalValue: ["religion","is not","Christian","loyalty"],
		},
	
	stateReligion: {
		name: "State Religion",
		coreValue: "loyalty",
		conditionalValue: ["religion","is","Christian","authority"],
		},
		
	localEconomy: {
		name: "Local Economy",
		coreValue: "ambition",
		},
		
	economicEquity: {
		name: "Economic Equity",
		coreValue: "care",
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
		masculineNames: ["George","Henry","Oliver","Harry","Jacob","Thomas","Oscar","James","William","Noah","Alfie","Joshua","Leo","Archie","Ethan","Joseph","Samuel","Logan","Daniel","Isaac","Benjamin","Lucas","Edward","Harrison"],
		feminineNames: ["Amelia","Olivia","Isla","Emily","Poppy","Ava","Isabella","Jessica","Lily","Sophie","Grace","Sophia","Mia","Eve","Ella","Scarlette","Chloe","Sienna","Freya","Phoebe","Charlotte","Daisy","Alice"],
		neutralNames: ["Jack","Charlie","Freddie","Alex","Max","Mason","Riley","Finley","Toby"],
		surnames: ["White","Jackson","Cooper"],
		},
	
	scots: {
		name: "Scots",
		masculineNames: ["Jack","James","Lewis","Oliver","Daniel","Logan","Alexander","Lucas","Harry","Mason","Ethan","Noah","Alfie","Harris","Thomas","Jacob","Adam","Leo","Aaron","Matthew","Nathan","Liam","Dylan","Kai","Archie","Callum"],
		feminineNames: ["Mary","Sophie","Olivia","Emily","Isla","Lucy","Ava","Jessica","Ella","Amelia","Millie","Lily","Chloe","Eva","Emma","Sophia","Ellie","Mia","Erin","Freya","Grace","Charlotte","Ellidh","Holly","Anna","Hannah"],
		neutralNames: ["Charlie","Riley","Finlay","Max","Cameron","Ryan","Jamie","Ruby"],
		surnames: ["Smith","Brown","Wilson","Campbell","Stewart","Thomson","Robertson","Anderson","Macdonald","Scott","Reid","Murray","Taylor","Clark","Ross","Watson","Morrison","Paterson","Young","Mitchell","Walker","Fraser","Miller","Gray","Henderson","Hamilton","McTavish","McGuinness","MacDougal"],
		},
	
	italian: {
		name: "Italian",
		masculineNames: ["Ignacio","Antonio","Marco","Francesco","Matteo","Davide","Federico","Lorenzo","Stefano","Giuseppe","Riccardo","Christian","Alberto","Fabio","Emmanuele","Giovanni","Roberto","Filippo","Edoardo","Giorgio"],
		feminineNames: ["Maria","Beatrice","Giulia","Chiara","Sara","Martina","Francesca","Silvia","Elisa","Alice","Federica","Alessia","Laura","Elena","Giorgia","Valentina","Eleonora","Anna","Marta","Claudia","Ilaria","Sofia","Arianna","Irene"],
		neutralNames: ["Luca","Ferrari","Rome","Messina","Andrea","Daniele","Simone","Michelle","Nicola"],
		surnames: ["Rossi","Russo","Ferrari","Esposito","Bianchi","Romano","Caruso","Rizzo","Gallo","Greco","De Luca","Giordano","Lombardo","Leone","De Marco","Lombardi","Ferrarra","D'Amico","Vitale","Messina","Marino","Bruno"],
		},
	
	africanAmerican: {
		name: "African American",
		masculineNames: ["Antoine","Andre","Prince","Tyrone","Darren","Deshawn","Jamal","Kareem","Malik","Deon","Jamar","Lashay","Lebron","Marquis","Rashaun","Tory","Tariq"],
		feminineNames: ["Tanya","Chantelle","Monique","Shaniqua","Iesha","Kalisha","Kenya","Keisha","Ladonna","Latasha","Shanice","Shelena","Tajuana","Talisha","Tisha"],
		neutralNames: ["Imani","Ivory","Jaylen","Lashawn"],
		surnames: ["Williams","Johnson","Smith","Jones","Brown","Jackson","Davis","Thomas","Harris","Robinson","Taylor","Wilson","Moore","White","Washington"],
		},
	
	};

var common = {

	masculineNames: ["James","John","Robert","Michael","William","David","Richard","Charles","Joseph","Thomas","Christopher","Daniel","Paul","Mark","Donald","George","Kenneth","Steven","Edward","Brian","Ronald","Anthony"],
	
	feminineNames: ["Mary","Patricia","Linda","Barbara","Elizabeth","Jennifer","Susan","Margaret","Dorothy","Lisa","Nancy","Karen","Betty","Helen","Sandra","Donna","Carol","Ruth","Sharon","Michelle","Laura","Sarah","Kimberly","Deborah","Jessica","Shirley"],
	
	neutralNames: ["Frank","Ryan","Terry","Sam","Alex","Bobby","Shaun","Chris","Dale","Ricky","Ronnie","Tommy","Avery","Charlie","Angel","Leslie","Adrien","Jamie","Jessie","Cody","Denver","Sydney","Madison","Kelly","Max","Casey"],

	surnames: ["Smith","Johnson","Miller","Brown","Jones","Williams","Davis","Anderson","Wilson","Martin","Taylor","Moore","Thompson","White","Clark","Thomas","Hall","Baker","Nelson","Allen","Young","Harris","King","Adams"],

	};

var dataRaces = {

	white: {
		name: "White",
		ethnicities: [dataEthnicities.english,dataEthnicities.scots,dataEthnicities.italian],
		issues: [dataIssues.whiteSupremacy],
		},

	black: {
		name: "Black",
		ethnicities: [dataEthnicities.africanAmerican],
		issues: [dataIssues.racialJustice],
		},

	};

var dataBackstories = {

	singleMom: {
		name: "Single Mom",
		values: ["care","fairness"],
		issues: [dataIssues.genderEquity],
		resources: [],
		resourceLosses: [],
		},

	singleDad: {
		name: "Single Dad",
		values: ["care","authority"],
		issues: [dataIssues.patriarchy],
		resources: [],
		resourceLosses: [],
		},

	religiousUpbringing: {
		name: "Religious Upbringing",
		values: ["purity","loyalty","authority"],
		issues: [dataIssues.patriarchy,dataIssues.homophobia,dataIssues.stateReligion],
		resources: ["network"],
		resourceLosses: [],
		},

	poorUpbringing: {
		name: "Raised in Poverty",
		values: ["care","ambition"],
		issues: [dataIssues.economicEquity,dataIssues.schoolReform],
		resources: [],
		resourceLosses: ["money"],
		},

	privilegedUpbringing: {
		name: "Raised in Privilege",
		values: ["liberty","loyalty"],
		issues: [dataIssues.whiteSupremacy,dataIssues.laissezFaire],
		resources: ["network","money","education","status"],
		resourceLosses: [],
		},

	familyOfColor: {
		name: "Family of Color",
		values: ["care","liberty"],
		issues: [dataIssues.racialJustice],
		resources: [],
		resourceLosses: [],
		},

	disabledFamily: {
		name: "Disabled Family Member",
		values: ["care","fairness"],
		issues: [dataIssues.healthcare],
		resources: [],
		resourceLosses: ["money"],
		},

	queerFamily: {
		name: "Queer Family Member",
		values: ["care","liberty"],
		issues: [dataIssues.queerRights],
		resources: [],
		resourceLosses: [],
		},
	
	foreignBorn: {
		name: "Foreign Born",
		values: [],
		issues: [dataIssues.immigration],
		resources: [],
		resourceLosses: ["network"],
		},

	higherEducation: {
		name: "Higher Education",
		values: ["liberty","ambition","authority"],
		issues: [],
		resources: ["education","education","network","status"],
		resourceLosses: [],
		},

	higherEducationLoans: {
		name: "Higher Education via Loans",
		values: ["liberty","ambition","authority"],
		issues: [],
		resources: ["education","education","network","status"],
		resourceLosses: ["money"],
		},

	activism: {
		name: "Activism",
		values: ["fairness","loyalty"],
		issues: [],
		resources: ["network"],
		resourceLosses: [],
		},

	outdoors: {
		name: "Outdoors",
		values: ["purity","liberty"],
		issues: [dataIssues.environmentalism],
		resources: [],
		resourceLosses: [],
		},

	friendsOfColor: {
		name: "Friends of Color",
		values: ["fairness","liberty"],
		issues: [dataIssues.racialJustice],
		resources: [],
		resourceLosses: [],
		},

	queerFriend: {
		name: "Queer Friend",
		values: ["fairness","liberty"],
		issues: [dataIssues.queerRights],
		resources: [],
		resourceLosses: [],
		},

	oldTimeReligion: {
		name: "Old Time Religion",
		values: ["purity","loyalty"],
		issues: [dataIssues.homophobia,dataIssues.patriarchy,dataIssues.stateReligion],
		resources: ["network"],
		resourceLosses: [],
		},
	
	nonChristianReligion: {
		name: "Non-Christian Religion",
		values: ["purity","loyalty"],
		issues: [dataIssues.homophobia,dataIssues.patriarchy,dataIssues.religiousFreedom],
		resources: ["network"],
		resourceLosses: [],
		},
	
	liberalReligion: {
		name: "Liberal Religion",
		values: ["purity","liberty"],
		issues: [dataIssues.religiousFreedom],
		resources: ["network"],
		resourceLosses: [],
		},
		
	lossOfFaith: {
		name: "Crisis of Faith",
		values: ["liberty","care"],
		issues: [dataIssues.religiousFreedom],
		resources: [],
		resourceLosses: ["network"],
		},

	crime: {
		name: "Criminal Activity",
		values: ["liberty","ambition"],
		issues: [dataIssues.economicEquity,dataIssues.prisonReform],
		resources: ["network"],
		resourceLosses: [],
		},

	comingOut: {
		name: "Coming Out of the Closet",
		values: ["liberty","loyalty"],
		issues: [dataIssues.queerRights],
		resources: [],
		resourceLosses: ["network"],
		},

	stableEmployment: {
		name: "Stable Employment",
		values: ["authority","loyalty"],
		issues: [dataIssues.localEconomy,dataIssues.laissezFaire],
		resources: ["money","money"],
		resourceLosses: [],
		},

	bigPromotion: {
		name: "Big Promotion",
		values: ["authority","loyalty"],
		issues: [dataIssues.localEconomy,dataIssues.laissezFaire],
		resources: ["money","money","status"],
		resourceLosses: [],
		},

	homemaker: {
		name: "Homemaker",
		values: ["care","purity"],
		issues: [],
		resources: [],
		resourceLosses: [],
		},

	unemployment: {
		name: "Unemployment",
		values: ["care","ambition"],
		issues: [dataIssues.economicEquity],
		resources: [],
		resourceLosses: ["money"],
		},

	homeless: {
		name: "Homelessness",
		values: ["care","liberty"],
		issues: [dataIssues.economicEquity,dataIssues.healthcare],
		resources: [],
		resourceLosses: ["status","network","money"],
		},

	imprisonment: {
		name: "Crime & Punishment",
		values: ["liberty","ambition"],
		issues: [dataIssues.prisonReform],
		resources: [],
		resourceLosses: ["status","network"],
		},

	marriage: {
		name: "Marriage",
		values: ["loyalty","ambition"],
		issues: [],
		resources: ["money","network"],
		resourceLosses: [],
		},

	divorce: {
		name: "Messy Divorce",
		values: ["care","liberty"],
		issues: [],
		resources: [],
		resourceLosses: ["money","network"],
		},

	parenthood: {
		name: "Parenthood",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform],
		resources: ["child","money"],
		resourceLosses: [],
		},

	parentOfQueer: {
		name: "Parent of a Queer Kid",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform,dataIssues.queerRights],
		resources: ["child"],
		resourceLosses: ["network","money"],
		},

	parentOfDisabled: {
		name: "Parent of a Disabled Kid",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform,dataIssues.healthcare],
		resources: ["child"],
		resourceLosses: ["network","money"],
		},

	addiction: {
		name: "Addiction",
		values: ["care","purity"],
		issues: [dataIssues.healthcare],
		resources: [],
		resourceLosses: ["money"],
		},

	medicalHardship: {
		name: "Medical Hardship",
		values: ["care","fairness"],
		issues: [dataIssues.healthcare,dataIssues.economicEquity],
		resources: [],
		resourceLosses: ["money"],
		},

	obsolescence: {
		name: "Skills Obsolescence",
		values: ["fairness","ambition"],
		issues: [dataIssues.schoolReform,dataIssues.economicEquity],
		resources: [],
		resourceLosses: ["education"],
		},

	backToSchool: {
		name: "Back to School",
		values: ["fairness","ambition"],
		issues: [dataIssues.schoolReform,dataIssues.electoralReform],
		resources: ["education","network"],
		resourceLosses: ["money"],
		},

	template: {
		name: "Template",
		values: ["one","two"],
		issues: [dataIssues.patriarchy],
		resources: [],
		resourceLosses: [],
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
		dataBackstories.disabledFamily,
		dataBackstories.queerFamily,
		dataBackstories.familyOfColor
	];

var backstoriesYouth = [
		dataBackstories.higherEducation,
		dataBackstories.higherEducationLoans,
		dataBackstories.activism,
		dataBackstories.outdoors,
		dataBackstories.friendsOfColor,
		dataBackstories.queerFriend,
		dataBackstories.oldTimeReligion,
		dataBackstories.nonChristianReligion,
		dataBackstories.liberalReligion,
		dataBackstories.crime,
		dataBackstories.comingOut,
		dataBackstories.lossOfFaith,
	];

var backstoriesMature = [
		dataBackstories.stableEmployment,
		dataBackstories.bigPromotion,
		dataBackstories.homemaker,
		dataBackstories.unemployment,
		dataBackstories.homeless,
		dataBackstories.imprisonment,
		dataBackstories.marriage,
		dataBackstories.divorce,
		dataBackstories.parenthood,
		dataBackstories.parentOfQueer,
		dataBackstories.parentOfDisabled,
		dataBackstories.addiction,
		dataBackstories.oldTimeReligion,
		dataBackstories.nonChristianReligion,
		dataBackstories.liberalReligion,
		dataBackstories.medicalHardship,
		dataBackstories.outdoors,
		dataBackstories.backToSchool,
		dataBackstories.lossOfFaith,
		dataBackstories.obsolescence,
	];