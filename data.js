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
var descPropertyValue = ["abyssmal","cheap","affordable","average","pricey","ludicrous"];
var descQuality = ["terrible","poor","fair","good","high","ritzy"];

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
		key: 'racialJustice',
		value: valuation("fairness",undefined,"liberty","race",false,"White"),
		},
		
	whiteSupremacy: {
		name: "White Supremacy",
		key: 'whiteSupremacy',
		value: valuation("authority",undefined,"loyalty","race",true,"White"),
		},
		
	genderEquity: {
		name: "Gender Equity",
		key: 'genderEquity',
		value: valuation("fairness",undefined,"liberty","gender",false,"Man"),
		},
		
	patriarchy: {
		name: "Patriarchy",
		key: 'patriarchy',
		value: valuation("authority",undefined,"loyalty","race",true,"Man"),
		},
		
	queerRights: {
		name: "Queer Rights",
		key: 'queerRights',
		value: valuation("fairness",undefined,"liberty","orientation",true,"Queer"),
		},
		
	homophobia: {
		name: "Homophobia",
		key: 'homophobia',
		value: valuation("purity",undefined,"authority","orientation",true,"Straight"),
		},
	
	religiousFreedom: {
		name: "Religious Freedom",
		key: 'religiousFreedom',
		value: valuation("liberty",undefined,"loyalty","faith",false,"Christian"),
		},
	
	stateReligion: {
		name: "State Religion",
		key: 'stateReligion',
		value: valuation("loyalty",undefined,"authority","faith",true,"Christian"),
		euphemisms: ['Religious Freedom'],
		},
		
	localEconomy: {
		name: "Local Economy",
		key: 'localEconomy',
		value: valuation("ambition","loyalty"),
		},
		
	economicEquity: {
		name: "Economic Equity",
		key: 'economicEquity',
		value: valuation("care","fairness"),
		},
		
	schoolReform: {
		name: "School Reform",
		key: 'schoolReform',
		value: valuation("ambition","fairness"),
		},
		
	schoolPrivatization: {
		name: "School Privatization",
		key: 'schoolPrivatization',
		value: valuation("liberty","ambition"),
		},
		
	electoralReform: {
		name: "Electoral Reform",
		key: 'electoralReform',
		value: valuation("liberty","fairness"),
		},
		
	voterSuppression: {
		name: "Voter Suppression",
		key: 'voterSuppression',
		value: valuation("loyalty","authority"),
		},
		
	prisonReform: {
		name: "Prison Reform",
		key: 'prisonReform',
		value: valuation("care","purity"),
		},
		
	laissezFaire: {
		name: "Industrial Deregulation",
		key: 'laissezFaire',
		value: valuation("ambition","liberty"),
		},
		
	environmentalism: {
		name: "Environmentalism",
		key: 'environmentalism',
		value: valuation("purity","fairness"),
		},
		
	healthcare: {
		name: "Healthcare",
		key: 'healthcare',
		value: valuation("care","purity"),
		},
	
	immigrationReform: {
		name: "Immigration Justice",
		key: 'immigrationReform',
		value: valuation("liberty","care"),
		},
	
	immigrationRestriction: {
		name: "Immigration Restriction",
		key: 'immigrationRestriction',
		value: valuation("loyalty","purity"),
		},
	
	myNeighborhood: {
		name: "My Neighborhood",
		key: 'myNeighborhood',
		value: valuation("loyalty","purity"),
		},
	
	playerReputation: {
		name: "Your Personal Reputation",
		key: "playerReputation",
		value: valuation("loyalty",undefined,"authority","faith",true,"Flying Spaghetti Monster"),
		},

	};

var dataGenders = {

	man: {
		name: "Man",
		plural: "Men",
		issues: [dataIssues.patriarchy],
		privilegeRanking: 0,
		},

	woman: {
		name: "Woman",
		plural: "Women",
		issues: [dataIssues.genderEquity],
		privilegeRanking: 1,
		},

	genderqueer: {
		name: "Genderqueer",
		plural: "Genderqueers",
		issues: [dataIssues.genderEquity,dataIssues.queerRights],
		privilegeRanking: 2,
		},

	};

var dataRaces = {

	firstNations: {
		name: "First Nations",
		key: "firstNations",
		issues: [dataIssues.racialJustice,dataIssues.healthcare,dataIssues.environmentalism],
		ethnicities: [],
		privilegeRanking: 3,
		},

	white: {
		name: "White",
		key: "white",
		issues: [dataIssues.whiteSupremacy],
		ethnicities: [],
		privilegeRanking: 0,
		},

	black: {
		name: "Black",
		key: "black",
		issues: [dataIssues.racialJustice],
		ethnicities: [],
		privilegeRanking: 5,
		},

	asian: {
		name: "Asian",
		key: "asian",
		issues: [dataIssues.racialJustice],
		ethnicities: [],
		privilegeRanking: 1,
		},

	middleEastern: {
		name: "Middle Eastern",
		key: "middleEastern",
		issues: [dataIssues.racialJustice],
		ethnicities: [],
		privilegeRanking: 2,
		},

	latinx: {
		name: "Latinx",
		key: "latinx",
		issues: [dataIssues.racialJustice,dataIssues.immigrationReform],
		ethnicities: [],
		privilegeRanking: 4,
		},

	multiracial: {
		name: "Multiracial",
		key: "multiracial",
		issues: [dataIssues.whiteSupremacy,dataIssues.racialJustice,dataIssues.immigrationReform],
		ethnicities: [],
		privilegeRanking: undefined,
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
		endogamy: 0.8,
		},
	
	scots: {
		name: "Scots",
		masculineNames: ["Jack","James","Lewis","Oliver","Daniel","Logan","Alexander","Lucas","Harry","Mason","Ethan","Noah","Alfie","Harris","Thomas","Jacob","Adam","Leo","Aaron","Matthew","Nathan","Liam","Dylan","Kai","Archie","Callum"],
		feminineNames: ["Mary","Sophie","Olivia","Emily","Isla","Lucy","Ava","Jessica","Ella","Amelia","Millie","Lily","Chloe","Eva","Emma","Sophia","Ellie","Mia","Erin","Freya","Grace","Charlotte","Ellidh","Holly","Anna","Hannah"],
		neutralNames: ["Charlie","Riley","Finlay","Max","Cameron","Ryan","Jamie","Ruby"],
		surnames: ["Smith","Brown","Wilson","Campbell","Stewart","Thomson","Robertson","Anderson","Macdonald","Scott","Reid","Murray","Taylor","Clark","Ross","Watson","Morrison","Paterson","Young","Mitchell","Walker","Fraser","Miller","Gray","Henderson","Hamilton","McTavish","McGuinness","MacDougal"],
		assignedRace: dataRaces.white,
		majorityFaith: "romanCatholic",
		endogamy: 0.8,
		},
	
	german: {
		name: "German",
		masculineNames: ["Ben","Louis","Paul","Lukas","Jonas","Leon","Fynn","Noah","Elias","Luka","Maximilian","Felix","Max","Henry","Moritz","Julian","Tim","Jakob","Emil","Philipp","Niklas"],
		feminineNames: ["Emma","Mia","Hanna","Sophia","Emilia","Anna","Lena","Lea","Emile","Marie","Lina","Leonie","Amelie","Sophie","Louisa","Johanna","Neele","Laura","Lilli","Lara"],
		neutralNames: [],
		surnames: ["Muller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Schulz","Hoffman","Schafer","Koch","Bauer","Richter","Klein","Wolf","Schroder","Neumann","Schwartz","Zimmerman"],
		assignedRace: dataRaces.white,
		majorityFaith: "lutheran",
		endogamy: 0.8,
		},
	
	french: {
		name: "French",
		masculineNames: ["Nathan","Lucas","Enzo","Leo","Louis","Hugo","Gabriel","Ethan","Mathis","Jules","Raphael","Arthur","Tom","Theo","Noah","Timeo","Matheo","Clement","Maxime","Yanis"],
		feminineNames: ["Emma","Lea","Chloe","Manon","Ines","Lola","Jade","Camille","Sarah","Louise","Zoe","Lilou","Lena","Maelys","Clara","Eva","Lina","Anais","Louna","Romane","Juliette"],
		neutralNames: [],
		surnames: ["Martin","Bernard","Dubois","Thomas","Robert","Richard","Petit","Durand","Leroy","Moreau","Simon","Laurent","Lefebvre","Michel","Garcia","David","Bertrand","Roux","Vincent","Fourier"],
		assignedRace: dataRaces.white,
		majorityFaith: "romanCatholic",
		endogamy: 0.8,
		},
	
	spanish: {
		name: "Spanish",
		masculineNames: ["Daniel","Alejandro","Pablo","Hugo","Alvaro","Adrian","David","Javier","Diego","Mario","Marcos","Sergio","Iker","Ivan","Manuel","Jorge","Aitor","Miguel","Carlos","Samuel"],
		feminineNames: ["Lucia","Paula","Maria","Daniela","Sara","Carla","Claudia","Sofia","Alba","Irene","Marta","Laura","Julia","Martina","Carmen","Adriana","Aitana","Elena","Ana","Noa"],
		neutralNames: [],
		surnames: ["Garcia","Fernandez","Gonzalez","Rodriguez","Lopez","Martinez","Sanchez","Perez","Martin","Gomez"],
		assignedRace: dataRaces.white,
		majorityFaith: "romanCatholic",
		endogamy: 0.8,
		},
	
	italian: {
		name: "Italian",
		masculineNames: ["Ignacio","Antonio","Marco","Francesco","Matteo","Davide","Federico","Lorenzo","Stefano","Giuseppe","Riccardo","Christian","Alberto","Fabio","Emmanuele","Giovanni","Roberto","Filippo","Edoardo","Giorgio"],
		feminineNames: ["Maria","Beatrice","Giulia","Chiara","Sara","Martina","Francesca","Silvia","Elisa","Alice","Federica","Alessia","Laura","Elena","Giorgia","Valentina","Eleonora","Anna","Marta","Claudia","Ilaria","Sofia","Arianna","Irene"],
		neutralNames: ["Luca","Ferrari","Rome","Messina","Andrea","Daniele","Simone","Michelle","Nicola"],
		surnames: ["Rossi","Russo","Ferrari","Esposito","Bianchi","Romano","Caruso","Rizzo","Gallo","Greco","De Luca","Giordano","Lombardo","Leone","De Marco","Lombardi","Ferrarra","D'Amico","Vitale","Messina","Marino","Bruno"],
		assignedRace: dataRaces.white,
		majorityFaith: "romanCatholic",
		endogamy: 0.8,
		},
	
	africanAmerican: {
		name: "African American",
		masculineNames: ["Antoine","Andre","Prince","Tyrone","Darren","Deshawn","Jamal","Kareem","Malik","Deon","Jamar","Lashay","Lebron","Marquis","Rashaun","Tory","Tariq"],
		feminineNames: ["Tanya","Chantelle","Monique","Shaniqua","Iesha","Kalisha","Kenya","Keisha","Ladonna","Latasha","Shanice","Shelena","Tajuana","Talisha","Tisha"],
		neutralNames: ["Imani","Ivory","Jaylen","Lashawn"],
		surnames: ["Williams","Johnson","Smith","Jones","Brown","Jackson","Davis","Thomas","Harris","Robinson","Taylor","Wilson","Moore","White","Washington"],
		assignedRace: dataRaces.black,
		majorityFaith: "africanMethodist",
		endogamy: 0.8,
		},
	
	greek: {
		name: "Greek",
		masculineNames: ["Georgios","Ioannis","Konstantinos","Dimitris","Nicholas","Panagiotis","Basil","Chrisos","Athanasios","Michael","Evangelos","Spiros","Anthony","Anastasios","Theodore","Andreas","Charalampos","Alexander","Emmanuel","Elias"],
		feminineNames: ["Maria","Eleni","Helen","Catherine","Vasiliki","Sofia","Angelica","Georgia","Anastasia","Evangeline","Demeter","Irene","Anna","Panagiota","Joanna","Constance","Despoina","Calliope","Alexandra","Dominique","Paraskevi"],
		neutralNames: [],
		surnames: ["Papadopoulos","Vlahos","Angelopolous","Noklaidis","Georgiou","Petridis","Athanasiadis","Dimitriadis","Papadakis","Panagiotopolous","Papantoniou","Antoniou"],
		assignedRace: dataRaces.white,
		majorityFaith: "greekOrthodox",
		endogamy: 0.8,
		},
	
	russian: {
		name: "Russian",
		masculineNames: ["Alexander","Anatoly","Andrei","Boris","Valentin","Vasily","Viktor","Vladimir","Garry","Georgy","David","Dmitry","Yegor","Ivan","Konstantin","Leonid","Makar","Mikhail","Nestor","Oleg","Peter","Pyotr","Robert","Roman","Semyon","Sergei","Stepan","Timur","Eduard","Erik","Yuri","Yakov"],
		feminineNames: ["Alexandra","Alina","Anastasiya","Vera","Valeriya","Veronika","Galina","Dina","Ekaterina","Eva","Zoya","Inga","Irina","Iskra","Klara","Klementina","Kristina","Lada","Lidiya","Margarita","Marta","Nina","Nika","Oksana","Olga","Polina","Renata","Sofia","Tatyana","Faina","Ulyana","Florentina","Emilia"],
		neutralNames: [],
		surnames: ["Smirnov","Ivanov","Kuznetsov","Popov","Sokolov","Lebedev","Kozlov","Novikov","Morozov","Petrov","Volkov","Solovyov","Vasilyev","Zaytsev","Pavlov","Golubev","Vinogradov","Bogdanov","Vorobyov"],
		assignedRace: dataRaces.white,
		majorityFaith: "russianOrthodox",
		endogamy: 0.8,
		},
	
	arab: {
		name: "Arab",
		masculineNames: ["Aaron","Abdullah","Aden","Ahmad","Amir","Antwan","Caleb","Hassan","Ibrahim","Ismael","Jamal","Kadyn","Kale","Kareem","Khalil","Makhi","Malik","Mohamed","Nash","Nasir","Omar","Rashad","Samir","Tariq","Yahir","Yusuf","Zaire"],
		feminineNames: ["Aisha","Aleah","Alma","Amani","Amina","Callie","Fatima","Hana","Imani","Jaliyah","Jenna","Jasmin","Kayla","Leyla","Lily","Maritza","Mina","Salma","Samira","Skye","Yesenia"],
		neutralNames: [],
		surnames: ["Abdullah","Abdulrashid","Ahmad","Ahmed","Ajam","Alfarsi","Ali","Amjad","Boulos","Bousaid","Darzi","El-Amin","El-Ghazzawy","El-Hashem","El-Mofty","Hakim","Hussain","Kader","Karim","Karimi","Mohammed","Nagi","Nejem","Saab","Samara","Saqqaf","Sultan","Tawfeek","Zaman"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "sunniIslam",
		endogamy: 0.8,
		},
	
	iranian: {
		name: "Iranian",
		masculineNames: ["Abbas","Ashkan","Amir","Arman","Arvin","Bijan","Babak","Ebrahim","Ehsan","Eskander","Farhad","Farshid","Garshasp","Giv","Jamshid","Kamran","Kasra","Kouroush","Mahmoud","Musa","Marzban","Omid","Papak","Payam","Pouria","Ramin","Rostam","Sadegh","Turan","Vahid","Xerxes","Xosrov","Zand","Yousef"],
		feminineNames: ["Anahita","Anousheh","Arian","Astar","Banu","Bita","Donya","Frida","Farzaneh","Goli","Jaleh","Leila","Mahshid","Nasrin","Niloufar","Parvin","Reyham","Sara","Simin","Sahar","Tara","Yasmin","Zaynab"],
		neutralNames: [],
		surnames: ["Abdullahi","Abedini","Ahadi","Ahmadi","Baraghani","Ebrahimi","Esfahani","Fanaei","Farahani","Fikri","Ghasemi","Ghorbani","Hamadani","Hamidi","Banu Hashim","Hijazi","Husseini","Ipekci","Jahanbani","Jalili","Jamshidi","Javadi","Kadivar","Karimi","Kazmi","Khadem","Kalaji","Khorsandi","Mahdavi","Mahmoudi","Majidi","Mirzaei","Mokri","Nabavi","Naceri","Nafisi","Nalci","Namazi","Pahlavi","Pashaei","Qazwini","Rahmani","Rashidi","Salehi","Semnani","Shahidi","Shojaei","Souroush","Tabatabaei","Tousi","Talebi","Yazdani","Yadi","Yousefi","Zadeh","Zandi"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "shiaIslam",
		endogamy: 0.8,
		},
	
	afghani: {
		name: "Afghani",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: ["Afghan","Karzai","Nuristani","Poya","Sherkhanzai","Sattari","Shahnawaz","Yasin","Yousafzai","Yusufzai"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "sunniIslam",
		endogamy: 0.8,
		},
	
	pakistani: {
		name: "Pakistani",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: ["Davi","Khakwani","Kashani","Jadgal","Hashmi","Bhatti","Kuchis","Dogar","Kirmani","Kichlu","Gill","Dar","Megal","Khushk","Chachar","Butt","Sasooli","Malik","Zardari","Lau","Shah"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "sunniIslam",
		endogamy: 0.8,
		},
	
	indonesian: {
		name: "Indonesian",
		masculineNames: ["Kevin","Arief","Ahmad","Farel","Angga","Henry","Stanley","Fadhlan","Arif","David","Rio","Dimas","Andy","Osbert","Adit","Bayu","Adi","Fauzi"],
		feminineNames: ["Putri","Irene","Intan","Aulia","Annisa","Maria","Nurul","Farah","Dewi","Syifa","Bella","Gita","Dian","Hana","Dina","Nadaya","Ayu","Amalia","Nabila"],
		neutralNames: [],
		surnames: ["Ackbar","Bayu","Budiarto","Hidayat","Idrial","Iskander","Lie","Liem","Limpele","Mainaky","Pranata","Rafflesia","Sekewael","Setiawan","Sim","Sin","Vietnan","Widianto","Widjaja","Windu","Wiranata"],
		assignedRace: dataRaces.asian,
		majorityFaith: "nondenominationalIslam",
		endogamy: 0.8,
		},
	
	hanChinese: {
		name: "Han Chinese",
		masculineNames: ["Wei","Qiang","Jun","Yong","Tao","Ming","Chao","Jie","Ping"],
		feminineNames: ["Fang","Xiu Ying","Na","Min","Jing","Liu","Yan","Xiu Lan","Xia"],
		neutralNames: [],
		surnames: ["Chen","Guan","He","Huang","Jian","Jin","Lin","Wang","Wu","Zu","Zhang","Zhao"],
		assignedRace: dataRaces.asian,
		majorityFaith: "buddhism",
		endogamy: 0.8,
		},
	
	japanese: {
		name: "Japanese",
		masculineNames: ["Haruto","Riku","Haru","Hinata","Kaito","Asahi","Sora","Reo","Yuuto","Toumo","Itsuki"],
		feminineNames: ["Hana","Himari","Akari","Ichika","Sara","Yui","Aoi","Niko","Hinata","Kanna","Sana"],
		neutralNames: [],
		surnames: ["Akiyama","Fujimoto","Fujita","Hamasaki","Honda","Ikeda","Inoue","Ishikawa","Ito","Kato","Kawaguchi","Kimura","Kobayashi","Maki","Matsushita","Miyamoto","Mori","Moto","Nakajima","Oshiro","Sato","Takahashi","Ueda","Watanabe"],
		assignedRace: dataRaces.asian,
		majorityFaith: "shinto",
		endogamy: 0.8,
		},
	
	punjabi: {
		name: "Punjabi",
		masculineNames: [],
		feminineNames: [],
		neutralNames: ["Agamdeep","Agampreet","Ajinder","Aman","Amandeep","Amanjeet","Amanpreet","Amardeep","Amrinder","Anupreet","Atamveer","Balbir","Baldev","Baljeet","Balvinder","Balwant","Barindra","Bhagwant","Bhupinder","Birindar","Bishanpal","Brijender","Charandeep","Charanjeet","Dalbir","Daljeet","Deepinder","Devendar","Dharampal","Dharamveer","Dharmender","Dilawar","Dilshad","Gunbir","Gurbachan","Gurbaksh","Gurcharan","Gurdas","Gurdeep","Gurinder","Gurjeet","Gurjinder","Gurmeet","Gurnam","Gurpal","Gurpreet","Gursharan","Gurubachan","Gurucharan","Gurudas","Gurudeep","Gurusharan","Gurvinder","Happy","Harbhajan","Harbinder","Harendra","Haricharan","Harjeet","Harjeevan","Harjinder","Harjyot","Harmeet","Harnam","Harpreet","Himmat","Inderdeep","Inderjeet","Indirjot","Jagjeet","Jagmohan","Jasbir","Jasdeep","Jaspal","Jaspinder","Jasvinder","Joginder","Kanwaljeet","Kartar","Khushwant","Kirpal","Kuldeep","Kuljeet","Kulwant","Kulwinder","Lakhbir","Lali","Lucky","Maan","Madanapal","Manajith","Mandeep","Mandira","Maninder","Manipal","Manjeet","Manmeet","Manmohan","Manpreet","Mohinder","Nampreet","Nanaki","Narinder","Navbir","Navjot","Pardeep","Parmeet","Parminder","Prakash","Praneeta","Preet","Prem","Raghubir","Rajbir","Rajender","Rajveer","Rajvinder","Ranbir","Ranjit","Ranveer","Rasbir","Roopindar","Sachdev","Santa","Sarabjeet","Satnam","Satpal","Satpreet","Satvinder","Shamsher","Sukhbir","Sukhcharan","Sukhdev","Sukhinder","Sukhjot","Sukhpreet","Sukhwinder","Sundar","Surinder","Surjit","Talwinder","Tanveer","Tegbir","Tejinder","Tufan","Uddam","Veerindar","Viraj","Yashpal","Zorawar"],
		surnames: ["Abusaria","Achara","Agah","Agre","Ahuja","Ahlawat","Ajmeria","Anaadi","Andhak","Antal","Arneja","Asiagh","Atri","Atwal","Aujla","Aulakh","Babal","Babbar","Bachhal","Badesha","Badyal","Bagri","Bahia","Baht","Baidwan","Bains","Bajwa","Bajya","Balhara","Balyan","Bamraulia","Bana","Bansi","Bargoti","Barjati","Barola","Basanti","Basra","Basram","Basran","Bassi","Baswan","Batar","Beniwal","Benning","Bhadare","Bhadiar","Bhadu","Bhalli","Bhalothia","Bhambu","Bhandal","Bhangu","Bharak","Bharhaich","Bhari","Bhattal","Bhatti","Baweja","Bhela","Bhichar","Bhind","Bhinder","Bhudraja","Bhukar","Bhullar","Bijarniya","Billing","Binar","Birl","Birk","Bogan/Boughan","Brar","Braich","Budania","Budhwar","Burdak","Buttar","Baryar","Chadhar","Chahal","Chahar","Chaitha","Chakkal","Chandel","Chatha","Chhapyian","Chauhan","Cheema","Chhina","Chikkara","Chhillar","Chilka","Chheena","Dabas","Dabra","Dagur","Dahiya","Dalal","Dandiwal","Datewas","Dhamija","Dangi","Deo","Deol","Deshwal","Dhadli","Dhaka","Dhaliwal","Dhama","Dhankhar","Dhanoa","Dharan","Dharni","Dhariwal","Dhatarwal","Dhatt","Dhaulya","Dhaurelia","Dheendsa","Dhesi","Dhir","Dhull","Dhillon","Dhindawal","Dhindsa","Dholia","Dhonchak","Dhoot","Dookya","Dosanjh","Dudi","Duhan","Duhoon","Dullar","Fageria","Fandan","Farswal","Faugat","Faujdar","Gagneja","Gahlot","Gaina","Gakhal","Gandas","Gandhar","Garcha","Garewal","Garhwal","Gauria","Gehlawat","Ghangas","Ghatwala","Ghumman","Ghick","Ghugh","Gill","Godara","Gora","goraya","Gosal","Goyat","Grewal","Gulri","Gulia","Guram","Gurm","Harl","Hala","Hanga","Hans","Hayer","Heer","Hooda","Hundal","Inania","Jassi","Jaswal","Jaglan","Jagpal","Jajra","Jakhar","Jandu","Janu","Janghu","Janjua","Janmeja","Jatasra","Jatrana","Jatri","Jauhal","Jawanda","Jethoo","Jewlia","Jhaal","Jhaj","Jhajharia","Jhammat","Jhinjar","Jhuj","Jhutti","Johal","Johiya","Joon","Kalan","Kadian","Kahlon","Kajala","Kak","Kakar","Kakran","Kaler","Kalirai","Kalirouna","Kalkat","Kalkhande","Kalwaniya","Kandhola","Kang","Kapoor","Karwasra","Kaswan","Kataria","Katewa","Kehal","Khainwar","Khaira","Khakh","Khakha","Khalia","Khangura","Kharb","Kharoud","Khatkar","Kherwa","Khichad","Khirwar","Khinger","Khokhar","Khoja","Khosa","Khoye","Maurya","Khullar","Kisana","Kooner","Kuhar","Kular","Kularia","Kulhari","Kuntal","Lakhan","Lakhlan","Lakra","Lalli","Lally","Langrial","Lather","Lathwal","Lehga","Lengha","Liddar","Lidder","Lochab","Lund","Maan","Manda","Mandel","Madrak","Mahal","Mahil","Mahawal","Maichu","Malik","Malhan","Mander","Mandeer","Mandhan","Mandiwal","Manes","Mangat","Mann","Mede","Mehria","Merwar","Meel","Mohar","Mohil","Monga","Moond","Moonga","Motsara","Mundi","Mungut","Naga","Nagauria","Nagra","Nahl","Nain","Nandal","Nantaal","Natt","Nauhwar","Nehra","Nijjar","Nirman","Nirwan","Nichal","Nischal","Nitharwal","Noon","Ohlan","Ola","Othi","Pachar","Pachehra","Padda","Paliwal","Palsania","Panaich","Panag","Pandher","Panghal","Pangli","Pannu","Pansota","Panwar","Parihar","Parhaar","Parmaar","Pawar","Phalaswal","Phogat","Pilania","Pooni","Poria","Potaysir","Punia","Punial","Punian","Purewal","Purwar","Rahar","Rai","Rajaura","Rajawat","Rajian","Rakkar","Rana","Randhawa","Ranjha","Ranu","Ranwa","Rasoda","Rataul","Rathi","Rawala","Redhu","Rehal","Repswal","Rhind-Tutt","Riar","Romana","Rulania","Rupal","Sabharwal","Sahni","Saharan","Sahota","Saini","Samra","Sandhar","Sandhu","Sangha","Sanghera","Sangwan","Sangra","Sansanwal","Saprai","Sapra","Sarai","Sarao","Sauvira","Saroha","Seen","Sehrawat","Sehwag","Sejwal","Sekhon","Seokhand","Seoran","Shahi","Sahi","Shergill","Smith","Shokeen","Shokhanda","Sial","Sidhu","Sigroha","Sihota","Sikarwar","Sinsinwar","Sirohi","Sivia","Siwach","Soban","Sohal","Sohi","Solanki","Sooch","Sra","Sran","Suhag","Sukhija","Sumal","Sunda","Sunner","Takhar","Takshak","Talwarn","Tanwar","Tarar","Tatla","Tatran","Teerwal","Tevatia","Thakral","Thakran","Thandi","Tharoda","Thathiala","Thenua","Thethi","Thind","Thori","Tiwana","Tokas","Tomar","Toor","Toot","Tott","Tuar","Tung","Tushir","Tutt","Udar","Ujjwal","Uppal","Ver","Vaince","Vanar","Vijayrania","Virk","Wahla","Wainse","Wander","Waraich","Warraich"],
		assignedRace: dataRaces.asian,
		majorityFaith: "sunniIslam",
		endogamy: 0.8,
		},
	
	dravidian: {
		name: "Dravidian",
		masculineNames: ["Aachman","Adhita","Agrata","Ajay","Amalendu","Bagyaraj","Bahumanya","Bahula","Balamurali","Bhasvan","Chanakya","Cheliyan","Daarshik","Daha","Damian","Deepankar","Eeshan","Gahan","Hariaksa","Idhayan","Jainarayan","Kailas","Maaksharth","Nadish","Paawan","Pushpakar","Saakar","Tahaan","Taarush","Yadnya"],
		feminineNames: ["Aadya","Aarini","Abhaya","Akriti","Anandani","Asha","Babita","Bahulprema","Bairavi","Bandita","Bhupali","Chaarvi","Chakrika","Daivi","Dalaja","Eesha","Faloni","Gamini","Haasita","Hamsanaari","Josya","Raagavi","Saarika","Veena"],
		neutralNames: [],
		surnames: ["Arige","Balija","Cavarai","Chetty","Gentoo","Elamkunnapuzha","Kapu","Korrapati","Konda","Nair","Odda","Oddai","Oddar","Oppara","Padaiyachi","Palla","Pamireddy","Ramanathan","Sunil","Uppara","Valeti","Wappara","Wodda"],
		assignedRace: dataRaces.asian,
		majorityFaith: "hinduism",
		endogamy: 0.8,
		},
	
	mexican: {
		name: "Mexican",
		masculineNames: ["Jose","Luis","Juan","Miguel","Francisco","Jesus","Antonio","Alejandro","Pedro","Carlos","Manuel","Ricardo","Daniel","Fernando","Jorge"],
		feminineNames: ["Maria","Maria","Maria","Maria","Maria","Juana","Margarita","Alejandra","Elizabeth","Leticia","Gabriela","Patricia","Josefina","Rosa","Alicia"],
		neutralNames: ["Angel"],
		surnames: ["Garcia","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Perez","Sanchez","Ramirez","Torres","Flores","Rivera","Gomez","Diaz","Reyes","Morales","Cruz","Ortiz","Gutierrez","Chavez","Ramos","Gonzalez","Ruiz","Alvarez","Mendoza","Vasquez","Castilo","Jimenez"],
		assignedRace: dataRaces.latinx,
		majorityFaith: "romanCatholic",
		endogamy: 0.8,
		},
	
	cuban: {
		name: "Cuban",
		masculineNames: ["Anton","Bembe","Che","Emeterio","Eterio","Gimoaldo","Homero","Ireneo","Kosmo","Learco","Mendo","Montez","Neo","Paz","Pirro","Quito","Riel","Silverio","Tajo"],
		feminineNames: ["Agathe","Aleja","Benita","Charo","Diega","Edelira","Gertrudes","Hermosa","Idurre","Itxaro","Juanete","Landa","Lur","Mariposa","Mirana","Novia","Ramira","Samara","Verita"],
		neutralNames: [],
		surnames: ["Garcia","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Perez","Sanchez","Ramirez","Torres","Flores","Rivera","Gomez","Diaz","Reyes","Morales","Cruz","Ortiz","Gutierrez","Chavez","Ramos","Gonzalez","Ruiz","Alvarez","Mendoza","Vasquez","Castilo","Jimenez"],
		assignedRace: dataRaces.latinx,
		majorityFaith: "romanCatholic",
		endogamy: 0.8,
		},
	
	puertoRican: {
		name: "Puerto Rican",
		masculineNames: [],
		feminineNames: [],
		neutralNames: [],
		surnames: ["Acosta","Agustin","Albino","Alicea","Almodovar","Alvarez","Arroyo","Ayala","Báez","Bermúdez","Bonilla","Busigo","Camacho","Casiano","Castro","Colon","Correa","Cortes","Cruz","Cumel","Davila","Feliciano","Fernández","Ferrer","Figueroa","Galarza","González","Irizarry","Lamboi","Lebron","Lopez","Lugo","Madera","Malave","Martin","Martinez","Mercado","Millán","Miranda","Molina","Montalvo","Morales","Nazario","Negron","Ocasio","Ortiz","OrtizdelaRenta","Pacheco","Padilla","Pagán","Perez","Ramos","Ramirez","Rios","Rivera","Rodriguez","Rosa","Ruiz","Sáez","Salcedo","Sánchez","Santana","Santiago","Silva","Soltero","Soto","Tirado","Toro","Torres","Valle","Vargas","Vázquez","Vega","Villarinos","Zaragoza"],
		assignedRace: dataRaces.latinx,
		majorityFaith: "romanCatholic",
		endogamy: 0.8,
		},
	
	cherokee: {
		name: "Cherokee",
		masculineNames: ["Adahy",],
		feminineNames: ["Adsila","Awenasa","Awinita","Ayita",],
		neutralNames: ["Galilahi",],
		surnames: ["Eagle","Tuckahoe","Wickett","Wilenawa","Oconostota","Bentleg","Goodpaster","Cornsilk","Berryman","Rogers","Starr","McDaniel","Lowrey","Gunter","Kingfisher","Crittenden","Sizemore"],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		endogamy: 0.8,
		},
	
	navaho: {
		name: "Navaho",
		masculineNames: ["Ahiga","Atehaine","Bidzil","Bilagaana","Gaagi","Gad","Hastiin","Hokee","Naainish","Nastas","Niyol","Sani","Shilah","Yanisin","Yas","Yiska"],
		feminineNames: [],
		neutralNames: [],
		surnames: ["Acothley","Ahasteen","Atcitty","Ayze","Betone","Bitsuie","Chee","Chissie","Cly","Dahozy","Daisy","Dele","Denetsosie","Haskan","Hayou","Kaibetony","Kesswood","Nalje","Kinnel","Natani","Pahe","Peshlakai","Secody","Taya","Toby","Tohe","Tohonnie","Tseda","Tsipei","Yabeney","Zahne","Sonnie"],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		endogamy: 0.8,
		},
	
	choctaw: {
		name: "Choctaw",
		masculineNames: [],
		feminineNames: ["Atepa","Fala","Isi",],
		neutralNames: ["Nita","Paloma","Talulah"],
		surnames: ["Cole","LeFlore","Fletcher","Harkins","Folsom","Kincaid","McCurtain","Juzan","Waker","Wade","Hudson","Garland","Wright","Bryant","Garvin","Smallwood","Dukes","Semple","Durant"],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		endogamy: 0.8,
		},
	
	lakotaSioux: {
		name: "Lakota Sioux",
		masculineNames: ["Akecheta","Ashkii","Chankoowashtay","Chayton","Enapay","Hotah","Howahkan","Kangee","Kohana","Lootah","Mahkah","Mahpee","Matoskah","Napayshni","Odakota","Ohanzee","Ohetekah","Paytah","Takoda","Teetonka","Watchintonka","Wamblee"],
		feminineNames: [],
		neutralNames: [],
		surnames: ["Dubray","Clown","Catches","Deloria","Red Cloud","Roinson","Guthrie","Fox","Thunderhawk","Iron Teeth","Bear King","Catch the Enemy","Bull","Crow Eagle","Four Robes","Kangi Glixha","Makes Room","Thasujke","Tatanka","Wounded"],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		endogamy: 0.8,
		},
	
	wampanoag: {
		name: "Wampanoag",
		masculineNames: ["Crispus","Massasoit","Corbitant","Caleb","Sonny","Amos","Cedric","Russell"],
		feminineNames: ["Sachem","Jessie","Joan","Linda","Paula"],
		neutralNames: [],
		surnames: ["Perry","Attucks","Weetamoo","Awashonks","Haskins","Dove","Cromwell","Peters","Amos","Lopez","Baird","Avant","Coombs","Haynes","Peters"],
		assignedRace: dataRaces.firstNations,
		majorityFaith: "nondenominationalChristian",
		endogamy: 0.8,
		},
	
	ashkenazim: {
		name: "Ashkenazi Jew",
		masculineNames: ["Ansel","Berman","Hirschel","Hirsh","Lieb","Lieber","Zemel","Abraham","David","Zeke","Ezekiel","Gabriel","Israel","Moishe","Moses","Mordecai","Tobiah","Zusman"],
		feminineNames: ["Bluma","Golda","Shayna","Charna","Faigal","Freyde","Hannah","Judith","Miriam","Rachel","Yentl","Zelda"],
		neutralNames: [],
		surnames: ["Cohen","Kohn","Kahn","Kaplan","Levi","Levine","Levitt","Lewinsky","Aronson","Hirsh","Applebaum","Rosen","Mendelsohn","Abramson","Avromovitch","Manishewitz","Itskowitz","Berliner","Kessler","Gold","Gulden","Malkov","Perlman","Rivken","Soronsohn","Orbach","Bayer","Eisenberg","Epstein","Litwak","Oppenheimer","Shapiro"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "conservativeJudaism",
		endogamy: 0.8,
		},
	
	sephardim: {
		name: "Sephardic Jew",
		masculineNames: ["Abadian","Amadio","Astruc","Barcelay","Bechor","Bonastruc","Bueno","Calahadi","Galaf","Gento","Hualit","Jaco","Marcoch","Mevorach","Moshico","Solal","Zalema"],
		feminineNames: ["Amadh","Aster","Ayna","Basseva","Bechora","Bellida","Benvenuta","Bida","Blanqua","Bona","Bonastruga","Cadin","Ceti","Chera","Cima","Cleret","Dolcha","Duena","Ezter","Gaya","Jamilla","Mati","Mazaltov","Mima","Mira","Orovida","Poncella","Preciosa","Reina","Tita","Ventura","Yerussa"],
		neutralNames: ["Gentile","Mazal"],
		surnames: ["Ashkenazi","Abolofia","Abrevaya","Absaradel","Abulafia","Acher","Alalouf","Alazraki","Alcana","Alderoqui","Alfici","Algazi","Alhadeff","Alkana","Alvo","Amato","Angel","Anreader","Ardity","Arkless","Arnow","Arougheti","Avdalovo","Avzaradel","Azvaradel","Babani","Baigun","Balbach","Barbaimon","Bardavid","Barki","Barokas","Baron","Behar","Bejar","Benatar","Bendjuya","Benezra","Benhabib","Benoun","Benveniste","Benyacar","Berro","Bienn","Binoun","Beton","Buchuk","Cadranel","Cadrone","Calderon","Calvo","Camhi","Capelluto","Capeloto","Capelouto","Capeluto","Capilouto","Capuano","Caston","Cazes","Chalme","Chara","Chertkow","Codron","Coen","Cohen","Cordoba/Cordova","Crain","Curiel","Danon","Elias","Elkana","Eryol","Eskenazi","Esperanza","Fainstein","Farji","Fils","Franco","Galamidi","Galante/Galanti","Gateno","Genni","Girard","Glazer","Gluckman","Goldberg","Goldstein","Greenspan","Grife","Gross","Grossman","Guini","Habib","Hahn","Haki","Halfon","Hanan","Hart","Hasson","Hazan","Huerin","Huniu/Hunio","Israel","Jason","Jassen","Kaplan","Katz","Lanchano","Levi","Levin","Levy","Louza","Mainardis","Mandel","Marincik","Matorin","Maya","Mayesh","Meir","Menache","Mezistrano","Michaud","Mintzer","Miron","Mizrahi","Mosafir","Moscatel","Moscona","Munter","Musafir","Nahmias","Negrin","Nof","Notrica","Palombo","Peha","Piha","Pizante","Policar","Posner","Rackner","Ramsey","Rava","Russo","Salfati","Salmoni","Saul","Scapa","Shapiro","Shemaria","Solam","Soriano","Sourmany","Stern","Surmani","Tarica","Tastassa","Varon","Ventura","Yaffe","Yaras","Yohai","Zlotorynski"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "orthodoxJudaism",
		endogamy: 0.8,
		},
	
	mizrahim: {
		name: "Mizrahic Jew",
		masculineNames: ["Ibrahim","Haroun","Daoud","Moussa","Salman","Latif","Mansour","Ghareeb","Maimun","Said","Hassan","Hayek","Naggar","Sabban","Sannoua","Shenhav","Taeizi","Chorath"],
		feminineNames: ["Sara","Anat","Abigail","Beulah","Hina","Nihla","Astir","Laya","Maryam","Yahuda"],
		neutralNames: [],
		surnames: ["Al-Abrach","Abramchik","Abramtzik","Abocassis","Aborjil","Abotbol","Abramidou","Abu","Agmy","Ajami","Alpron","Amroon","Anijar","Atiya","Avitan","Avramidou","Banay","Barany","Barzani","Ben-abu","Bengio","Biton","Chriqui","Elharar","Fahima","Gozlan","Habibi","Hadad","Hagababa","Harush","Haziz","Hrusch","Hruschov","Russov","Hysh","Jamil","Kashny","Khalili","Khardun","Hardoon","Maimon","Maklof","Mofaz","Mograbi","Nazarian","Naqqash","Sabag","Sassoon","Shamy","Sharabani","Sheriki","Shirazy","Soliman","Soomekh","Yarkoni","Zangi","Zeitouni"],
		assignedRace: dataRaces.middleEastern,
		majorityFaith: "reformJudaism",
		endogamy: 0.8,
		},
	
	};

// Builds references back from dataRaces to constituent ethnicities
for (i in dataEthnicities) {
		dataEthnicities[i].assignedRace.ethnicities.push(dataEthnicities[i]);
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
			denonyms: ["Atheist","Atheists"],
			typicalEthnicities: [undefined],
			clergyRestrictions: {gender:undefined,orientation:undefined,celibacy:undefined},
		},

	anglican: {
			key: "anglican",
			denomination: "Anglican",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Anglican Church"],
			denonyms: ["Anglican","Anglicans"],
			typicalEthnicities: [dataEthnicities.english],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},

	baptist: {
			key: "baptist",
			denomination: "Baptist",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Baptist Church","Bible Church"],
			denonyms: ["Baptist","Baptists"],
			typicalEthnicities: [undefined],
			clergyRestrictions: {gender:dataGenders.man,orientation:"Straight",celibacy:undefined},
		},

	lutheran: {
			key: "lutheran",
			denomination: "Lutheran",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Lutheran Church"],
			denonyms: ["Lutheran","Lutherans"],
			typicalEthnicities: [dataEthnicities.german],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},

	methodist: {
			key: "methodist",
			denomination: "Methodist",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Methodist Church"],
			denonyms: ["Methodist","Methodists"],
			typicalEthnicities: [dataEthnicities.scots,dataEthnicities.english],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},

	nondenominationalChristian: {
			key: "nondenominationalChristian",
			denomination: "Non Denominational Christian",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Christian Church"],
			denonyms: ["Christian","Christians"],
			typicalEthnicities: [dataEthnicities.scots,dataEthnicities.english],
			clergyRestrictions: {gender:dataGenders.man,orientation:"Straight",celibacy:undefined},
		},
	
	unitedChurchChrist: {
			key: "unitedChurchChrist",
			denomination: "United Church of Christ",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.queerRights],
			congregation: ["UCC Church"],
			denonyms: ["UCC Christian","UCC Christians"],
			typicalEthnicities: [dataEthnicities.scots,dataEthnicities.english],
			clergyRestrictions: {gender:undefined,orientation:undefined,celibacy:undefined},
		},

	africanMethodist: {
			key: "africanMethodist",
			denomination: "African Methodist",
			sect: "Protestant",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia,dataIssues.voterSuppression,dataIssues.racialJustice,dataIssues.economicEquity],
			congregation: ["AME Church","African Methodist Church","African Methodist Episcopal Church"],
			denonyms: ["AME Christian","AME Christians"],
			typicalEthnicities: [dataEthnicities.africanAmerican],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},

	romanCatholic: {
			key: "romanCatholic",
			denomination: "Roman Catholic",
			sect: "Roman Catholic",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Catholic Church","Cathedral"],
			denonyms: ["Catholic","Catholics"],
			typicalEthnicities: [dataEthnicities.scots,dataEthnicities.italian,dataEthnicities.cuban,dataEthnicities.mexican],
			clergyRestrictions: {gender:dataGenders.man,orientation:"Straight",celibacy:true},
		},

	greekOrthodox: {
			key: "greekOrthodox",
			denomination: "Greek Orthodox",
			sect: "Orthodox",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Greek Orthodox Church","Basilica"],
			denonyms: ["Greek Christian","Greek Christians"],
			typicalEthnicities: [dataEthnicities.greek],
			clergyRestrictions: {gender:dataGenders.man,orientation:"Straight",celibacy:undefined},
		},

	russianOrthodox: {
			key: "russianOrthodox",
			denomination: "Russian Orthodox",
			sect: "Orthodox",
			name: "Christian",
			issues: [dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Russian Orthodox Church","Basilica"],
			denonyms: ["Russian Christian","Russian Christians"],
			typicalEthnicities: [dataEthnicities.russian],
			clergyRestrictions: {gender:dataGenders.man,orientation:"Straight",celibacy:undefined},
		},
		
	bahai: {
			key: "bahai",
			denomination: "Baha'i",
			sect: "Baha'i",
			name: "Baha'i",
			issues: [dataIssues.religiousFreedom,dataIssues.homophobia],
			congregation: ["Baha'i Faith Center"],
			denonyms: ["Baha'i","Baha'i"],
			typicalEthnicities: [dataEthnicities.iranian],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},
		
	buddhism: {
			key: "buddhism",
			denomination: "Buddhism",
			sect: "Buddhism",
			name: "Buddhism",
			issues: [dataIssues.religiousFreedom,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Temple"],
			denonyms: ["Buddhist","Buddhists"],
			typicalEthnicities: [dataEthnicities.hanChinese],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},
		
	shinto: {
			key: "shinto",
			denomination: "Shinto",
			sect: "Shinto",
			name: "Shinto",
			issues: [dataIssues.religiousFreedom,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Shrine"],
			denonyms: ["Buddhist","Buddhists"],
			typicalEthnicities: [dataEthnicities.japanese],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},
		
	hinduism: {
			key: "hinduism",
			denomination: "Hindu",
			sect: "Hindu",
			name: "Hindu",
			issues: [dataIssues.religiousFreedom,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Ashram","Temple"],
			denonyms: ["Hindu","Hindus"],
			school: ["Ashram"],
			typicalEthnicities: [dataEthnicities.dravidian,dataEthnicities.punjabi],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},
		
	orthodoxJudaism: {
			key: "orthodoxJudaism",
			denomination: "Orthodox Judaism",
			sect: "Judaism",
			name: "Judaism",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Synagogue","Shul","Temple"],
			denonyms: ["Orthodox Jew","Orthodox Jews"],
			school: ["Yeshiva"],
			typicalEthnicities: [dataEthnicities.ashkenazim,dataEthnicities.sephardim,dataEthnicities.mizrahim],
			clergyRestrictions: {gender:dataGenders.man,orientation:"Straight",celibacy:undefined},
		},
		
	reformJudaism: {
			key: "reformJudaism",
			denomination: "Reform Judaism",
			sect: "Judaism",
			name: "Judaism",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Synagogue","Shul","Temple"],
			denonyms: ["Reform Jew","Reform Jews"],
			typicalEthnicities: [dataEthnicities.ashkenazim,dataEthnicities.sephardim,dataEthnicities.mizrahim],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},
		
	conservativeJudaism: {
			key: "conservativeJudaism",
			denomination: "Conservative Judaism",
			sect: "Judaism",
			name: "Judaism",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Synagogue","Shul","Temple"],
			denonyms: ["Conservative Jew","Conservative Jews"],
			typicalEthnicities: [dataEthnicities.ashkenazim,dataEthnicities.sephardim,dataEthnicities.mizrahim],
			clergyRestrictions: {gender:dataGenders.man,orientation:"Straight",celibacy:undefined},
		},
	
	sunniIslam: {
			key: "sunniIslam",
			denomination: "Sunni Muslim",
			sect: "Islam",
			name: "Islam",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Mosque","Islamic Center"],
			denonyms: ["Sunni","Sunnis"],
			typicalEthnicities: [dataEthnicities.punjabi,dataEthnicities.arab,dataEthnicities.pakistani,dataEthnicities.indonesian],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},
	
	shiaIslam: {
			key: "shiaIslam",
			denomination: "Shia Muslim",
			sect: "Islam",
			name: "Islam",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Mosque","Islamic Center"],
			denonyms: ["Shiite","Shiites"],
			typicalEthnicities: [dataEthnicities.iranian],
			clergyRestrictions: {gender:dataGenders.man,orientation:"Straight",celibacy:undefined},
		},
	
	sufiIslam: {
			key: "sufiIslam",
			denomination: "Sufi",
			sect: "Islam",
			name: "Islam",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Mosque","Islamic Center"],
			denonyms: ["Sufi","Sufis"],
			typicalEthnicities: [undefined],
			clergyRestrictions: {gender:undefined,orientation:undefined,celibacy:undefined},
		},
	
	nondenominationalIslam: {
			key: "nondenominationalIslam",
			denomination: "Muslim",
			sect: "Islam",
			name: "Islam",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Mosque","Islamic Center"],
			denonyms: ["Muslim","Muslims"],
			typicalEthnicities: [dataEthnicities.punjabi,dataEthnicities.arab,dataEthnicities.pakistani,dataEthnicities.indonesian,dataEthnicities.iranian],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},
	
	sikhism: {
			key: "sikhism",
			denomination: "Sikh",
			sect: "Sikh",
			name: "Sikh",
			issues: [dataIssues.religiousFreedom,dataIssues.racialJustice,dataIssues.patriarchy,dataIssues.homophobia],
			congregation: ["Gurdwara"],
			denonyms: ["Sikh","Sikhs"],
			typicalEthnicities: [dataEthnicities.punjabi],
			clergyRestrictions: {gender:undefined,orientation:"Straight",celibacy:undefined},
		},
	
	neopagan: {
			key: "neopagan",
			denomination: "Pagan",
			sect: "Neopagan",
			name: "Pagan",
			issues: [dataIssues.religiousFreedom,dataIssues.environmentalism],
			congregation: ["Circle","Coven"],
			denonyms: ["Pagan","Pagans"],
			typicalEthnicities: [dataEthnicities.scots,dataEthnicities.english],
			clergyRestrictions: {gender:undefined,orientation:undefined,celibacy:undefined},
		},
	
	odinist: {
			key: "odinist",
			denomination: "Odinist",
			sect: "Norse Pagan",
			name: "Pagan",
			issues: [dataIssues.religiousFreedom,dataIssues.patriarchy,dataIssues.homophobia,dataIssues.whiteSupremacy,dataIssues.environmentalism],
			congregation: ["Fellowship"],
			denonyms: ["Odinist","Odinists"],
			typicalEthnicities: [dataEthnicities.scots,dataEthnicities.english],
			clergyRestrictions: {gender:undefined,orientation:undefined,celibacy:undefined},
		},
	
	unitarianUniversalist: {
			key: "unitarianUniversalist",
			denomination: "Unitarian-Universalist",
			sect: "Unitarian-Universalist",
			name: "Unitarian-Universalist",
			issues: [dataIssues.religiousFreedom,dataIssues.economicEquity,dataIssues.queerRights,dataIssues.genderEquity,dataIssues.racialJustice],
			congregation: ["Unitarian-Universalists","Unitarian-Universalist Congregation","Unitarian-Universalist Community","Unitarian-Universalist Church","Community Church"],
			denonyms: ["UU","UUs"],
			typicalEthnicities: [dataEthnicities.scots,dataEthnicities.english,dataEthnicities.italian,dataEthnicities.german,dataEthnicities.ashkenazim],
			clergyRestrictions: {gender:undefined,orientation:undefined,celibacy:undefined},
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

	financialHardship: {
		name: "Financial Hardship",
		values: ["care","fairness"],
		issues: [dataIssues.healthcare,dataIssues.economicEquity],
		resources: ["debt"],
		resourceLosses: [],
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
		dataBackstories.financialHardship,
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
			"side",
			" Quarter",
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
			"Pizza",
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
			"Planet",
			"Bar"
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
	shelter: {
		first: [
			"Community",
			"Charitable"
			],
		product: [
			"Women & Children",
			"Safe",
			],
		last: [
			"Shelter",
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

var dataCommunications = {

	flyer: {
		name: "Flyer",
		maxArticles: 1,
		baseTime: 4,
		timePerArticle: 0,
		baseCost: 10,
		costPerArticle: 0,
		requires: undefined,
	},

	mailer: {
		name: "Mailer",
		maxArticles: 1,
		baseTime: 4,
		timePerArticle: 0,
		baseCost: 100,
		costPerArticle: 0,
		requires: undefined,
	},

	newsletter: {
		name: "Newsletter",
		maxArticles: 4,
		baseTime: 2,
		timePerArticle: 2,
		baseCost: 10,
		costPerArticle: 5,
		requires: undefined,
	},

	enewsletter: {
		name: "eNewsletter",
		maxArticles: 4,
		baseTime: 2,
		timePerArticle: 2,
		baseCost: 0,
		costPerArticle: 0,
		requires: undefined,
	},

	report: {
		name: "Report",
		maxArticles: 4,
		baseTime: 8,
		timePerArticle: 4,
		baseCost: 50,
		costPerArticle: 10,
		requires: undefined,
	},

	pressRelease: {
		name: "Press Release",
		maxArticles: 1,
		baseTime: 4,
		timePerArticle: 0,
		baseCost: 0,
		costPerArticle: 0,
		requires: undefined,
	},

	blogpost: {
		name: "Blog Post",
		maxArticles: 4,
		baseTime: 0,
		timePerArticle: 4,
		baseCost: 0,
		costPerArticle: 0,
		requires: undefined, // will be 'dataAssets.blog'
	},

	socialMedia: {
		name: "Social Media Blast",
		maxArticles: 1,
		baseTime: 4,
		timePerArticle: 0,
		baseCost: 0,
		costPerArticle: 0,
		requires: undefined, // will be 'dataAssets.socialMediaAccount'
	},
};