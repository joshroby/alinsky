var handlers = {

	sidebarPaneExpand: function(pane) {
		var mapPane = document.getElementById('mapPane');
		var mapBarContents = document.getElementById('mapBarContents');
		var calPane = document.getElementById('calPane');
		var calBarContents = document.getElementById('calBarContents');
		var contactPane = document.getElementById('contactPane');
		var contactBarContents = document.getElementById('contactBarContents');
		var actionPane = document.getElementById('actionPane');
		var actionBarContents = document.getElementById('actionBarContents');
		
			mapPane.style.display = 'none';
			mapBarContents.style.display = 'none';
			calPane.style.display = 'none';
			calBarContents.style.display = 'none';
			contactPane.style.display = 'none';
			contactBarContents.style.display = 'none';
			actionPane.style.display = 'none';
			actionBarContents.style.display = 'none';


		if (pane == "map") {
			mapPane.style.display = 'block';
			mapBarContents.style.display = 'block';
			}
		
		else if (pane == "cal") {
			calPane.style.display = 'block';
			calBarContents.style.display = 'block';
			}
		
		else if (pane == "contact") {
			view.refreshContacts();
			contactPane.style.display = 'block';
			contactBarContents.style.display = 'block';
			}

		else if (pane == "action") {
			actionPane.style.display = 'block';
			actionBarContents.style.display = 'block';
			}
			
	},
	
	actionPaneExpand: function(pane) {
		
		view.refreshActions();
		
		var actionOperations = document.getElementById('actionOperations');
		var actionConnect = document.getElementById('actionConnect');
		var actionMassCommunication = document.getElementById('actionMassCommunication');
		var actionEventPlanning = document.getElementById('actionEventPlanning');
		var actionDelegate = document.getElementById('actionDelegate');
		var actionResearch = document.getElementById('actionResearch');
		var actionSelfCare = document.getElementById('actionSelfCare');
		
		var actionTitle = document.getElementById('actionTitle');
		
		actionOperations.style.display = 'none';
		actionConnect.style.display = 'none';
		actionMassCommunication.style.display = 'none';
		actionEventPlanning.style.display = 'none';
		actionDelegate.style.display = 'none';
		actionResearch.style.display = 'none';
		actionSelfCare.style.display = 'none';
		
		if (pane == "actionOperations") {actionTitle.innerHTML = "Review "+institutions[0].name+" Operations";actionOperations.style.display = 'block'};
		if (pane == "actionConnect") {actionTitle.innerHTML = "One-on-Ones";actionConnect.style.display = 'block'};
		if (pane == "actionMassCommunication") {actionTitle.innerHTML = "Mass Communication";actionMassCommunication.style.display = 'block'};
		if (pane == "actionEventPlanning") {actionTitle.innerHTML = "Event Planning";actionEventPlanning.style.display = 'block'};
		if (pane == "actionDelegate") {actionTitle.innerHTML = "Delegate";actionDelegate.style.display = 'block'};
		if (pane == "actionResearch") {actionTitle.innerHTML = "Research";actionResearch.style.display = 'block'};
		if (pane == "actionSelfCare") {actionTitle.innerHTML = "Self Care";actionSelfCare.style.display = 'block'};
			
	},
	
	displayContact: function(index) {
		var contact = people[index];
		view.displayContact(contact);
	},
	
	displayNeighborhood: function(index) {
		var neighborhood = neighborhoods[index];
		view.displayNeighborhood(neighborhood);
	},
	
	displayInstitution: function(index) {
		var institution = view.focus.neighborhood.institutions[index];
		view.displayInstitution(institution);
	},
	
	displayDate: function(date) {
		view.displayDate(date);
		handlers.sidebarPaneExpand("cal");
	},
	
	jumpToInstitution: function(index) {
		var institution = view.focus.contact.connections[index][0];
		view.displayNeighborhood(institution.neighborhood);
		view.displayInstitution(institution);
		handlers.sidebarPaneExpand("map");
	},
	
	jumpToPerson: function(index) {
		var contact = people[index];
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},
	
	jumpToClient: function(index) {
		var contact = view.focus.institution.clients[index][0];
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},
	
	jumpToEmployee: function(index) {
		var contact = view.focus.institution.employees.all[index];
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
	},

	newPerson: function() {
		var newGuy = new Person();
		newGuy.growUp();
		newGuy.findHousing();
		newGuy.findJob();
		if (newGuy.resources.devotion > 1) {newGuy.findChurch()};
		view.refreshContacts();
		handlers.jumpToPerson(people.length-1);
		view.refreshActions();
	},

	newNeighborhood: function() {
		var newNeighborhood = new Neighborhood();
		view.focus.neighborhood = newNeighborhood;
		view.refreshMap();
		view.displayNeighborhood(newNeighborhood);
	},

	newInstitution: function() {
		var newInstitution = new Institution(view.focus.neighborhood);
		view.refreshMap();
		view.displayNeighborhood(view.focus.neighborhood);
		view.displayInstitution(newInstitution);
		view.refreshActions();
	},
	
	newClient: function() {
		view.focus.institution.newClient();
		view.displayInstitution(view.focus.institution);
		view.refreshActions();
	},
	
	newEmployee: function(level) {
		view.focus.institution.newEmployee(level);
		view.displayInstitution(view.focus.institution);
		view.refreshActions();
	},
	
	renameOrganization: function() {
		var newName = document.getElementById('organizationRenameField').value;
		institutions[0].rename(newName);
		view.refreshActions();
		view.displayNeighborhood(institutions[0].neighborhood);
		view.displayInstitution(institutions[0]);
	},
	
	connectNeighbor: function(index,manaCost) {
		document.getElementById('resultsLast').innerHTML = '';
		var institution = people[0].connections[index][0];
		var contact = institution.newClient();
		people[0].currencies.mana -= manaCost;
		gameLog.add("connect","You connect with a neighbor, " + contact.name.first + " " + contact.name.last + ", who you didn't know very well.",true,this);
		contact.revealBackstory('connect');
		view.refreshHeader();
		view.refreshActions();
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
		handlers.showResultsLast();
		handlers.showResultsTray();
	},
	
	connectCoworker: function(index,manaCost) {
		document.getElementById('resultsLast').innerHTML = '';
		var institution = people[0].connections[index][0];
		var contact = institution.newEmployee();
		people[0].currencies.mana -= manaCost;
		gameLog.add("connect","You connect with a coworker, " + contact.name.first + " " + contact.name.last + ", who you didn't know very well.",true,this);
		contact.revealBackstory('connect');
		view.refreshHeader();
		view.refreshActions();
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
		handlers.showResultsLast();
		handlers.showResultsTray();
	},
	
	connectCongregant: function(index,manaCost) {
		document.getElementById('resultsLast').innerHTML = '';
		var institution = people[0].connections[index][0];
		var contact = institution.newClient();
		people[0].currencies.mana -= manaCost;
		gameLog.add("connect","You connect with a congregant, " + contact.name.first + " " + contact.name.last + ", who you didn't know very well.",true,this);
		contact.revealBackstory('connect');
		view.refreshHeader();
		view.refreshActions();
		view.displayContact(contact);
		handlers.sidebarPaneExpand("contact");
		handlers.showResultsLast();
		handlers.showResultsTray();
	},
	
	interpretDemand: function(topic,topicText) {
		var type = topic.split(' ')[0];
		if (type === "subscribe") {
			var subject = [institutions[0].subscriptionLists[0],institutions[0].subscriptionLists[topic.split(' ')[1]]];
			if (subject[1].issue !== undefined) {cause = subject[1].issue};
		} else if (type === "donate") {
			var subject = institutions[0];
		} else if (type === "attend") {
			var eventDate = topic.split(' ')[1].slice(0,8);
			var eventIndex = topic.split(' ')[1].slice(-1);
			var subject = events[eventDate][eventIndex];
			cause = subject.demand.cause;
		} else if (type === "sponsor") {
			var eventDate = topic.split(' ')[1].slice(0,8);
			var eventIndex = topic.split(' ')[1].slice(-1);
			cause = events[eventDate][eventIndex].demand.cause;
			var sponsor = institutions[topic.split(' ')[2]];
			if (sponsor == undefined) {sponsor = undefined};
			var subject = [sponsor,events[eventDate][eventIndex]]
		} else if (type === "employment") {
		} else if (type === "alliance") {
		}
		return [type,subject,cause];
	},
	
	goVisit: function() {
		document.getElementById('resultsLast').innerHTML = '';
		var cause = dataIssues[institutions[0].highestCauseReputation()];
		var target = people[document.getElementById('visitContactList').value];
		var appeal = target.highestValue();
		var visitTopicList = document.getElementById('visitTopicList');
		var topic = visitTopicList.value;
		var topicText = visitTopicList[visitTopicList.selectedIndex].text;
		var interprettedDemand = handlers.interpretDemand(topic,topicText);
		var type = interprettedDemand[0];
		var subject = interprettedDemand[1];
		var cause = interprettedDemand[2];
		var visitDemand = lookupDemand(type,subject,cause);
		var visit = new Call(visitDemand,appeal,target,institutions[0]);
		
		var text = "You visit " + target.name.first + " " + target.name.last + " and ask them to " + topicText + ".";
		text += " The conversation tends towards <strong>" + appeal + "</strong>, and you make your appeal on those grounds."; 
		if (cause === dataIssues.playerReputation) {
			text += " Since " + institutions[0].name + " has no reputation for any cause, you have only your good name to stand on."
		} else {
			text += "You talk extensively about " + cause.name + ".";
			};
		gameLog.add("visit",text,true,target);
		target.revealBackstory('visit');
		
		console.log(visit);
		target.reception(visit);
		
		handlers.showResultsLast();
		handlers.showResultsTray();
		advanceClock();
	},
	
	makeCalls: function() {
		document.getElementById('resultsLast').innerHTML = '';
		for (c=0;c<document.getElementById('actionCalls').children.length;c++) {
			var target = people[document.getElementById('actionCalls').children[c].children[0].value];
			console.log(target);
			var appeal = target.highestValue();
			var caller = institutions[0];
			var callTopicList = document.getElementById('actionCalls').children[c].children[1];
			console.log("call",c);
			var topic = callTopicList.value;
			var topicText = callTopicList[callTopicList.selectedIndex].text;
			var interprettedDemand = handlers.interpretDemand(topic,topicText);
			var type = interprettedDemand[0];
			var subject = interprettedDemand[1];
			var cause = interprettedDemand[2];
			var callDemand = lookupDemand(type,subject,cause);
			var call = new Call(callDemand,appeal,target,caller);
			
			var text = "You call " + target.name.first + " " + target.name.last + " and ask them to " +topicText + ".";
			text += " The conversation tends towards <strong>" + appeal + "</strong>, and you make your appeal on those grounds."; 
			if (cause === dataIssues.playerReputation) {
				text += " Since " + institutions[0].name + " has no reputation for any cause, you have only your good name to stand on."
			} else {
				text += "You talk extensively about " + cause.name + ".";
				};
			gameLog.add("call",text,true,target);
			target.revealBackstory('call');
	
			target.reception(call);
			
			handlers.showResultsLast();
			handlers.showResultsTray();
			advanceClock();
		}
	},
	
	addCall: function() {
		view.addCall();
	},
	
	deleteCall: function(index) {
		view.deleteCall(index);
	},
	
	addArticle: function() {
		view.addArticle();
		view.updateMassComm();
	},
	
	deleteArticle: function(index) {
		view.deleteArticle(index);
		view.updateMassComm();
	},
	
	updateMassComm: function() {
		view.updateMassComm();
	},
	
	loadMassComm: function() {
		view.loadMassComm();
		view.updateMassComm();
	},
	
	workOnMassComm: function() {
		var draft = view.focus.draft;
		if (draft === undefined) {
			var type = dataCommunications[document.getElementById('communicationTypeList').value];
			var draft = new Communication(type,[],institutions[0])
			view.focus.draft = draft;
		}
		if (draft.title === undefined && document.getElementById('titleInput').value !== 'Title your communication here') {
			draft.title = document.getElementById('titleInput').value;
		} else if (draft.title === undefined) {
			draft.title = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][gameDate.getMonth()] + " " + gameDate.getDate() + " " + gameDate.getHours() + "00 Draft";
		};
		draft.articles = [];
		for (a=2;a<document.getElementById('massCommTable').children[0].children.length;a++) {
			var cause = dataIssues[document.getElementById('massCommTable').children[0].children[a].children[1].children[0].value];
			var appeal = document.getElementById('massCommTable').children[0].children[a].children[3].children[0].value;
			var target = document.getElementById('massCommTable').children[0].children[a].children[5].children[0].value;
			
			var articleTopicList = document.getElementById('massCommTable').children[0].children[a].children[7].children[0];
			var topic = articleTopicList.value;
			var topicText = articleTopicList[articleTopicList.selectedIndex].text;
			var interprettedDemand = handlers.interpretDemand(topic,topicText);
			var type = interprettedDemand[0];
			var subject = interprettedDemand[1];
			var articleDemand = lookupDemand(type,subject,cause);
			
			var article = new Article(articleDemand,appeal,target,cause,institutions[0]);
			draft.articles.push(article);
			console.log('article:',a,article);
			};
		draft.audience = document.getElementById('communicationMailingList').value;
		draft.progress += 4;
		people[0].currencies.mana -= document.getElementById('communicationWorkManaCost').innerHTML;
		advanceClock();
		view.updateMassComm();
	},
	
	publishMassComm: function() {
		var publication = view.focus.draft;
		console.log(publication);
		
		publication.audience = institutions[0].subscriptionLists[document.getElementById('communicationMailingList').value].subscribers;
		
		document.getElementById('resultsLast').innerHTML = '';
		var text = "You publish the " + publication.title + " " + publication.type.name + ".";
		gameLog.add("publish",text,true,people[0]);
		
		if (publication.type.indirect) {
			if (publication.type.name = "Press Release") {
				// Does the media pick it up?  If so, media-ness.
				gameLog.add("press","No one picks up the story, because Media isn't implemented yet.",true);
			} else if (publication.type.name = "Open Letter") {
				// Does the target see the letter? If so, target.reception()
				gameLog.add("file","It is seen by "+publication.audience.length+" people and filed.",true,institutions[0]);
			} else if (publication.type.name = "Report") {
				gameLog.add("file","It is seen by "+publication.audience.length+" people and filed.",true,institutions[0]);
			};
			for (a in publication.articles) {
				institutions[0].gainReputation(publication.articles[a].issue.key,publication.type.reputationGain,publication.type.reputationCeiling)
				};
		} else {
			for (art in publication.articles) {
				var articleNumber = art;
				articleNumber = parseInt(articleNumber)+1;
				text = "In article #" + articleNumber + ", you ask them to " + publication.articles[art].demand.type + ":";
				gameLog.add("publish",text,true,institutions[0]);
					for (i in publication.audience) {
						publication.audience[i].reception(publication.articles[art]);
					};
				institutions[0].gainReputation(publication.articles[art].issue.key,publication.type.reputationGain,publication.type.reputationCeiling)
				};
			};
		
		// remove draft from drafts array
		drafts.splice(drafts.indexOf(publication),1);
		document.getElementById('editCommunicationList').value = -1;
		view.loadMassComm();
		view.updateMassComm();
			
		people[0].currencies.mana -= document.getElementById('communicationPublishManaSpan').innerHTML;
		institutions[0].currencies.cash -= document.getElementById('communicationPublishCostSpan').innerHTML;
		if (institutions[0].currencies.cash < 0) {
			people[0].currencies.cash += institutions[0].currencies.cash;
			institutions[0].currencies.cash = 0;
			};
		advanceClock();
			
		handlers.showResultsLast();
		handlers.showResultsTray();
	},
	
	newList: function() {
		var createNewListSelect = document.getElementById('createNewListSelect');
		console.log(createNewListSelect.value);
		if (createNewListSelect !== null) {
			institutions[0].newList(undefined,dataIssues[createNewListSelect.value]);
			view.refreshActions();
			};

	},
	
	renameList: function(list) {
		var newName = document.getElementById('communicationListRenameField'+list).value;
		institutions[0].renameList(list,newName);
		view.refreshActions();
	},
	
	addToList: function(list) {
		var subscriber = document.getElementById('communicationAddToList'+list).value;
		institutions[0].addToList(list,subscriber);
		view.refreshActions();
	},
	
	removeFromList: function(list,subscriber) {
		institutions[0].removeFromList(list,subscriber);
		view.refreshActions();
	},
	
	deleteList: function(list) {
		institutions[0].deleteList(list);
		view.refreshActions();
	},
	
	loadEvent: function() {
		var eventCode = document.getElementById('editEventPlanList').value;
		eventCode = eventCode.replace(/\D/g,'');
		var eventDate = eventCode.substring(0,eventCode.length -1);
		var eventIndex = eventCode.substring(eventCode.length-1);
		var event = events[eventDate][eventIndex];
		view.loadEvent(event);
	},
	
	addAmenity: function() {
		var amenity = document.getElementById('eventPlanAddAmenitiesList').value;
		view.addAmenity(amenity);
		view.updateEventProgress();
	},
	
	deleteAmenity: function(amenity) {
		view.deleteAmenity(amenity);
		view.updateEventProgress();
	},
	
	updateDates: function() {
		view.updateDates();
	},
	
	prepEvent: function() {
		console.log("Prep!");
	},
	
	selfCare: function() {
		var cost = document.getElementById('selfCareCost').innerHTML;
		people[0].selfCare(cost);
		view.refreshActions();
	},
	
	sleep: function() {
		var wake = document.getElementById('sleepUntil').innerHTML;
		var timeOfDay = wake.slice(-2);
		wake = parseInt(wake.substring(0,wake.length-2));
		if (timeOfDay === "pm") {wake += 12}
		people[0].sleep(wake);
		view.refreshActions();
	},
	
	showResultsTray: function() {
		var resultsTray = document.getElementById('resultsTray');
		resultsTray.style.display = 'block';
	},
	
	hideResultsTray: function() {
		var resutlsTray = document.getElementById('resultsTray');
		resutlsTray.style.display = 'none';
	},
	
	showResultsHistory: function () {
		document.getElementById('resultsLast').style.display = 'none';
		document.getElementById('resultsHistory').style.display = 'block';
	},
	
	showResultsLast: function () {
		document.getElementById('resultsHistory').style.display = 'none';
		document.getElementById('resultsLast').style.display = 'block';
	},
}

window.onclick = function(event) {
	var resultsTray = document.getElementById('resultsTray');
	if (event.target == resultsTray) {
		resultsTray.style.display = 'none';
	};
}