var dataValues = [
	"care",
	"fairness",
	"liberty",
	"loyalty",
	"authority",
	"purity",
	"ambition",
	];

var descStatus = ["underclass","lower class","lower-middle class","upper-middle class","upper class","celebrity"];
var descMoney = ["poor","struggling","comfortable","well-off","wealthy","very wealthy"];
var descEducation = ["illiterate","high school diploma","BA","graduate degree","PhD","multiple PhDs"];
var descNetwork = ["outcast","weak","small","medium","connected","well-connected","power networker"];

function valuation(coreValue,secondaryValue,conditionalValue,condition,bool,key) {
	return function(person) {
		var issueStrength = person.values[coreValue] * 2 ;
		if (secondaryValue !== undefined) {
			issueStrength += person.values[secondaryValue];
		} else if ((person[condition].name === key) === bool) {
			issueStrength += person.values[conditionalValue];
		}
		return issueStrength;
	}
}

var dataIssues = {

	racialJustice: {
		name: "Racial Justice",
		value: valuation("fairness",undefined,"liberty","race",false,"White"),
		},
		
	whiteSupremacy: {
		name: "White Supremacy",
		value: valuation("authority",undefined,"loyalty","race",true,"White"),
		},
		
	genderEquity: {
		name: "Gender Equity",
		value: valuation("fairness",undefined,"liberty","gender",false,"Man"),
		},
		
	patriarchy: {
		name: "Patriarchy",
		value: valuation("authority",undefined,"loyalty","race",true,"Man"),
		},
		
	queerRights: {
		name: "Queer Rights",
		value: valuation("fairness",undefined,"liberty","orientation",true,"Queer"),
		},
		
	homophobia: {
		name: "Homophobia",
		value: valuation("purity",undefined,"authority","orientation",true,"Straight"),
		},
	
	religiousFreedom: {
		name: "Religious Freedom",
		value: valuation("liberty",undefined,"loyalty","faith",false,"Christian"),
		},
	
	stateReligion: {
		name: "State Religion",
		value: valuation("loyalty",undefined,"authority","faith",true,"Christian"),
		},
		
	localEconomy: {
		name: "Local Economy",
		value: valuation("ambition","loyalty"),
		},
		
	economicEquity: {
		name: "Economic Equity",
		value: valuation("care","fairness"),
		},
		
	schoolReform: {
		name: "School Reform",
		value: valuation("ambition","fairness"),
		},
		
	schoolPrivatization: {
		name: "School Privatization",
		value: valuation("liberty","ambition"),
		},
		
	electoralReform: {
		name: "Electoral Reform",
		value: valuation("liberty","fairness"),
		},
		
	voterSuppression: {
		name: "Voter Suppression",
		value: valuation("loyalty","authority"),
		},
		
	prisonReform: {
		name: "Prison Reform",
		value: valuation("care","purity"),
		},
		
	laissezFaire: {
		name: "Industrial Deregulation",
		value: valuation("ambition","liberty"),
		},
		
	environmentalism: {
		name: "Environmentalism",
		value: valuation("purity","fairness"),
		},
		
	healthcare: {
		name: "Healthcare",
		value: valuation("care","purity"),
		},
	
	immigrationReform: {
		name: "Immigration",
		value: valuation("liberty","care"),
		},
	
	immigrationRestriction: {
		name: "Immigration Restriction",
		value: valuation("loyalty","purity"),
		},
	
	myNeighborhood: {
		name: "My Neighborhood",
		value: valuation("loyalty","purity"),
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

var dataRaces = {

	firstNations: {
		name: "First Nations",
		key: "firstNations",
		issues: [dataIssues.racialJustice,dataIssues.healthcare,dataIssues.environmentalism],
		},

	white: {
		name: "White",
		key: "white",
		issues: [dataIssues.whiteSupremacy],
		},

	black: {
		name: "Black",
		key: "black",
		issues: [dataIssues.racialJustice],
		},

	asian: {
		name: "Asian",
		key: "asian",
		issues: [dataIssues.racialJustice],
		},

	middleEastern: {
		name: "Middle Eastern",
		key: "middleEastern",
		issues: [dataIssues.racialJustice],
		},

	latinx: {
		name: "Latinx",
		key: "latinx",
		issues: [dataIssues.racialJustice,dataIssues.immigrationReform],
		},

	};

var dataEthnicities = {
	
	english: {
		name: "English",
		masculineNames: ["George","Henry","Oliver","Harry","Jacob","Thomas","Oscar","James","William","Noah","Alfie","Joshua","Leo","Archie","Ethan","Joseph","Samuel","Logan","Daniel","Isaac","Benjamin","Lucas","Edward","Harrison"],
		feminineNames: ["Amelia","Olivia","Isla","Emily","Poppy","Ava","Isabella","Jessica","Lily","Sophie","Grace","Sophia","Mia","Eve","Ella","Scarlette","Chloe","Sienna","Freya","Phoebe","Charlotte","Daisy","Alice"],
		neutralNames: ["Jack","Charlie","Freddie","Alex","Max","Mason","Riley","Finley","Toby"],
		surnames: ["White","Jackson","Cooper"],
		assignedRace: dataRaces.white,
		majorityFaith: "anglican",
		},
	
	scots: {
		name: "Scots",
		masculineNames: ["Jack","James","Lewis","Oliver","Daniel","Logan","Alexander","Lucas","Harry","Mason","Ethan","Noah","Alfie","Harris","Thomas","Jacob","Adam","Leo","Aaron","Matthew","Nathan","Liam","Dylan","Kai","Archie","Callum"],
		feminineNames: ["Mary","Sophie","Olivia","Emily","Isla","Lucy","Ava","Jessica","Ella","Amelia","Millie","Lily","Chloe","Eva","Emma","Sophia","Ellie","Mia","Erin","Freya","Grace","Charlotte","Ellidh","Holly","Anna","Hannah"],
		neutralNames: ["Charlie","Riley","Finlay","Max","Cameron","Ryan","Jamie","Ruby"],
		surnames: ["Smith","Brown","Wilson","Campbell","Stewart","Thomson","Robertson","Anderson","Macdonald","Scott","Reid","Murray","Taylor","Clark","Ross","Watson","Morrison","Paterson","Young","Mitchell","Walker","Fraser","Miller","Gray","Henderson","Hamilton","McTavish","McGuinness","MacDougal"],
		assignedRace: dataRaces.white,
		majorityFaith: "romanCatholic",
		},
	
	italian: {
		name: "Italian",
		masculineNames: ["Ignacio","Antonio","Marco","Francesco","Matteo","Davide","Federico","Lorenzo","Stefano","Giuseppe","Riccardo","Christian","Alberto","Fabio","Emmanuele","Giovanni","Roberto","Filippo","Edoardo","Giorgio"],
		feminineNames: ["Maria","Beatrice","Giulia","Chiara","Sara","Martina","Francesca","Silvia","Elisa","Alice","Federica","Alessia","Laura","Elena","Giorgia","Valentina","Eleonora","Anna","Marta","Claudia","Ilaria","Sofia","Arianna","Irene"],
		neutralNames: ["Luca","Ferrari","Rome","Messina","Andrea","Daniele","Simone","Michelle","Nicola"],
		surnames: ["Rossi","Russo","Ferrari","Esposito","Bianchi","Romano","Caruso","Rizzo","Gallo","Greco","De Luca","Giordano","Lombardo","Leone","De Marco","Lombardi","Ferrarra","D'Amico","Vitale","Messina","Marino","Bruno"],
		assignedRace: dataRaces.white,
		majorityFaith: "romanCatholic",
		},
	
	africanAmerican: {
		name: "African American",
		masculineNames: ["Antoine","Andre","Prince","Tyrone","Darren","Deshawn","Jamal","Kareem","Malik","Deon","Jamar","Lashay","Lebron","Marquis","Rashaun","Tory","Tariq"],
		feminineNames: ["Tanya","Chantelle","Monique","Shaniqua","Iesha","Kalisha","Kenya","Keisha","Ladonna","Latasha","Shanice","Shelena","Tajuana","Talisha","Tisha"],
		neutralNames: ["Imani","Ivory","Jaylen","Lashawn"],
		surnames: ["Williams","Johnson","Smith","Jones","Brown","Jackson","Davis","Thomas","Harris","Robinson","Taylor","Wilson","Moore","White","Washington"],
		assignedRace: dataRaces.black,
		majorityFaith: "africanMethodist",
		},
	
	greek: {
		name: "Greek",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.white,
		majorityFaith: "greekOrthodox",
		},
	
	russian: {
		name: "Russian",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.white,
		majorityFaith: "russianOrthodox",
		},
	
	arab: {
		name: "Arab",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "sunniIslam",
		},
	
	iranian: {
		name: "Iranian",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "shiaIslam",
		},
	
	afghani: {
		name: "Afghani",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "sunniIslam",
		},
	
	pakistani: {
		name: "Pakistani",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "sunniIslam",
		},
	
	indonesian: {
		name: "Indonesian",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.asian,
		majorityFaith: "nondenominationalIslam",
		},
	
	mexican: {
		name: "Mexican",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.latinx,
		majorityFaith: "romanCatholic",
		},
	
	cuban: {
		name: "Cuban",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.latinx,
		majorityFaith: "romanCatholic",
		},
	
	puertoRican: {
		name: "Puerto Rican",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.latinx,
		majorityFaith: "romanCatholic",
		},
	
	cherokee: {
		name: "Cherokee",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		},
	
	navaho: {
		name: "Navaho",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		},
	
	choctaw: {
		name: "Choctaw",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		},
	
	lakotaSioux: {
		name: "Lakota Sioux",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		},
	
	wampanoag: {
		name: "Wampanoag",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: [],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		},
	
	ashkenazim: {
		name: "Ashkenazi Jew",
		masculineNames: ["Ansel","Berman","Hirschel","Hirsh","Lieb","Lieber","Zemel","Abraham","David","Zeke","Ezekiel","Gabriel","Israel","Moishe","Moses","Mordecai","Tobiah","Zusman"],
		feminineNames: ["Bluma","Golda","Shayna","Charna","Faigal","Freyde","Hannah","Judith","Miriam","Rachel","Yentl","Zelda"],
		neutralNames: [],
		surnames: ["Cohen","Kohn","Kahn","Kaplan","Levi","Levine","Levitt","Lewinsky","Aronson","Hirsh","Applebaum","Rosen","Mendelsohn","Abramson","Avromovitch","Manishewitz","Itskowitz","Berliner","Kessler","Gold","Gulden","Malkov","Perlman","Rivken","Soronsohn","Orbach","Bayer","Eisenberg","Epstein","Litwak","Oppenheimer","Shapiro"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "conservativeJudaism",
		},
	
	sephardim: {
		name: "Sephardic Jew",
		masculineNames: ["Abadian","Amadio","Astruc","Barcelay","Bechor","Bonastruc","Bueno","Calahadi","Galaf","Gento","Hualit","Jaco","Marcoch","Mevorach","Moshico","Solal","Zalema"],
		feminineNames: ["Amadh","Aster","Ayna","Basseva","Bechora","Bellida","Benvenuta","Bida","Blanqua","Bona","Bonastruga","Cadin","Ceti","Chera","Cima","Cleret","Dolcha","Duena","Ezter","Gaya","Jamilla","Mati","Mazaltov","Mima","Mira","Orovida","Poncella","Preciosa","Reina","Tita","Ventura","Yerussa"],
		neutralNames: ["Gentile","Mazal"],
		surnames: ["Ashkenazi","Abolofia","Abrevaya","Absaradel","Abulafia","Acher","Alalouf","Alazraki","Alcana","Alderoqui","Alfici","Algazi","Alhadeff","Alkana","Alvo","Amato","Angel","Anreader","Ardity","Arkless","Arnow","Arougheti","Avdalovo","Avzaradel","Azvaradel","Babani","Baigun","Balbach","Barbaimon","Bardavid","Barki","Barokas","Baron","Behar","Bejar","Benatar","Bendjuya","Benezra","Benhabib","Benoun","Benveniste","Benyacar","Berro","Bienn","Binoun","Beton","Buchuk","Cadranel","Cadrone","Calderon","Calvo","Camhi","Capelluto","Capeloto","Capelouto","Capeluto","Capilouto","Capuano","Caston","Cazes","Chalme","Chara","Chertkow","Codron","Coen","Cohen","Cordoba/Cordova","Crain","Curiel","Danon","Elias","Elkana","Eryol","Eskenazi","Esperanza","Fainstein","Farji","Fils","Franco","Galamidi","Galante/Galanti","Gateno","Genni","Girard","Glazer","Gluckman","Goldberg","Goldstein","Greenspan","Grife","Gross","Grossman","Guini","Habib","Hahn","Haki/Haky","Halfon","Hanan","Hart","Hasson","Hazan","Huerin","Huniu/Hunio","Israel","Jason","Jassen","Kaplan","Katz","Lanchano","Levi","Levin","Levy","Louza","Mainardis","Mandel","Marincik","Matorin","Maya","Mayesh","Meir","Menache","Mezistrano","Michaud","Mintzer","Miron","Mizrahi","Mosafir","Moscatel","Moscona","Munter","Musafir","Nahmias","Negrin","Nof","Notrica","Palombo","Peha","Piha","Pizante","Policar","Posner","Rackner","Ramsey","Rava","Russo","Salfati","Salmoni","Saul","Scapa","Shapiro","Shemaria","Solam","Soriano","Sourmany","Stern","Surmani","Tarica","Tastassa","Varon","Ventura","Yaffe","Yaras","Yohai","Zlotorynski"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "orthodoxJudaism",
		},
	
	mizrahim: {
		name: "Mizrahic Jew",
		masculineNames: ["Ibrahim","Haroun","Daoud","Moussa","Salman","Latif","Mansour","Ghareeb","Maimun","Said","Hassan","Hayek","Naggar","Sabban","Sannoua","Shenhav","Taeizi","Chorath"],
		feminineNames: ["Sara","Anat","Abigail","Beulah","Hina","Nihla","Astir","Laya","Maryam","Yahuda"],
		neutralNames: [],
		surnames: ["Al-Abrach","Abramchik","Abramtzik","Abocassis","Aborjil","Abotbol","Abramidou","Abu","Agmy","Ajami","Alpron","Amroon","Anijar","Atiya","Avitan","Avramidou","Banay","Barany","Barzani","Ben-abu","Bengio","Biton","Chriqui","Elharar","Fahima","Gozlan","Habibi","Hadad","Hagababa","Harush","Haziz","Hrusch","Hruschov","Russov","Hysh","Jamil","Kashny","Khalili","Khardun","Hardoon","Maimon","Maklof","Mofaz","Mograbi","Nazarian","Naqqash","Sabag","Sassoon","Shamy","Sharabani","Sheriki","Shirazy","Soliman","Soomekh","Yarkoni","Zangi","Zeitouni"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "reformJudaism",
		},
	
	};

var common = {

	masculineNames: ["James","John","Robert","Michael","William","David","Richard","Charles","Joseph","Thomas","Christopher","Daniel","Paul","Mark","Donald","George","Kenneth","Steven","Edward","Brian","Ronald","Anthony"],
	
	feminineNames: ["Mary","Patricia","Linda","Barbara","Elizabeth","Jennifer","Susan","Margaret","Dorothy","Lisa","Nancy","Karen","Betty","Helen","Sandra","Donna","Carol","Ruth","Sharon","Michelle","Laura","Sarah","Kimberly","Deborah","Jessica","Shirley"],
	
	neutralNames: ["Frank","Ryan","Terry","Sam","Alex","Bobby","Shaun","Chris","Dale","Ricky","Ronnie","Tommy","Avery","Charlie","Angel","Leslie","Adrien","Jamie","Jessie","Cody","Denver","Sydney","Madison","Kelly","Max","Casey"],

	surnames: ["Smith","Johnson","Miller","Brown","Jones","Williams","Davis","Anderson","Wilson","Martin","Taylor","Moore","Thompson","White","Clark","Thomas","Hall","Baker","Nelson","Allen","Young","Harris","King","Adams"],

	};

var dataFaiths = {

	atheist: {
			key: "atheist",
			denomination: "Atheist",
			sect: "Atheist",
			name: "Atheist",
			issues: [dataIssues.religiousFreedom],
			congregation: ["Discussion Group"],
		},

	anglican: {
			key: "anglican",
			denomination: "Anglican",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Anglican Church"],
		},

	baptist: {
			key: "baptist",
			denomination: "Baptist",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Baptist Church","Bible Church"],
		},

	lutheran: {
			key: "lutheran",
			denomination: "Lutheran",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Lutheran Church"],
		},

	methodist: {
			key: "methodist",
			denomination: "Methodist",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Methodist Church"],
		},

	nondenominationalChristian: {
			key: "nondenominationalChristian",
			denomination: "Non Denominational Christian",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Christian Church"],
		},
	
	unitedChurchChrist: {
			key: "unitedChurchChrist",
			denomination: "United Church of Christ",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.queerRights],
			congregation: ["UCC Church"],
		},

	africanMethodist: {
			key: "africanMethodist",
			denomination: "African Methodist",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia,dataIssues.voterSuppression,dataIssues.racialJustice,dataIssues.economicEquity],
			congregation: ["AME Church","African Methodist Church","African Methodist Episcopal Church"],
		},

	romanCatholic: {
			key: "romanCatholic",
			denomination: "Roman Catholic",
			sect: "Roman Catholic",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Catholic Church","Cathedral"],
		},

	greekOrthodox: {
			key: "greekOrthodox",
			denomination: "Greek Orthodox",
			sect: "Orthodox",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Greek Orthodox Church","Basilica"],
		},

	russianOrthodox: {
			key: "russianOrthodox",
			denomination: "Russian Orthodox",
			sect: "Orthodox",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Russian Orthodox Church","Basilica"],
		},
		
	bahai: {
			key: "bahai",
			denomination: "Baha'i",
			sect: "Baha'i",
			name: "Baha'i",
			issues: [dataIssues.religiousFreedom,dataIssues.homophobia],
			congregation: ["Baha'i Faith Center"],
		},
		
	orthodoxJudaism: {
			key: "orthodoxJudaism",
			denomination: "Orthodox Judaism",
			sect: "Judaism",
			name: "Judaism",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Synagogue","Shul","Temple"],
		},
		
	reformJudaism: {
			key: "reformJudaism",
			denomination: "Reform Judaism",
			sect: "Judaism",
			name: "Judaism",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Synagogue","Shul","Temple"],
		},
		
	conservativeJudaism: {
			key: "conservativeJudaism",
			denomination: "Conservative Judaism",
			sect: "Judaism",
			name: "Judaism",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Synagogue","Shul","Temple"],
		},
	
	sunniIslam: {
			key: "sunniIslam",
			denomination: "Sunni Muslim",
			sect: "Islam",
			name: "Islam",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Mosque","Islamic Center"],
		},
	
	shiaIslam: {
			key: "shiaIslam",
			denomination: "Shia Muslim",
			sect: "Islam",
			name: "Islam",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Mosque","Islamic Center"],
		},
	
	sufiIslam: {
			key: "sufiIslam",
			denomination: "Sufi",
			sect: "Islam",
			name: "Islam",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Mosque","Islamic Center"],
		},
	
	nondenominationalIslam: {
			key: "nondenominationalIslam",
			denomination: "Muslim",
			sect: "Islam",
			name: "Islam",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Mosque","Islamic Center"],
		},
	
	neopagan: {
			key: "neopagan",
			denomination: "Pagan",
			sect: "Neopagan",
			name: "Pagan",
			issues: [dataIssues.religiousFreedom,dataIssues.environmentalism],
			congregation: ["Circle","Coven"],
		},
	
	odinist: {
			key: "odinist",
			denomination: "Odinist",
			sect: "Norse Pagan",
			name: "Pagan",
			issues: [dataIssues.religiousFreedom,dataIssues.patriarchy,dataIssues.homophobia,dataIssues.whiteSupremacy,dataIssues.environmentalism],
			congregation: ["Fellowship"],
		},
	
	unitarianUniversalist: {
			key: "unitarianUniversalist",
			denomination: "Unitarian-Universalist",
			sect: "Unitarian-Universalist",
			name: "Unitarian-Universalist",
			issues: [dataIssues.religiousFreedom,dataIssues.economicEquity,dataIssues.queerRights,dataIssues.genderEquity,dataIssues.racialJustice],
			congregation: ["Unitarian-Universalists","Unitarian-Universalist Congregation","Unitarian-Universalist Community","Unitarian-Universalist Church","Community Church"],
		},

	};
	
var conversionConservative = [
		dataFaiths.lutheran,
		dataFaiths.baptist,
		dataFaiths.methodist,
		dataFaiths.romanCatholic,
		dataFaiths.sunniIslam,
		dataFaiths.odinist
	];

var conversionLiberal = [
		dataFaiths.unitedChurchChrist,
		dataFaiths.bahai,
		dataFaiths.reformJudaism,
		dataFaiths.sufiIslam,
		dataFaiths.neopagan,
		dataFaiths.unitarianUniversalist,
	]; 

var conversionNonChristian = [
		dataFaiths.bahai,
		dataFaiths.sunniIslam,
		dataFaiths.shiaIslam,
		dataFaiths.sufiIslam,
		dataFaiths.neopagan,
		dataFaiths.odinist,
		dataFaiths.unitarianUniversalist		
	]; 

var conversionLoss = [
		dataFaiths.atheist
	]; 

var dataBackstories = {

	singleMom: {
		name: "Raised by Single Mom",
		values: ["care","fairness"],
		issues: [dataIssues.genderEquity],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},

	singleDad: {
		name: "Raised by Single Dad",
		values: ["care","authority"],
		issues: [dataIssues.patriarchy],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},

	orphan: {
		name: "Orphaned",
		values: ["care","fairness"],
		issues: [dataIssues.economicEquity],
		resources: [],
		resourceLosses: ["money","money","network","status"],
		updateDemo: [],
		},

	religiousUpbringing: {
		name: "Religious Upbringing",
		values: ["purity","loyalty","authority"],
		issues: [dataIssues.patriarchy,dataIssues.homophobia,dataIssues.stateReligion],
		resources: ["network","devotion"],
		resourceLosses: [],
		updateDemo: ["faith",conversionConservative],
		},

	poorUpbringing: {
		name: "Raised in Poverty",
		values: ["care","ambition"],
		issues: [dataIssues.economicEquity,dataIssues.schoolReform],
		resources: [],
		resourceLosses: ["money"],
		updateDemo: [],
		},

	militaryBrat: {
		name: "Military Brat",
		values: ["authority","loyalty"],
		issues: [dataIssues.healthcare,dataIssues.homophobia,dataIssues.patriarchy],
		resources: ["tourOfDuty"],
		resourceLosses: [],
		updateDemo: [],
		},

	privilegedUpbringing: {
		name: "Raised in Privilege",
		values: ["liberty","loyalty"],
		issues: [dataIssues.whiteSupremacy,dataIssues.laissezFaire],
		resources: ["network","money","education","status"],
		resourceLosses: [],
		updateDemo: [],
		},

	familyOfColor: {
		name: "Family Members of Color",
		values: ["care","liberty"],
		issues: [dataIssues.racialJustice],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},

	disabledFamily: {
		name: "Disabled Family Member",
		values: ["care","fairness"],
		issues: [dataIssues.healthcare],
		resources: [],
		resourceLosses: ["money"],
		updateDemo: [],
		},

	queerFamily: {
		name: "Queer Family Member",
		values: ["care","liberty"],
		issues: [dataIssues.queerRights],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},
	
	foreignBorn: {
		name: "Foreign Born",
		values: [],
		issues: [dataIssues.immigrationReform],
		resources: ["immigrant"],
		resourceLosses: ["network"],
		updateDemo: [],
		},

	higherEducation: {
		name: "Higher Education",
		values: ["liberty","ambition","authority"],
		issues: [],
		resources: ["education","education","network","status"],
		resourceLosses: ["devotion"],
		updateDemo: [],
		},

	higherEducationLoans: {
		name: "Higher Education via Loans",
		values: ["liberty","ambition","authority"],
		issues: [],
		resources: ["education","education","network","status","debt","debt"],
		resourceLosses: [],
		updateDemo: [],
		},

	higherEducationDropOut: {
		name: "Higher Education Drop Out",
		values: ["liberty","ambition","authority"],
		issues: [dataIssues.economicEquity,dataIssues.schoolReform],
		resources: ["education","network","debt"],
		resourceLosses: [],
		updateDemo: [],
		},

	activism: {
		name: "Activism",
		values: ["fairness","loyalty"],
		issues: [],
		resources: ["network"],
		resourceLosses: [],
		updateDemo: [],
		},

	outdoors: {
		name: "Outdoors",
		values: ["purity","liberty"],
		issues: [dataIssues.environmentalism],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},

	friendsOfColor: {
		name: "Friends of Color",
		values: ["fairness","liberty"],
		issues: [dataIssues.racialJustice],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},

	queerFriend: {
		name: "Queer Friend",
		values: ["fairness","liberty"],
		issues: [dataIssues.queerRights],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},

	oldTimeReligion: {
		name: "Old Time Religion",
		values: ["purity","loyalty"],
		issues: [dataIssues.homophobia,dataIssues.patriarchy,dataIssues.stateReligion],
		resources: ["network","devotion","devotion"],
		resourceLosses: [],
		updateDemo: ["faith",conversionConservative],
		},
	
	nonChristianReligion: {
		name: "Non-Christian Religion",
		values: ["purity","loyalty"],
		issues: [dataIssues.homophobia,dataIssues.patriarchy,dataIssues.religiousFreedom],
		resources: ["network","devotion"],
		resourceLosses: [],
		updateDemo: ["faith",conversionNonChristian],
		},
	
	liberalReligion: {
		name: "Liberal Religion",
		values: ["purity","liberty"],
		issues: [dataIssues.religiousFreedom],
		resources: ["network","devotion"],
		resourceLosses: [],
		updateDemo: ["faith",conversionLiberal],
		},
		
	lossOfFaith: {
		name: "Crisis of Faith",
		values: ["liberty","care"],
		issues: [dataIssues.religiousFreedom],
		resources: [],
		resourceLosses: ["network","devotion"],
		updateDemo: ["faith",conversionLoss],
		},

	crime: {
		name: "Criminal Activity",
		values: ["liberty","ambition"],
		issues: [dataIssues.economicEquity,dataIssues.prisonReform],
		resources: ["network"],
		resourceLosses: [],
		updateDemo: [],
		},

	stableEmployment: {
		name: "Stable Employment",
		values: ["authority","loyalty"],
		issues: [dataIssues.localEconomy,dataIssues.laissezFaire],
		resources: ["money","money"],
		resourceLosses: [],
		updateDemo: [],
		},

	bigPromotion: {
		name: "Big Promotion",
		values: ["authority","loyalty"],
		issues: [dataIssues.localEconomy,dataIssues.laissezFaire],
		resources: ["money","money","status"],
		resourceLosses: ["debt"],
		updateDemo: [],
		},

	homemaker: {
		name: "Homemaker",
		values: ["care","purity"],
		issues: [],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},

	militaryService: {
		name: "Military Service",
		values: ["loyalty","authority"],
		issues: [dataIssues.patriarchy,dataIssues.homophobia,dataIssues.healthcare],
		resources: ["network","tourOfDuty"],
		resourceLosses: [],
		updateDemo: [],
		},

	unemployment: {
		name: "Unemployment",
		values: ["care","ambition"],
		issues: [dataIssues.economicEquity],
		resources: ["debt"],
		resourceLosses: ["money"],
		updateDemo: [],
		},

	homeless: {
		name: "Homelessness",
		values: ["care","liberty"],
		issues: [dataIssues.economicEquity,dataIssues.healthcare],
		resources: [],
		resourceLosses: ["status","network","money"],
		updateDemo: [],
		},

	imprisonment: {
		name: "Crime & Punishment",
		values: ["liberty","ambition"],
		issues: [dataIssues.prisonReform],
		resources: ["devotion"],
		resourceLosses: ["status","network"],
		updateDemo: [],
		},

	marriage: {
		name: "Marriage",
		values: ["loyalty","ambition"],
		issues: [],
		resources: ["money","network","spouse"],
		resourceLosses: [],
		updateDemo: [],
		},

	divorce: {
		name: "Messy Divorce",
		values: ["care","liberty"],
		issues: [],
		resources: [],
		resourceLosses: ["money","network","spouse"],
		updateDemo: [],
		},

	parenthood: {
		name: "Parenthood",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform],
		resources: ["child","money"],
		resourceLosses: [],
		updateDemo: [],
		},

	parentOfQueer: {
		name: "Parent of a Queer Kid",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform,dataIssues.queerRights],
		resources: ["child"],
		resourceLosses: ["network","money"],
		updateDemo: [],
		},

	parentOfDisabled: {
		name: "Parent of a Disabled Kid",
		values: ["care","fairness"],
		issues: [dataIssues.schoolReform,dataIssues.healthcare],
		resources: ["child"],
		resourceLosses: ["network","money"],
		updateDemo: [],
		},

	addiction: {
		name: "Addiction",
		values: ["care","purity"],
		issues: [dataIssues.healthcare],
		resources: [],
		resourceLosses: ["money"],
		updateDemo: [],
		},

	medicalHardship: {
		name: "Medical Hardship",
		values: ["care","fairness"],
		issues: [dataIssues.healthcare,dataIssues.economicEquity],
		resources: ["debt"],
		resourceLosses: [],
		updateDemo: [],
		},

	deathOfChild: {
		name: "Death of Child",
		values: ["care","fairness"],
		issues: [dataIssues.healthcare],
		resources: [],
		resourceLosses: ["child"],
		updateDemo: [],
		},

	obsolescence: {
		name: "Skills Obsolescence",
		values: ["fairness","ambition"],
		issues: [dataIssues.schoolReform,dataIssues.economicEquity],
		resources: [],
		resourceLosses: ["education"],
		updateDemo: [],
		},

	backToSchool: {
		name: "Back to School",
		values: ["fairness","ambition"],
		issues: [dataIssues.schoolReform,dataIssues.electoralReform],
		resources: ["education","network","debt"],
		resourceLosses: [],
		updateDemo: [],
		},

	comingOut: {
		name: "Came Out of the Closet",
		values: ["liberty","loyalty"],
		issues: [dataIssues.queerRights],
		resources: [],
		resourceLosses: ["closet","network","devotion"],
		updateDemo: [],
		},

	comingOutBad: {
		name: "Came Out, Kicked Out",
		values: ["liberty","loyalty"],
		issues: [dataIssues.queerRights,dataIssues.economicEquity],
		resources: [],
		resourceLosses: ["closet","network","devotion","money"],
		updateDemo: [],
		},

	transition: {
		name: "Gender Transition",
		values: ["liberty","loyalty"],
		issues: [dataIssues.queerRights],
		resources: [],
		resourceLosses: ["network","devotion"],
		updateDemo: ["gender"],
		},

	template: {
		name: "Template",
		values: ["one","two"],
		issues: [dataIssues.patriarchy],
		resources: [],
		resourceLosses: [],
		updateDemo: [],
		},

	};

var backstoriesFamily = [
		dataBackstories.singleMom,
		dataBackstories.singleDad,
		dataBackstories.orphan,
		dataBackstories.religiousUpbringing,
		dataBackstories.nonChristianReligion,
		dataBackstories.liberalReligion,
		dataBackstories.militaryBrat,
		dataBackstories.poorUpbringing,
		dataBackstories.privilegedUpbringing,
		dataBackstories.disabledFamily,
		dataBackstories.queerFamily,
		dataBackstories.familyOfColor
	];

var backstoriesYouth = [
		dataBackstories.higherEducation,
		dataBackstories.higherEducationLoans,
		dataBackstories.higherEducationDropOut,
		dataBackstories.activism,
		dataBackstories.outdoors,
		dataBackstories.friendsOfColor,
		dataBackstories.queerFriend,
		dataBackstories.oldTimeReligion,
		dataBackstories.nonChristianReligion,
		dataBackstories.liberalReligion,
		dataBackstories.crime,
		dataBackstories.lossOfFaith
	];

var backstoriesQueer = [
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
	];

var backstoriesTrans = [
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.transition,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.transition,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.transition,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.transition,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.transition,
		dataBackstories.comingOut,
		dataBackstories.comingOutBad,
		dataBackstories.transition,
	];

var backstoriesMature = [
		dataBackstories.stableEmployment,
		dataBackstories.bigPromotion,
		dataBackstories.homemaker,
		dataBackstories.militaryService,
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

var backstoriesMatureEducation = [
		dataBackstories.stableEmployment,
		dataBackstories.bigPromotion,
		dataBackstories.unemployment,
		dataBackstories.divorce,
		dataBackstories.nonChristianReligion,
		dataBackstories.liberalReligion,
		dataBackstories.outdoors,
		dataBackstories.backToSchool,
		dataBackstories.lossOfFaith,
		dataBackstories.obsolescence
	];


var backstoriesMatureStatus = [
		dataBackstories.stableEmployment,
		dataBackstories.bigPromotion,
		dataBackstories.marriage,
		dataBackstories.addiction
	];

var backstoriesMatureMoney = [
		dataBackstories.stableEmployment,
		dataBackstories.bigPromotion,
		dataBackstories.unemployment,
		dataBackstories.parenthood,
		dataBackstories.parentOfQueer,
		dataBackstories.parentOfDisabled,
		dataBackstories.addiction,
		dataBackstories.outdoors,
		dataBackstories.backToSchool
	];

var backstoriesMatureNetwork = [
		dataBackstories.stableEmployment,
		dataBackstories.bigPromotion,
		dataBackstories.marriage,
		dataBackstories.divorce,
		dataBackstories.addiction
	];

var backstoriesMatureChild = [
		dataBackstories.parentOfQueer,
		dataBackstories.parentOfDisabled,
		dataBackstories.medicalHardship,
		dataBackstories.deathOfChild,
	];

var backstoriesMatureTourOfDuty = [
		dataBackstories.militaryService,
		dataBackstories.militaryService,
		dataBackstories.militaryService,
		dataBackstories.militaryService,
		dataBackstories.medicalHardship
	];


var dataNeighborhoodNames = {
		first: [
			"White",
			"Green",
			"Gold",
			"Orange",
			"Red",
			"East",
			"West",
			"North",
			"South",
			"Shady",
			"Berry",
			"Oak",
			"River",
			"Upper",
			"Lower",
			"The",
			"Lily",
			"Rose",
			"College",
			"Deer",
			],
		last: [
			" Hills",
			" Hill",
			" Acres",
			" Glen",
			"town",
			" Side",
			" River",
			" Village",
			" Springs",
			" Park",
			" Gardens",
			"dale",
			" Estates",
			" Terrace",
			"ville",
			"port",
			" East",
			" West",
			" South",
			" North",
			" Side",
			" Ridge",
			" Gate",
			" Square",
			"land",
			" Manor",
			" Plantation",
			"wood",
			" Row",
			"side"
			],
	};

var dataInstitutionNames = {
	commercial: {
		first: [
			"Speedy",
			"Quality",
			"Economy",
			"Luxury",
			"Instant",
			"Quik"
			],
		product: [
			"Taco",
			"Sandwich",
			"Copy",
			"Accounting",
			"Oil Change",
			"Rooter"
			],
		last: [
			"Shop",
			"Stand",
			"Shack",
			"International",
			"Superstore",
			"Planet"
			],
	},
	industrial: {
		first: [
			"Speedy",
			"Quality",
			"Economy",
			"Luxury",
			"Instant",
			"Quik"
			],
		product: [
			"Automotive",
			"Building Materials",
			"Furniture",
			"Foods"
			],
		last: [
			"Manufacturing",
			"Limited",
			"Shop",
			"Exchange"
			],
	},
	residential: {
		first: [
			"Tranquil",
			"Shady",
			"Green",
			"Cozy"
			],
		product: [
			"Hills",
			"Grove",
			"Glen",
			"Dell",
			"Retreat",
			],
		last: [
			"Estates",
			"Apartments",
			"Condominiums",
			"Homes"
			],
	},
	municipal: {
		first: [
			"Regional",
			"Central",
			"Neighborhood",
			"City",
			"Municipal",
			],
		product: [
			"Community",
			"Motor Vehicle",
			"Motorpool",
			"Job Training",
			"Utiities",
			],
		last: [
			"Office",
			"Department",
			"Yard",
			"Center"
			],
	},
	greenspace: {
		first: [
			"Memorial",
			"Green",
			"Alabaster",
			"Jackson"
			],
		product: [
			"Oak",
			"River",
			"Grounds",
			"Sporting",
			"Recreational",
			],
		last: [
			"Park",
			"Field",
			"Trail",
			],
	},
	religious: {
		first: [
			"Mc"
			],
		product: [
			"Churchy",
			],
		last: [
			"Church",
			],
	},
};

var dataColors = [
	"red",
	"yellow",
	"lime",
	"aqua",
	"blue",
	"navy",
	"fuschia",
	"maroon",
	"olive",
	"green",
	"teal",
	"purple",
];