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
			contactItem.innerHTML = "<a onclick='view.displayContact(" + contacts[n][0] + ")'>" + contacts[n][1].name.first + " " + contacts[n][1].name.last + "</a>";
			contactList.appendChild(contactItem);
			}

	},
	
	displayContact: function(index) {
	
		console.log(people[index]);
		
		var contact = people[index];
		
		var name = contact.name.first + " " + contact.name.last;
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
		
		if (contact.attraction.length === 0) {
				var orientation = "Asexual";
			} else if (contact.gender.public.name === "Man" && contact.attraction[0].name === "Woman" && contact.attraction.length === 1) {
				var orientation = "Straight";
			} else if (contact.gender.public.name === "Woman" && contact.attraction[0].name === "Man" && contact.attraction.length === 1) {
				var orientation = "Straight";
			} else if (contact.attraction.length > 2) {
				var orientation = "Queer (Pansexual)";
			} else if (contact.attraction.length > 1) {
				var orientation = "Queer (Bisexual)";
			} else if (contact.gender.public.name === "Man" && contact.attraction.name === "Man") {
				var orientation = "Queer (Gay)";
			} else if (contact.gender.public.name === "Woman" && contact.attraction.name === "Woman") {
				var orientation = "Queer (Lesbian)";
			} else {
				var orientation = "Queer";
			}
		
		var home = "X";
		
		var contactName = document.getElementById('contactName');
		var contactAge = document.getElementById('contactAge');
		var contactGender = document.getElementById('contactGender');
		var contactRace = document.getElementById('contactRace');
		var contactHome = document.getElementById('contactHome');
		var contactOrientation = document.getElementById('contactOrientation');
		var contactEthnicity = document.getElementById('contactEthnicity');
		
		contactName.innerHTML = name;
		contactAge.innerHTML = age;
		contactGender.innerHTML = gender;
		contactRace.innerHTML = race;
		contactHome.innerHTML = home;
		contactOrientation.innerHTML = orientation;
		contactEthnicity.innerHTML = ethnicity;
		
		var contactAffiliations = document.getElementById('contactAffiliations');
		var contactBackstory = document.getElementById('contactStory');
		
		contactAffiliations.innerHTML = "";
		contactStory.innerHTML = '';
	
	},

}