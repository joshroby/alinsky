var view = {
	
	refreshContacts: function() {
		
		var contactList = document.getElementById("contactList");
		var contactItem;
		
		var contacts = [];
		for (n in people) {
			contacts.push([n,people[n]]);
			}
		// Change this later to 'known people'
		// Also need to alphabetize the list

		contactList.innerHTML = "";
				
		for (n in contacts) {
			contactItem = document.createElement('li');
			contactItem.innerHTML = "<a onclick='view.displayContact(" + contacts[n][0] + ")'>" + contacts[n][1].name.first + " " + contacts[n][1].name.middle.charAt(0) + ". " + contacts[n][1].name.last + "</a>";
			contactList.appendChild(contactItem);
			}

	},
	
	displayContact: function(index) {
	
		console.log(people[index]);
		
		var contact = people[index];
		
		var name = contact.name.first + " " + contact.name.middle + " " + contact.name.last;
		var age = contact.age;
		
		var race = contact.race.name;
		var ethnicity = contact.ethnicity.name;
		
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
		if (contact.resources.devotion > 2) {
				faith += " (devout)"
			} else if (contact.resources.devotion > 0) {
				faith += " (nominally)"
			} else {
				faith += " (non-practicing)"
			}
		
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
		
		var contactAffiliations = document.getElementById('contactAffiliations');
		contactAffiliations.innerHTML = "";
		
		var contactStatus = document.getElementById('contactStatus');
		var contactMoney = document.getElementById('contactMoney');
		var contactNetwork = document.getElementById('contactNetwork');
		var contactEducation = document.getElementById('contactEducation');
		
		contactStatus.innerHTML = descStatus[Math.max(0,contact.resources.status)] + " (" + contact.resources.status + ")";
		contactMoney.innerHTML = descMoney[Math.max(0,contact.resources.money)] + " (" + contact.resources.money + ")";
		contactNetwork.innerHTML = descNetwork[Math.max(0,contact.resources.network)] + " (" + contact.resources.network + ")";
		contactEducation.innerHTML = descEducation[Math.max(0,contact.resources.education)] + " (" + contact.resources.education + ")";

		var contactBackstory = document.getElementById('contactStory');
		contactStory.innerHTML = '';

		var backstories = [];
		for (n in contact.backstories) {
			backstoryItem = document.createElement('li');
			backstoryItem.innerHTML = contact.backstories[n].name;
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
		
	
	},

}