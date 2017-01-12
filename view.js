// window.onbeforeunload = function() { return "Going back will erase your current community."; };

var view = {

	focus: {
		neighborhood: '',
		institution: '',
		person: '',
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
				var gender = "Transgender " + contact.gender.identity.name + " (Publicly, a " + contact.gender.public.name + ")";
			}
		
		if (contact.orientation.attraction.length === 0) {
				var orientation = "Asexual";
			} else if (contact.gender.public.name === "Man" && contact.orientation.attraction[0].name === "Woman" && contact.orientation.attraction.length === 1) {
				var orientation = "Straight";
			} else if (contact.gender.public.name === "Woman" && contact.orientation.attraction[0].name === "Man" && contact.orientation.attraction.length === 1) {
				var orientation = "Straight";
			} else if (contact.orientation.attraction.length > 2) {
				var orientation = "Queer (Pansexual)";
			} else if (contact.orientation.attraction.length > 1) {
				var orientation = "Queer (Bisexual)";
			} else if (contact.gender.public.name === "Man" && contact.orientation.attraction[0].name === "Man") {
				var orientation = "Queer (Gay)";
			} else if (contact.gender.public.name === "Woman" && contact.orientation.attraction[0].name === "Woman") {
				var orientation = "Queer (Lesbian)";
			} else {
				var orientation = "Queer";
			}
		
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
			var person = contact;
			issueStrength = contact.issues[n].value(contact);
			issuesItem = document.createElement('li');
			issuesItem.innerHTML =  contact.issues[n].name + " [" + issueStrength + "]";
			issuesList.appendChild(issuesItem);
			}
			
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
		neighborhoodStatusCell.innerHTML = neighborhood.demographics.status;
		neighborhoodMoneyCell.innerHTML = neighborhood.demographics.money;
		
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
		var institutionTypicalClientsCell = document.getElementById('institutionTypicalClientsCell');
		var institutionTypicalEmployeesCell = document.getElementById('institutionTypicalEmployeesCell');
		var institutionCapacityCell = document.getElementById('institutionCapacityCell');
		var institutionUnionsCell = document.getElementById('institutionUnionsCell');
		var institutionClientsList = document.getElementById('institutionClientsList');
		var institutionEmployeesList = document.getElementById('institutionEmployeesList');
		var institutionClientsHead = document.getElementById('institutionClientsHead');
		var institutionEmployeesHead = document.getElementById('institutionEmployeesHead');
		
		institutionName.innerHTML = institution.name;
		institutionStatusCell.innerHTML = institution.status;
		institutionPaygradeCell.innerHTML = institution.paygrade.unskilled + " / " + institution.paygrade.skilled + " / " + institution.paygrade.management + " / " + institution.paygrade.executive;
		institutionCapacityCell.innerHTML = institution.capacity;
		institutionUnionsCell.innerHTML = 'TK';
		
		var typicalClienteleText = '';
		if (institution.typicalClientele.faiths === undefined && institution.typicalClientele.genders === undefined && institution.typicalClientele.orientation === undefined && institution.typicalClientele.ethnicities[0] === undefined) {
			typicalClienteleText = 'various';
			}
		if (institution.typicalClientele.orientation !== undefined) {
			typicalClienteleText += ' ' + institution.typicalClientele.orientation;
			}
		if (institution.typicalClientele.faiths !== undefined && institution.typicalClientele.genders !== undefined) {
			for (i in institution.typicalClientele.faiths) {
				typicalClienteleText += ' ' + institution.typicalClientele.faiths[i].denonyms[0];
				if (i == institution.typicalClientele.faiths.length-2) {
					typicalClienteleText += " and";
					}
				}
			}
		if (institution.typicalClientele.ethnicities !== undefined && institution.typicalClientele.ethnicities[0] !== undefined) {
			for (i in institution.typicalClientele.ethnicities) {
				typicalClienteleText += ' ' + institution.typicalClientele.ethnicities[i].name;
				if (i == institution.typicalClientele.ethnicities.length-2) {
					typicalClienteleText += " and";
					}
				}
			}
		if (institution.typicalClientele.race !== undefined) {
			typicalClienteleText += " ("+institution.typicalClientele.race.name+")";
			}	
		if (institution.typicalClientele.genders !== undefined) {
			for (i in institution.typicalClientele.genders) {
				typicalClienteleText += ' ' + institution.typicalClientele.genders[i].plural;
				if (i == institution.typicalClientele.genders.length-2) {
					typicalClienteleText += " and";
					}
				}
			} else if (institution.typicalClientele.faiths !== undefined) {
				for (i in institution.typicalClientele.faiths) {
					typicalClienteleText += ' ' + institution.typicalClientele.faiths[i].denonyms[1];
				if (i == institution.typicalClientele.faiths.length-2) {
					typicalClienteleText += " and";
					}
					}
			} else {
				typicalClienteleText += " people";
			}
		institutionTypicalClientsCell.innerHTML = typicalClienteleText;
		
		var typicalEmployeesText = '';
		for (i in institution.typicalEmployees) {
				if (institution.typicalEmployees[i].orientation !== undefined) {
					typicalEmployeesText += institution.typicalEmployees[i].orientation + " ";
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

}

