// window.onbeforeunload = function() { return "Going back will erase your current community."; };

var view = {

	focus: {
		neighborhood: '',
		institution: '',
		person: '',
		},
		
	refreshHeader: function() {
		
		var currencyMana = document.getElementById('currencyMana');
		var currencyCash = document.getElementById('currencyCash');
		var currencyTreasury = document.getElementById('currencyTreasury');
		var time = document.getElementById('time');
		
		currencyMana.innerHTML = people[0].currencies.mana;
		currencyCash.innerHTML = "$" + people[0].currencies.cash;
		currencyTreasury.innerHTML = "$" + institutions[0].currencies.cash;
		
		time.innerHTML = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][gameDate.getMonth()] + " " + gameDate.getDate() + ", " + gameDate.getFullYear() + " " + gameDate.getHours() + ":00";
		},
	
	refreshContacts: function() {
		
		var contactList = document.getElementById("contactList");
		var contactItem;
		
		var contacts = [];
		for (n in people) {
			contacts.push([n,people[n]]);
			}

		// Change this later to 'known people'
				
		contacts.sort(function(a,b) {return (a[1].name.last > b[1].name.last) ? 1 : ((b[1].name.last > a[1].name.last) ? -1 : 0);});

		contactList.innerHTML = "";
				
		for (n in contacts) {
			contactItem = document.createElement('li');
			var you = '';
			if (contacts[n][0] == 0) {you = " (you)"};
			contactItem.innerHTML = "<a onclick='handlers.displayContact(" + contacts[n][0] + ")'>" + contacts[n][1].name.first + " " + contacts[n][1].name.middle.charAt(0) + ". " + contacts[n][1].name.last + "</a>" + you;
			contactList.appendChild(contactItem);
			}

	},
	
	refreshMap: function() {
		
		var mapList = document.getElementById("mapList");
		var mapItem;
		
		var neighborhoodsList = [];
		for (n in neighborhoods) {
			neighborhoodsList.push([n,neighborhoods[n]]);
			}

		neighborhoodsList.sort(function(a,b) {return (a[1].name > b[1].name) ? 1 : ((b[1].name > a[1].name) ? -1 : 0);});

		mapList.innerHTML = "";
				
		for (n in neighborhoodsList) {
			mapItem = document.createElement('li');
			mapItem.innerHTML = "<a onclick='handlers.displayNeighborhood(" + neighborhoodsList[n][0] + ")'>" + neighborhoodsList[n][1].name + "</a>";
			if (neighborhoodsList[n][1].institutions.length > 0) {mapItem.innerHTML += " (" +neighborhoodsList[n][1].institutions.length+ ")"}
			mapList.appendChild(mapItem);
			}
	},
	
	refreshCalendar: function() {
	
		var calendarTable = document.getElementById('calendarTable');
		calendarTable.innerHTML = '';
		
		var date = new Date(gameDate.getFullYear(), gameDate.getMonth(),gameDate.getDate() - gameDate.getDay(),0);
		var startOfMonth = true;
		
		for (w=0;w<12;w++) {
			var week = document.createElement('tr');
			for (d=0;d<7;d++) {
				var day = document.createElement('td');
				var key = date.getFullYear().toString() + ('0' + date.getMonth()).slice(-2) + ('0' + date.getDate()).slice(-2);
				if (date < gameDate) {
					day.className = 'calCellPast';
					day.innerHTML = date.getDate();
				} else if (events[key] !== undefined) {
					day.className = 'calCellFutureEvent';
					day.innerHTML = "<a onclick='handlers.displayDate("+key+")'>" + date.getDate() + "</a>";
				} else {
					day.className = 'calCellFutureNone';
					day.innerHTML = date.getDate();
				};
				if (date.getDate() == 1) {startOfMonth = true};
				week.appendChild(day);
				date = new Date(date.getFullYear(), date.getMonth(),date.getDate() + 1,0);
				};
			var monthLabel = document.createElement('td');
			if (startOfMonth) {
				var monthName = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][date.getMonth()];
				monthLabel.innerHTML = monthName.substring(0,3);
				var startOfMonth = false;
			} else {
				monthLabel.innerHTML = '';
				};
			week.insertBefore(monthLabel,week.firstChild);
			calendarTable.appendChild(week);
			};
	
	},
	
	displayDate: function(date) {
		
		var calendarDate = document.getElementById('calendarDate');
		
		var defaultEvents = {dawn:"Sleep",morning:"Free!",lunch:"Free!",afternoon:"Free!",evening:"Free!",lateNight:"Sleep"};
		
		var todaysEvents = {dawn:[],morning:[],lunch:[],afternoon:[],evening:[],lateNight:[]};
		for (i in events[date]) {
			if (events[date][i].date.getHours() == 0) {todaysEvents.lateNight.push(events[date][i])};
			if (events[date][i].date.getHours() == 4) {todaysEvents.dawn.push(events[date][i])};
			if (events[date][i].date.getHours() == 8) {todaysEvents.morning.push(events[date][i])};
			if (events[date][i].date.getHours() == 12) {todaysEvents.lunch.push(events[date][i])};
			if (events[date][i].date.getHours() == 16) {todaysEvents.afternoon.push(events[date][i])};
			if (events[date][i].date.getHours() == 20) {todaysEvents.evening.push(events[date][i])};
			};
		console.log(todaysEvents);
		
		// Add work schedule here (code assumes M-F 9-5)
		for (i in people[0].connections) {
			if (people[0].connections[i][1] == "works at") {
				var hours = people[0].connections[i][3];
				var workplace = people[0].connections[i][0];
				for (h in hours) {
					defaultEvents[hours[h]] = "Work";
					todaysEvents[hours[h]].push({name:"Work",venue:workplace,sponsors:[]});
					};
				};
			};
		
		for (i in defaultEvents) {
			var cellName = "event" + i.charAt(0).toUpperCase() + i.slice(1);
			var eventCell = document.getElementById(cellName);
			if (todaysEvents[i].length > 0) {
				var eventText = '';
				if (todaysEvents[i].length > 1) {
					eventText += '<div class="eventConflict">Schedule Conflict!</div>';
					};
				eventText += '<table id = "eventBar"><tr>';
				for (e in todaysEvents[i]) {
					eventText += "<td class='eventCell'><h3 class='eventHead'>" + todaysEvents[i][e].name + "</h3><table class='eventList'>";
					if (todaysEvents[i][e].demand !== undefined) {
						eventText += "<tr><td class='tableHead'>Promoting:</td><td class='eventInfo'>" + todaysEvents[i][e].demand.cause.name + "</td></tr>";
						};
					eventText += "<tr><td class='tableHead'>Location:</td><td class='eventInfo'>";
					if (todaysEvents[i][e].venue !== undefined) {
						eventText += todaysEvents[i][e].venue.name;
					} else {
						eventText += "to be determined";
						};
					eventText += "</td></tr>";
					if (todaysEvents[i][e].sponsors[0] !== undefined) {
					eventText += "<tr><td class='tableHead'>Sponsors:</td><td class='eventInfo'>";
						for (s in todaysEvents[i][e].sponsors) {
							if (todaysEvents[i][e].sponsors[s].sponsor.name.first == undefined) {
								eventText += todaysEvents[i][e].sponsors[s].sponsor.name + "<br />";
							} else {
								eventText += todaysEvents[i][e].sponsors[s].sponsor.name.first + " " + todaysEvents[i][e].sponsors[s].sponsor.name.last + "<br />";
								};
							};
						};
					eventText += "</td></tr>";
					var playerEvent = false;
					for (s in todaysEvents[i][e].sponsors) {
						console.log(todaysEvents[i][e].sponsors[s].sponsor);
						if (todaysEvents[i][e].sponsors[s].sponsor == institutions[0] || todaysEvents[i][e].sponsors[s].sponsor == people[0]) {
							playerEvent = true;
							}
						}
					if (playerEvent) {
						eventText += "<tr><td class='tableHead'>Prepwork:</td><td class='eventInfo'>"
						eventText += Math.round(100*todaysEvents[i][e].prepDone/todaysEvents[i][e].prep) + "% (" + (todaysEvents[i][e].prep - todaysEvents[i][e].prepDone) + " hours remaining)";
						eventText += "</td></tr><tr><td class='tableHead'>Funding:</td><td class='eventInfo'>"
						if (todaysEvents[i][e].cost === 0) {
							eventText += 'no cost';
						} else {
							eventText += Math.round(100*todaysEvents[i][e].funding/todaysEvents[i][e].cost) + "% ($" + todaysEvents[i][e].funding + " / $" + todaysEvents[i][e].cost + ")";
							};
						eventText += "</td></tr><tr><td class='tableHead'>RSVPs:</td><td class='eventInfo'>";
						eventText += todaysEvents[i][e].rsvps.acceptances.length + " accepted, " + todaysEvents[i][e].rsvps.declines.length + " declined";
						eventText += "</td></tr>"
					} else if (todaysEvents[i][e].sponsors[0] == undefined && todaysEvents[i].length > 1) {
						eventText += "<tr><td class='tableHead'>Scheduling:</td><td class='eventInfo'><button disabled>Use Vacation Day</button><button disabled>Call In Sick</button></td></tr>"
					} else if (todaysEvents[i][e].sponsors[0] !== undefined) {
						eventText += "<tr><td class='tableHead'>RSVP:</td><td class='eventInfo'>";
						if (todaysEvents[i][e].playerRSVP === false) {
							eventText += "<button disabled>Accept</button> <button disabled>Decline</button>";
						} else {
							eventText += "yes";
							};
						eventText += "</td></tr></td>"
						};
						eventText += "</tr></table>";
					};
					eventText += "</tr></table></div>";
					eventCell.innerHTML = eventText;
			} else {
				eventCell.innerHTML = "<h3 class='eventHead'>" + defaultEvents[i] + "</h3>";
				};
			};
		
		calendarDate.innerHTML = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"][events[date][0].date.getMonth()] + ' ' + events[date][0].date.getDate() + ' ' + events[date][0].date.getFullYear();
	},
	
	displayContact: function(contact) {
	
		console.log(contact);
		
		var name = contact.name.first + " " + contact.name.middle + " " + contact.name.last;
		var age = contact.age;
		
		var race = contact.race.name;
		
		var ethnicity;
		var contactEthnicities = {};
		for (i in contact.ethnicity) {
			contactEthnicities[contact.ethnicity[i].name] = 0;
		};
		for (i in contact.ethnicity) {
			contactEthnicities[contact.ethnicity[i].name] += 0.25;
		};
		var ethnicities = Object.keys(contactEthnicities);
		if (ethnicities.length == 1) {
			ethnicity = ethnicities[0];
		} else if (ethnicities.length == 2 && contactEthnicities[ethnicities[0]] == 0.5) {
			ethnicity = "half " + ethnicities[0] + ", half " + ethnicities[1];
		} else if (ethnicities.length == 2 && contactEthnicities[ethnicities[0]] == 0.75) {
			ethnicity = "three-quarters " + ethnicities[0] + " and one-quarter " + ethnicities[1];
		} else if (ethnicities.length == 2 && contactEthnicities[ethnicities[0]] == 0.25) {
			ethnicity = "three-quarters " + ethnicities[1] + " and one-quarter " + ethnicities[0];
		} else if (ethnicities.length == 3 && contactEthnicities[ethnicities[0]] == 0.5) {
			ethnicity = 'half ' + ethnicities[0] + ", quarter " + ethnicities[1] + ", and quarter " + ethnicities[2];
		} else if (ethnicities.length == 3 && contactEthnicities[ethnicities[1]] == 0.5) {
			ethnicity = 'half ' + ethnicities[1] + ", quarter " + ethnicities[0] + ", and quarter " + ethnicities[2];
		} else if (ethnicities.length == 3 && contactEthnicities[ethnicities[2]] == 0.5) {
			ethnicity = 'half ' + ethnicities[2] + ", quarter " + ethnicities[1] + ", and quarter " + ethnicities[0];
		} else {
			ethnicity = ethnicities[0] + ", " + ethnicities[1] + ", " + ethnicities[2] + ", and " + ethnicities[3];
		};
		
		
		if (contact.gender.identity.name === contact.gender.assigned.name) {
				var gender = "Cisgender " + contact.gender.identity.name;
			} else if (contact.gender.identity.name === contact.gender.public.name) {
				var gender = "Transgender " + contact.gender.identity.name;
			} else {
				var gender = "Transgender " + contact.gender.identity.name + " (publicly, a " + contact.gender.public.name + ")";
			}
		
		if (contact.orientation.attraction.length === 0) {
				var publicOrientation = "Asexual";
			} else if (contact.gender.public.name === "Man" && contact.orientation.attraction[0].name === "Woman" && contact.orientation.attraction.length === 1) {
				var publicOrientation = "Straight";
			} else if (contact.gender.public.name === "Woman" && contact.orientation.attraction[0].name === "Man" && contact.orientation.attraction.length === 1) {
				var publicOrientation = "Straight";
			} else if (contact.orientation.attraction.length > 2) {
				var publicOrientation = "Queer Pansexual";
			} else if (contact.orientation.attraction.length > 1) {
				var publicOrientation = "Queer Bisexual";
			} else if (contact.gender.public.name === "Man" && contact.orientation.attraction[0].name === "Man") {
				var publicOrientation = "Queer Gay";
			} else if (contact.gender.public.name === "Woman" && contact.orientation.attraction[0].name === "Woman") {
				var publicOrientation = "Queer Lesbian";
			} else {
				var publicOrientation = "Queer";
			};
		
		if (contact.orientation.attraction.length === 0) {
				var orientation = "Asexual";
			} else if (contact.gender.identity.name === "Man" && contact.orientation.attraction[0].name === "Woman" && contact.orientation.attraction.length === 1) {
				var orientation = "Straight";
			} else if (contact.gender.identity.name === "Woman" && contact.orientation.attraction[0].name === "Man" && contact.orientation.attraction.length === 1) {
				var orientation = "Straight";
			} else if (contact.orientation.attraction.length > 2) {
				var orientation = "Queer Pansexual";
			} else if (contact.orientation.attraction.length > 1) {
				var orientation = "Queer Bisexual";
			} else if (contact.gender.identity.name === "Man" && contact.orientation.attraction[0].name === "Man") {
				var orientation = "Queer Gay";
			} else if (contact.gender.identity.name === "Woman" && contact.orientation.attraction[0].name === "Woman") {
				var orientation = "Queer Lesbian";
			} else {
				var orientation = "Queer";
			};
		
		if (contact.orientation.closet === true) {
			publicOrientation = "Straight";
			};
		
		if (publicOrientation !== orientation) {
			orientation = orientation + " (publically, " + publicOrientation + ")";
			};
		
		var faith = contact.faith.denomination;
		
		var contactName = document.getElementById('contactName');
		var contactAge = document.getElementById('contactAge');
		var contactGender = document.getElementById('contactGender');
		var contactRace = document.getElementById('contactRace');
		var contactFaith = document.getElementById('contactFaith');
		var contactOrientation = document.getElementById('contactOrientation');
		var contactEthnicity = document.getElementById('contactEthnicity');
		
		contactName.innerHTML = name;
		contactAge.innerHTML = age;
		contactGender.innerHTML = gender;
		contactRace.innerHTML = race;
		contactFaith.innerHTML = faith;
		contactOrientation.innerHTML = orientation;
		contactEthnicity.innerHTML = ethnicity;
		
		var contactConnections = document.getElementById('contactConnections');
		contactConnections.innerHTML = "";
		var connections = contact.connections;
		for (i in connections) {
			var connectionItem = document.createElement('li');
			connectionItem.innerHTML = connections[i][1] + " " + "<a onclick='handlers.jumpToInstitution("+i+")'>" + connections[i][0].name + "</a> (" + connections[i][2] + ")";
			contactConnections.appendChild(connectionItem);
			};
		
		var contactPersonalNetwork = document.getElementById('contactPersonalNetwork');
		contactPersonalNetwork.innerHTML = '';
		var personalNetwork = contact.personalNetwork;
		for (i in personalNetwork) {
			var personalNetworkItem = document.createElement('li');
			if (personalNetwork[i].length === 1) {
				personalNetworkItem.innerHTML = personalNetwork[i][0] + " <button disabled>Meet</button>";
			} else if (personalNetwork[i][0] === 'a child') {
				var childBirth = personalNetwork[i][2];
				var childAge = date.year - childBirth.year;
				if (childBirth.month < date.month) {childAge--};
				if (childBirth.month == date.month && childBirth.day < date.day) {childBirth--};
				if (childAge < 18) {
				personalNetworkItem.innerHTML = "a " + childAge + "-year-old child";
				} else {
				personalNetworkItem.innerHTML = "a " + childAge + "-year-old child" + " <button disabled>Meet</button>";
				}
			} else if (personalNetwork[i][1] !== undefined) {
				personalNetworkItem.innerHTML = personalNetwork[i][0] + ", <a onclick='handlers.jumpToPerson(" + personalNetwork[i][1] + ")'>" + people[personalNetwork[i][1]].name.first + "</a>";
				}
			contactPersonalNetwork.appendChild(personalNetworkItem);
			};
		
		var contactStatus = document.getElementById('contactStatus');
		var contactMoney = document.getElementById('contactMoney');
		var contactNetwork = document.getElementById('contactNetwork');
		var contactEducation = document.getElementById('contactEducation');
		
		contactStatus.innerHTML = descStatus[Math.max(0,contact.resources.status)] + " (" + contact.resources.status + ")";
		contactMoney.innerHTML = descMoney[Math.max(0,contact.resources.money)] + " (" + Math.max(0,contact.resources.money) + ")";
		if (contact.resources.debt > 0) {contactMoney.innerHTML += ", in debt (" + contact.resources.debt + ")"};
		contactNetwork.innerHTML = descNetwork[Math.max(0,contact.resources.network)] + " (" + contact.resources.network + ")";
		contactEducation.innerHTML = descEducation[Math.max(0,contact.resources.education)] + " (" + contact.resources.education + ")";

		var contactBackstory = document.getElementById('contactStory');
		contactStory.innerHTML = '';

		var backstories = [];
		for (n in contact.backstories) {
			backstoryItem = document.createElement('li');
			backstoryItem.innerHTML = contact.backstories[n].type.name;
			contactBackstory.appendChild(backstoryItem);
			}
		
		var ambitionCell = document.getElementById('ambitionCell');	
		var ambitionValue = document.getElementById('ambitionValue');
		var authorityCell = document.getElementById('authorityCell');	
		var authorityValue = document.getElementById('authorityValue');
		var careCell = document.getElementById('careCell');	
		var careValue = document.getElementById('careValue');
		var fairnessCell = document.getElementById('fairnessCell');	
		var fairnessValue = document.getElementById('fairnessValue');
		var libertyCell = document.getElementById('libertyCell');	
		var libertyValue = document.getElementById('libertyValue');
		var loyaltyCell = document.getElementById('loyaltyCell');	
		var loyaltyValue = document.getElementById('loyaltyValue');
		var purityCell = document.getElementById('purityCell');	
		var purityValue = document.getElementById('purityValue');
		
		var totalValues = contact.values.ambition + contact.values.authority + contact.values.care + contact.values.fairness + contact.values.liberty + contact.values.loyalty + contact.values.purity ;
		
		ambitionValue.innerHTML = Math.round(contact.values.ambition * 100 / totalValues);
		ambitionCell.style.width = Math.round(contact.values.ambition * 100 / totalValues) + "%";
		
		authorityValue.innerHTML = Math.round(contact.values.authority * 100 / totalValues);
		authorityCell.style.width = Math.round(contact.values.authority * 100 / totalValues) + "%";
		
		careValue.innerHTML = Math.round(contact.values.care * 100 / totalValues);
		careCell.style.width = Math.round(contact.values.care * 100 / totalValues) + "%";
		
		fairnessValue.innerHTML = Math.round(contact.values.fairness * 100 / totalValues);
		fairnessCell.style.width = Math.round(contact.values.fairness * 100 / totalValues) + "%";
		
		libertyValue.innerHTML = Math.round(contact.values.liberty * 100 / totalValues);
		libertyCell.style.width = Math.round(contact.values.liberty * 100 / totalValues) + "%";
		
		loyaltyValue.innerHTML = Math.round(contact.values.loyalty * 100 / totalValues);
		loyaltyCell.style.width = Math.round(contact.values.loyalty * 100 / totalValues) + "%";
		
		purityValue.innerHTML = Math.round(contact.values.purity * 100 / totalValues);
		purityCell.style.width = Math.round(contact.values.purity * 100 / totalValues) + "%";
		
		var issuesList = document.getElementById('issuesList');
		issuesList.innerHTML = '';
		var issuesItem;
		var issues = [];
		var issueStrength = 0;
		for (n in contact.issues) {
			issues.push({issue:contact.issues[n],value:contact.issues[n].value(contact)})
			};
		issues.sort(function(a,b) {return (a.value > b.value) ? -1 : 1 });
		for (n in issues) {
			issuesItem = document.createElement('li');
			issuesItem.innerHTML =  issues[n].issue.name + " [" + issues[n].value + "]";
			issuesList.appendChild(issuesItem);
			};
			
		view.focus.contact = contact;
		
	
	},
	
	displayNeighborhood: function(neighborhood) {
	
		console.log(neighborhood);
		
		var mapImagePane = document.getElementById('mapImagePane');
		mapImagePane.style.backgroundColor = dataColors[neighborhood.color];
		
		var neighborhoodName = document.getElementById('neighborhoodName');
		var neighborhoodStatusCell = document.getElementById('neighborhoodStatusCell');
		var neighborhoodMoneyCell = document.getElementById('neighborhoodMoneyCell');
		var neighborhoodZoningCell = document.getElementById('neighborhoodZoningCell');
		var neighborhoodRacesCell = document.getElementById('neighborhoodRacesCell');
		var neighborhoodResidentialSpan = document.getElementById('neighborhoodResidentialSpan');
		var neighborhoodCommercialSpan = document.getElementById('neighborhoodCommercialSpan');
		var neighborhoodIndustrialSpan = document.getElementById('neighborhoodIndustrialSpan');
		var neighborhoodMunicipalSpan = document.getElementById('neighborhoodMunicipalSpan');
		var neighborhoodResidentialList = document.getElementById('neighborhoodResidentialList');
		var neighborhoodCommercialList = document.getElementById('neighborhoodCommercialList');
		var neighborhoodIndustrialList = document.getElementById('neighborhoodIndustrialList');
		var neighborhoodMunicipalList = document.getElementById('neighborhoodMunicipalList');
		
		neighborhoodName.innerHTML = neighborhood.name;
		neighborhoodStatusCell.innerHTML = descStatus[Math.min(5,Math.max(0,neighborhood.demographics.status))] + " (" + neighborhood.demographics.status + ")";
		neighborhoodMoneyCell.innerHTML = descPropertyValue[Math.min(5,Math.max(0,neighborhood.demographics.money))] + " (" + neighborhood.demographics.money + ")";
		
		neighborhoodResidentialSpan.innerHTML = Math.round(neighborhood.zoning.residential*100) + "%";
		neighborhoodCommercialSpan.innerHTML = Math.round(neighborhood.zoning.commercial*100) + "%";
		neighborhoodIndustrialSpan.innerHTML = Math.round(neighborhood.zoning.industrial*100) + "%";
		neighborhoodMunicipalSpan.innerHTML = Math.round(neighborhood.zoning.municipal*100) + "%";

		var raceDemographicsList = '';
		var races = Object.keys(neighborhood.demographics.race);
		races.sort(function(a,b) {return (neighborhood.demographics.race[a] > neighborhood.demographics.race[b]) ? -1 : ((neighborhood.demographics.race[b] > neighborhood.demographics.race[a]) ? 1 : 0);});
		for (i in races) {
			if (neighborhood.demographics.race[races[i]] > 0) {
				raceDemographicsList += "<li>" + Math.round(100*neighborhood.demographics.race[races[i]]/neighborhood.demographics.population) + "% " + dataRaces[races[i]].name + "</li>";
				}
		}
					
		neighborhoodRacesCell.innerHTML = raceDemographicsList;
			
		neighborhoodResidentialList.innerHTML = '';
		neighborhoodCommercialList.innerHTML = '';
		neighborhoodIndustrialList.innerHTML = '';
		neighborhoodMunicipalList.innerHTML = '';
		for (i in neighborhood.institutions) {
			var newInstitution = document.createElement('li');
			newInstitution.innerHTML = "<a onclick='handlers.displayInstitution("+i+")'>"+neighborhood.institutions[i].name + "</a>";
			if (neighborhood.institutions[i].type === "residential") {
				neighborhoodResidentialList.appendChild(newInstitution);
			} else if (neighborhood.institutions[i].type === "commercial") {
				neighborhoodCommercialList.appendChild(newInstitution);
			} else if (neighborhood.institutions[i].type === "industrial") {
				neighborhoodIndustrialList.appendChild(newInstitution);
			} else {
				neighborhoodMunicipalList.appendChild(newInstitution);
			}
			}
			
		
		// And then clear and un-display the Institutions Pane
		var mapInstitutionPane = document.getElementById('mapInstitutionPane');
		var institutionName = document.getElementById('institutionName');
		var institutionStatusCell = document.getElementById('institutionStatusCell');
		var institutionPaygradeCell = document.getElementById('institutionPaygradeCell');
		var institutionTypicalClientsCell = document.getElementById('institutionTypicalClientsCell');
		var institutionTypicalEmployeesCell = document.getElementById('institutionTypicalEmployeesCell');
		var institutionUnionsCell = document.getElementById('institutionUnionsCell');
		
		institutionName.innerHTML = 'Null';
		institutionStatusCell.innerHTML = '';
		institutionPaygradeCell.innerHTML = '';
		institutionTypicalClientsCell.innerHTML = '';
		institutionTypicalEmployeesCell.innerHTML = '';
		institutionUnionsCell.innerHTML = '';
		mapInstitutionPane.style.display = 'none';
		
		view.focus.neighborhood = neighborhood;
	},
	
	displayInstitution: function(institution) {
		
		console.log(institution);
		
		var mapInstitutionPane = document.getElementById('mapInstitutionPane');
		var institutionName = document.getElementById('institutionName');
		var institutionStatusCell = document.getElementById('institutionStatusCell');
		var institutionPaygradeCell = document.getElementById('institutionPaygradeCell');
		var institutionPayrollCell = document.getElementById('institutionPayrollCell');
		var institutionTypicalClientsCell = document.getElementById('institutionTypicalClientsCell');
		var institutionTypicalEmployeesCell = document.getElementById('institutionTypicalEmployeesCell');
		var institutionCapacityCell = document.getElementById('institutionCapacityCell');
		var institutionUnionsCell = document.getElementById('institutionUnionsCell');
		var institutionClientsList = document.getElementById('institutionClientsList');
		var institutionEmployeesList = document.getElementById('institutionEmployeesList');
		var institutionClientsHead = document.getElementById('institutionClientsHead');
		var institutionEmployeesHead = document.getElementById('institutionEmployeesHead');
		
		institutionName.innerHTML = institution.name;
		institutionStatusCell.innerHTML = descQuality[Math.min(5,Math.max(0,institution.status))] + " (" + institution.status + ")";
		institutionPaygradeCell.innerHTML = institution.paygrade.unskilled + " / " + institution.paygrade.skilled + " / " + institution.paygrade.management + " / " + institution.paygrade.executive;
		institutionPayrollCell.innerHTML = institution.payroll.unskilled + " / " + institution.payroll.skilled + " / " + institution.payroll.management + " / " + institution.payroll.executive;
		institutionCapacityCell.innerHTML = institution.capacity;
		institutionUnionsCell.innerHTML = 'TK';
		
		var typicalClienteleText = '';
		if (institution.typicalClientele.faiths === undefined && institution.typicalClientele.genders === undefined && institution.typicalClientele.orientation === undefined && institution.typicalClientele.ethnicities[0] === undefined) {
			typicalClienteleText = 'various ';
			}
		if (institution.typicalClientele.orientation !== undefined) {
			typicalClienteleText += institution.typicalClientele.orientation + " ";
			}
		if (institution.typicalClientele.faiths !== undefined && institution.typicalClientele.genders !== undefined) {
			for (i in institution.typicalClientele.faiths) {
				typicalClienteleText += institution.typicalClientele.faiths[i].denonyms[0] + ' ';
				if (i == institution.typicalClientele.faiths.length-2) {
					typicalClienteleText += "and ";
					}
				}
			}
		if (institution.typicalClientele.race !== undefined) {
			typicalClienteleText += institution.typicalClientele.race.name+" (";
			}	
		if (institution.typicalClientele.ethnicities !== undefined && institution.typicalClientele.ethnicities[0] !== undefined) {
			for (i in institution.typicalClientele.ethnicities) {
				typicalClienteleText += institution.typicalClientele.ethnicities[i].name + ' ';
				if (i == institution.typicalClientele.ethnicities.length-2) {
					typicalClienteleText += "and ";
					}
				}
			}
		if (institution.typicalClientele.race !== undefined) {
			typicalClienteleText += ") ";
			}
		if (institution.typicalClientele.genders !== undefined) {
			for (i in institution.typicalClientele.genders) {
				typicalClienteleText += institution.typicalClientele.genders[i].plural + ' ';
				if (i == institution.typicalClientele.genders.length-2) {
					typicalClienteleText += "and ";
					}
				}
			} else if (institution.typicalClientele.faiths !== undefined) {
				for (i in institution.typicalClientele.faiths) {
					typicalClienteleText += institution.typicalClientele.faiths[i].denonyms[1] + ' ';
				if (i == institution.typicalClientele.faiths.length-2) {
					typicalClienteleText += " nd ";
					}
					}
			} else {
				typicalClienteleText += "people";
			}
		institutionTypicalClientsCell.innerHTML = typicalClienteleText;
		
		var typicalEmployeesText = '';
		for (i in institution.typicalEmployees) {
				if (institution.typicalEmployees[i].orientation !== undefined) {
					typicalEmployeesText += institution.typicalEmployees[i].orientation + " ";
					};
				if (institution.typicalEmployees[i].faith !== undefined) {
					typicalEmployeesText += dataFaiths[institution.typicalEmployees[i].faith].denomination + " ";
					};
				if (institution.typicalEmployees[i].race !== undefined) {
					typicalEmployeesText += institution.typicalEmployees[i].race.name + " ";
					};
				if (institution.typicalEmployees[i].gender !== undefined) {
					typicalEmployeesText += institution.typicalEmployees[i].gender.plural + " ";
					};
				typicalEmployeesText += i;
				if (i === 'unskilled' || i === 'skilled') {typicalEmployeesText += " workers"};
				typicalEmployeesText += '<br />';
			}
		institutionTypicalEmployeesCell.innerHTML = typicalEmployeesText;

		if (institution.type === "religious") {
			institutionClientsHead.innerHTML = "Congregants";
			institutionEmployeesHead.innerHTML = "Staff";
		} else if (institution.type === "residential") {
			institutionClientsHead.innerHTML = "Residents";
			institutionEmployeesHead.innerHTML = "Employees";
		} else {
			institutionClientsHead.innerHTML = "";
			institutionEmployeesHead.innerHTML = "Employees";
		}
		
		var unknown = 0;
		institutionClientsList.innerHTML = "";
		var clients = institution.clients;
		for (i in clients) {
			clientItem = document.createElement('li');
			clientItem.innerHTML = "<a onclick='handlers.jumpToClient("+i+")'>" + clients[i][0].name.first + " " + clients[i][0].name.last + " (" + clients[i][1] + ")</a>";
			institutionClientsList.appendChild(clientItem);
			};
		if (institution.type === "religious" || institution.type === "residential") {
			var unknownClients = document.createElement('li');
			unknown = institution.capacity - institution.clients.length;
			if (institution.clients.length === 0) {
				unknownClients.innerHTML = unknown + " unknown people";
			} else {
				unknownClients.innerHTML = "...and " + unknown + " more";
			}
			institutionClientsList.appendChild(unknownClients);
		}
		
		institutionEmployeesList.innerHTML = "";
		var employees = institution.employees.executive.concat(institution.employees.management.concat(institution.employees.skilled.concat(institution.employees.unskilled.concat())));
		institution.employees.all = employees;
		var levels = [];
		for (i in institution.employees.executive) {
			levels.push("executive");
		}
		for (i in institution.employees.management) {
			levels.push("management");
		}
		for (i in institution.employees.skilled) {
			levels.push("skilled");
		}
		for (i in institution.employees.unskilled) {
			levels.push("unskilled");
		}
		
		for (i in employees) {
			employeeItem = document.createElement('li');
			employeeItem.innerHTML = "<a onclick='handlers.jumpToEmployee("+i+")'>" + employees[i].name.first + " " + employees[i].name.last + " ("+levels[i]+")</a>";
			institutionEmployeesList.appendChild(employeeItem);
			};
		
		unknown = institution.payroll.skilled + institution.payroll.unskilled + institution.payroll.management + institution.payroll.executive - (institution.employees.unskilled.length + institution.employees.skilled.length + institution.employees.management.length + institution.employees.executive.length);
			if (employees.length === 0) {
				var unknownEmployees = document.createElement('li');
				unknownEmployees.innerHTML = unknown + " unknown people";
				institutionEmployeesList.appendChild(unknownEmployees);
			} else if (unknown == 0) {
			} else {
				var unknownEmployees = document.createElement('li');
				unknownEmployees.innerHTML = "...and " + unknown + " more";
				institutionEmployeesList.appendChild(unknownEmployees);
			}
		
		mapInstitutionPane.style.display = 'block';
		view.focus.institution = institution;
	},
	
	refreshActions: function() {
		console.log('Refreshing actions…');

		// Scheduled Event Quick Bar
		var actionScheduleEvents = document.getElementById('actionScheduleEvents');
		var goToWorkButton = document.getElementById('goToWorkButton');
		var goToEventButton = document.getElementById('goToEventButton');
		var goToSleepButton = document.getElementById('goToSleepButton');
		
		// Review Organization
		document.getElementById('organizationName').innerHTML = institutions[0].name;
		document.getElementById('operationsTreasury').innerHTML = "$" + institutions[0].currencies.cash;
		
		var subscribers = []
		for (i in institutions[0].subscriptionLists) {
			subscribers.concat(institutions[0].subscriptionLists[i][1]);
		}
		document.getElementById('operationsSubscribers').innerHTML = subscribers.length;
		
		var volunteers = institutions[0].employees.volunteer;
		var volunteersList = document.createElement('ul');
		volunteersList.className = "noIndent";
		for (i in volunteers) {
			var volunteersItem = document.createElement('li');
			volunteersItem.innerHTML = volunteers[i].name.first + " " + volunteers[i].name.last;
			volunteersList.appendChild(volunteersItem);
			};
		document.getElementById('operationsVolunteers').innerHTML = '';	
		document.getElementById('operationsVolunteers').appendChild(volunteersList);
		if (volunteers.length === 0) {document.getElementById('operationsVolunteers').innerHTML = 0;};
		
		var hires = institutions[0].employees.unskilled.concat(institutions[0].employees.skilled.concat(institutions[0].employees.management.concat(institutions[0].employees.executive)));
		var hiresList = document.createElement('ul');
		hiresList.className = "noIndent";
		for (i in hires) {
			var hiresItem = document.createElement('li');
			hiresItem.innerHTML = hires[i].name.first + " " + hires[i].name.last;
			hiresList.appendChild(hiresItem);
			};
		document.getElementById('operationsHires').innerHTML = '';
		document.getElementById('operationsHires').appendChild(hiresList);
		
		var allies = institutions[0].organizations.allies;
		var alliesList = document.createElement('ul');
		alliesList.className = 'noIndent';
		for (i in allies) {
			var alliesItem = document.createElement('li');
			alliesItem.innerHTML = allies[i].name;
			alliesList.appendChild(alliesItem);
			};
		document.getElementById('operationsAllies').innerHTML = '';
		document.getElementById('operationsAllies').appendChild(alliesList);
		if (allies.length === 0) {document.getElementById('operationsAllies').innerHTML = 0;};	
		
		var operationsPledges = document.getElementById('operationsPledges');
		var operationsReputation = document.getElementById('operationsReputation');
		var operationsGrants = document.getElementById('operationsGrants');
		var operationsAchievements = document.getElementById('operationsAchievements');
		var operationsOffices = document.getElementById('operationsOffices');

		// Populates Demand Lists
		var DemandItem;
		var lists = {visitTopicList:0,eventPlanDemandList:0,articleDemandList0:0};
		for (i=0;i<document.getElementById('actionCalls').children.length;i++) {
			lists[document.getElementById('actionCalls').children[i].children[1].id]=0;
			};
		playerEvents = [];
		for (d in events) {
			for (e in events[d]) {
				for (s in events[d][e].sponsors) {
					if (events[d][e].sponsors[s].sponsor == institutions[0]) {
						playerEvents.push([events[d][e],d,e])
						};
					};
				};
			};
		for (i in lists) {
			document.getElementById(i).innerHTML = '<option disabled selected>[Select a Demand]</option>';
			
			for (l=1; l < institutions[0].subscriptionLists.length; l++) {
				demandItem = document.createElement('option');
				demandItem.innerHTML = 'subscribe to your ' + institutions[0].subscriptionLists[l].name + " list";
				demandItem.value = 'subscribe ' + l;
				document.getElementById(i).appendChild(demandItem);
				}
			
			demandItem = document.createElement('option');
			demandItem.innerHTML = 'donate to ' + institutions[0].name;
			demandItem.value = 'donate'
			document.getElementById(i).appendChild(demandItem);
			
			for (e in playerEvents) {
				demandItem = document.createElement('option');
				demandItem.innerHTML = "attend " + playerEvents[e][0].name;
				demandItem.value = 'attend ' + playerEvents[e][1] + playerEvents[e][2];
				document.getElementById(i).appendChild(demandItem);
				};
				
			for (e in playerEvents) {
				demandItem = document.createElement('option');
				demandItem.innerHTML = "sponsor " + playerEvents[e][0].name;
				demandItem.value = 'sponsor ' + playerEvents[e][1] + playerEvents[e][2];
				document.getElementById(i).appendChild(demandItem);
			
				};
		};
		
		// Populate Target Lists
		// (Article Targets are always 'All Readers'; Event Targets can be 'Attendees' and can be others (for sit-ins))
		var callCapacity = 4;
		document.getElementById('visitContactList').innerHTML = '<option selected disabled>[Select a Contact]</option>';
		document.getElementById('communicationTargetList').innerHTML = '<option value="-1">All Readers</option>';
		document.getElementById('eventPlanTargetList').innerHTML = '<option value="-1">Attendees</option>';
		
		var contactItem;
		lists = {visitContactList:0,communicationTargetList:0,eventPlanTargetList:0};
		for (i=0;i<document.getElementById('actionCalls').children.length;i++) {
			lists[document.getElementById('actionCalls').children[i].children[0].id]=0;
			}
		
		alphPeople = [];
		for (p in people) {
			if (p > 0) {
				alphPeople.push([people[p],p]);
				};
			}
		alphPeople.sort(function(a,b) {return (a[0].name.last > b[0].name.last) ? 1 : ((b[0].name.last > a[0].name.last) ? -1 : 0);});
		for (i in lists) {
			document.getElementById(i).innerHTML = '<option selected disabled>[Select a Contact]</option>';
			for (p in alphPeople) {
				contactItem = document.createElement('option');
				contactItem.innerHTML = alphPeople[p][0].name.first + " " + alphPeople[p][0].name.last;
				contactItem.value = alphPeople[p][1]
				document.getElementById(i).appendChild(contactItem);
				};
			};
		
		// Populate Issues List
		document.getElementById('eventPlanCauseList').innerHTML = '<option selected disabled>[Select a Cause]</option>';
		document.getElementById('communicationIssueList0').innerHTML = '<option selected disabled>[Select a Cause]</option>';
		var causeItem;
		var causeList = people[0].issues;
		causeList.sort(function(a,b) {return a.value(people[0]) < b.value(people[0]) ? 1 : ((b.value(people[0]) < a.value(people[0])) ? -1 : 0);});
		for (i in causeList) {
			causeItem = document.createElement('option');
			causeItem.innerHTML = causeList[i].name;
			causeItem.value = causeList[i].key;
			document.getElementById('eventPlanCauseList').appendChild(causeItem);
			
			for (a=0;a<1;a++) {
				causeItem = document.createElement('option');
				causeItem.innerHTML = causeList[i].name;
				causeItem.value = causeList[i].key;
				document.getElementById('communicationIssueList'+a).appendChild(causeItem);
				};
			
			};
			
		// One-on-Ones
		var connections = '';
		var connectCost = 10;
		if (connectCost > people[0].currencies.mana) {var buttonDisabled = 'disabled'} else {var buttonDisabled = ''};
		for (i in people[0].connections) {
			if (i > 0) {
				if (people[0].connections[i][1] === "lives at") {connections += "<div class='connectNewBox'>Connect with a <br /><button "+buttonDisabled+" onclick='handlers.connectNeighbor("+i+","+connectCost+")'>New Neighbor ("+connectCost+" mana)</button><br />at "+people[0].connections[i][0].name+"</div>"};
				if (people[0].connections[i][1] === "works at") {connections += "<div class='connectNewBox'>Connect with a <br /><button "+buttonDisabled+" onclick='handlers.connectCoworker("+i+","+connectCost+")'>New Coworker ("+connectCost+" mana)</button><br />at "+people[0].connections[i][0].name+"</div>"};
				if (people[0].connections[i][1] === "attends") {connections += "<div class='connectNewBox'>Connect with a <br /><button "+buttonDisabled+" onclick='handlers.connectCongregant("+i+","+connectCost+")'>New Congregant ("+connectCost+" mana)</button><br />from "+people[0].connections[i][0].name+"</div>"};
				};
			};
		document.getElementById('actionConnectButtons').innerHTML = connections;
		var makeCallsButton = document.getElementById('makeCallsButton');
		var makeCallsCost = document.getElementById('makeCallsCost');
				
		// Mass Communication
		var lists = institutions[0].subscriptionLists;
		var listItem;
		document.getElementById('communicationMailingList').innerHTML = '<option disabled selected>[Select Mailing List]</option>';
		for (i in lists) {
			listItem = document.createElement('option');
			listItem.innerHTML = lists[i].name;
			listItem.value = i;
			document.getElementById('communicationMailingList').appendChild(listItem);
			};
		
		var newCommunicationList = document.getElementById('newCommunicationList');
		var editCommunicationList = document.getElementById('editCommunicationList');
		var communicationTypeCell = document.getElementById('communicationTypeCell');
		var communicationMailingList = document.getElementById('communicationMailingList');
		var communicationProgressCell = document.getElementById('communicationProgressCell');
		var communicationFundingCell = document.getElementById('communicationFundingCell');
		var communicationArticle01 = document.getElementById('communicationArticle01');
		var communicationAddArticleButton = document.getElementById('communicationAddArticleButton');
		var communicationWorkButton = document.getElementById('communicationWorkButton');
		var communicationPublishButton = document.getElementById('communicationPublishButton');
		var communicationWorkCost = document.getElementById('communicationWorkCost');
		var communicationPublishCost = document.getElementById('communicationPublishCost');
		var communicationScrapButton = document.getElementById('communicationScrapButton');
		
		// Manage Mailing Lists
		var communicationManageListsDiv = document.getElementById('communicationManageListsDiv');
		communicationManageListsDiv.innerHTML = '';
		for (i in institutions[0].subscriptionLists) {
			var listDiv = document.createElement('div');
			listDiv.className = 'listBox';
			var listTitle = document.createElement('h4');
			listTitle.className = 'listTitle';
			listTitle.innerHTML = institutions[0].subscriptionLists[i].name;
			var listIssue = document.createElement('p');
			if (institutions[0].subscriptionLists[i].issue !== undefined) {
				listIssue.innerHTML = "focusing on " + institutions[0].subscriptionLists[i].issue.name;
				listIssue.className = 'listIssue';
			} else {
				listIssue.innerHTML = "";
			};
			var listList = document.createElement('ul');
			for (s in institutions[0].subscriptionLists[i].subscribers) {
				var listItem = document.createElement('li');
				var subscriber = institutions[0].subscriptionLists[i].subscribers[s];
				listItem.innerHTML = subscriber.name.first + " " + subscriber.name.last;
				if (i > 0) {
					listItem.innerHTML += " <button onclick='handlers.removeFromList(" + i + "," + s + ")'>-</button>";
				};
				listList.appendChild(listItem);
				};
			var addSubscriberItem = document.createElement('li');
			var addSubscriberSelect = document.createElement('select');
			addSubscriberSelect.id = 'communicationAddToList'+i;
			addSubscriberSelect.setAttribute('oninput','handlers.addToList('+i+')');
			var masterSubscribers = institutions[0].subscriptionLists[0].subscribers;
			if (i > 0) {
				var headerItem = document.createElement('option');
				headerItem.disabled = true;
				headerItem.selected = true;
				headerItem.innerHTML = "Add…";
				addSubscriberSelect.appendChild(headerItem);
				for (p in masterSubscribers) {
					if (institutions[0].subscriptionLists[i].subscribers.indexOf(masterSubscribers[p]) == -1) {
						var addSubscriberOption = document.createElement('option');
						addSubscriberOption.innerHTML = "Add " + masterSubscribers[p].name.first + " " + masterSubscribers[p].name.last;
						addSubscriberOption.value = p;
						addSubscriberSelect.appendChild(addSubscriberOption);
						};
					};
				addSubscriberItem.appendChild(addSubscriberSelect);
				listList.appendChild(addSubscriberItem);
				};
			listDiv.appendChild(listTitle);
			listDiv.appendChild(listIssue);
			listDiv.appendChild(listList);
			if (i > 0) {
				var renameListField = document.createElement('p');
				renameListField.innerHTML = "<input type='text' id='communicationListRenameField"+i+"' /><button onclick='handlers.renameList("+i+")'>Rename</button>";
				listDiv.appendChild(renameListField);
				var deleteListField = document.createElement('p');
				deleteListField.innerHTML = '<button onclick="handlers.deleteList('+i+')">Delete List</button>';
				listDiv.appendChild(deleteListField);
				};
			communicationManageListsDiv.appendChild(listDiv);
			};
		var createNewListSelect = document.getElementById('createNewListSelect');
		createNewListSelect.innerHTML = '<option selected disabled>[Create New Mailing List]</option>';
		var createNewListItem;
		for (qx in people[0].issues) {
			createNewListItem = document.createElement('option');
			createNewListItem.innerHTML = "promoting " + people[0].issues[qx].name;
			createNewListItem.value = people[0].issues[qx].key;
			createNewListSelect.appendChild(createNewListItem);
			};
		
		// Event Planning
		
		//Populate Venues List
		var venues = [];
		for (i in institutions) {
			if (true) {
				venues.push({institution:i,name:institutions[i].name});
				};
			};
		venues.sort(function(a,b) {return (a.name > b.name) ? -1 : 1});
		var eventPlanVenueList = document.getElementById('eventPlanVenueList');
		eventPlanVenueList.innerHTML = '<option selected value=-1>To Be Determined…</option>';
		for (i in venues) {
			var newVenueItem = document.createElement('option');
			newVenueItem.innerHTML = venues[i].name;
			newVenueItem.value = venues[i].institution;
			eventPlanVenueList.appendChild(newVenueItem);
			};
			
		var newEventPlanList = document.getElementById('newEventPlanList');
		var editEventPlanList = document.getElementById('editEventPlanList');
		var eventPlanDateCell = document.getElementById('eventPlanDateCell');
		var eventPlanProgressCell = document.getElementById('eventPlanProgressCell');
		var eventPlanFundingCell = document.getElementById('eventPlanFundingCell');
		var eventPlanCauseList = document.getElementById('eventPlanCauseList');
		var eventPlanValueList = document.getElementById('eventPlanValueList');
		var eventPlanTargetList = document.getElementById('eventPlanTargetList');
		var eventPlanDemandList = document.getElementById('eventPlanDemandList');
		var eventPlanTypeCell = document.getElementById('eventPlanTypeCell');
		var eventPlanAmenitiesList = document.getElementById('eventPlanAmenitiesList');
		var eventPlanAddAmenitiesList = document.getElementById('eventPlanAddAmenitiesList');
		var eventPlanInviteesList = document.getElementById('eventPlanInviteesList');
		var eventPlanSponsorsList = document.getElementById('eventPlanSponsorsList');
		var eventPlanPrepButton = document.getElementById('eventPlanPrepButton');
		var eventPlanPrepCost = document.getElementById('eventPlanPrepCost');
		var eventPlanScrapButton = document.getElementById('eventPlanScrapButton');
		
		// Self Care
		var selfCareButton = document.getElementById('selfCareButton');
		var selfCareButton = document.getElementById('selfCareCost');
		var sleepButton = document.getElementById('sleepButton');
		var sleepButton = document.getElementById('sleepUntil');
		
	},
	
	addCall: function() {
		var newCall = document.getElementById('actionCalls').lastElementChild.cloneNode(true);
		var callNum = document.getElementById('actionCalls').lastElementChild.id;
		callNum = callNum.replace(/\D/g,'');
		callNum = parseInt(callNum) + 1;
		newCall.id = "call" + callNum;
		newCall.children[0].id = 'callContactList' + callNum;
		newCall.children[1].id = 'callTopicList' + callNum;
		newCall.children[2].id = 'deleteCallButton' + callNum;
		newCall.children[2].setAttribute('onclick','handlers.deleteCall('+callNum+')');
		document.getElementById('actionCalls').appendChild(newCall);
		
		if (document.getElementById('actionCalls').children.length > 1) {
			for (i=0;i<document.getElementById('actionCalls').children.length;i++) {
				document.getElementById('actionCalls').children[i].children[2].disabled = false;
				};
			};
		
		var totalCalls = document.getElementById('actionCalls').children.length;
		if (totalCalls > 4) {document.getElementById('addCallButton').disabled = true}
	},
	
	deleteCall: function(index) {
		var call = document.getElementById('call' + index);
		document.getElementById('actionCalls').removeChild(call);
		
		if (document.getElementById('actionCalls').children.length === 1) {
			document.getElementById('actionCalls').children[0].children[2].disabled = true;
			};
		
		var totalCalls = document.getElementById('actionCalls').children.length;
		if (totalCalls < 5) {document.getElementById('addCallButton').disabled = false}
	},
	
	updateDates: function() {
		var month = document.getElementById('eventPlanMonth').value;
		var dateRange = [31,28,31,30,31,30,31,31,30,31,30,31][month]
		if (document.getElementById('eventPlanYear').value % 4 == 0 && month == 1) {dateRange++};
		document.getElementById('eventPlanDate').innerHTML = '<option selected disabled>[Day]</option>';
		var dateItem;
		for (i=0;i<dateRange;i++) {
			dateItem = document.createElement('option');
			dateItem.innerHTML = i+1;
			dateItem.value = i+1;
			document.getElementById('eventPlanDate').appendChild(dateItem);
			};
	},

}