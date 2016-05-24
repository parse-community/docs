/* global Parse */
/* global console */
/* global gitJson */

//after page load
$(document).ready(function(){
	"use strict";
	   //====================================//
	  //  Use Jekyll Metadata to list the repos
	 // (except for community repos)
	//====================================//
	var totalStars = 0,
		totalForks = 0,
		totalRepos = 0;

	//render repo to page
	function addToSection(sectionTitle, url, title, description, forks, stars, language){
		sectionTitle.append("<tr class='repoList'><td><a href='" + url + "' target='_blank'><h4>" + title + "</h4><p class='repoDescription'>" + description + "</p></td><td class='language metadata'>" + language + "</a></td><td class='metadata'><img src='img/starsDark.svg' alt='' class='icon'>" + stars + "</td><td class='metadata'><img src='img/forksDark.svg' alt='' class='icon'>" + forks + "</td></tr>");
	}

	if (typeof gitJson !== 'undefined'){
		for (var j = 0; j < gitJson.length; j++) {
			var title 			= gitJson[j].name,
				sortTitle 		= title.toLowerCase(),
				url 			= gitJson[j].html_url,
				hasIssues 		= gitJson[j].has_issues,
				description 	= gitJson[j].description,
				stars 			= parseInt(gitJson[j].stargazers_count),
				forks 			= parseInt(gitJson[j].forks_count),
				language    	= gitJson[j].language,
				sortDescription = "";

			// sortable description
			if (description !== null && description !== ""){
				sortDescription = description.toLowerCase();
			}

			//clean up language titles
			if (language !== null && language !== ""){
				var sortLanguage = language.toLowerCase();
				if (sortLanguage === "javascript"){
					language = "JS";
				} else if (sortLanguage === "objective-c"){
					language = "Obj-C";
				} if (sortLanguage === "null"){
					language = "";
				}
			} else if (language === null || language === ""){
				language = "";
			}

			//keep tally of total forks, stars and repos
			totalRepos++;
			totalStars = totalStars + stars;
			totalForks = totalForks + forks;

			//Sort SDK Repos
			//if title contains sdk hide it (since we hardcode them)
			if (sortTitle.indexOf("sdk") >= 0 || sortTitle.indexOf("cli") >= 0) {
				//if title matches hardcoded repo title then use these forks/stars
				if (sortTitle.includes("ios") === true){
					//ios stars/forks
					$(".iosRepo .sdkRepoStar").text(stars);
					$(".iosRepo .sdkRepoFork").text(forks);
				} else if (sortTitle.includes("android") === true){
					$(".androidRepo .sdkRepoStar").text(stars);
					$(".androidRepo .sdkRepoFork").text(forks);
				} else if (sortTitle.includes("javascript") === true || sortTitle.includes("js") === true){
					$(".javascriptRepo .sdkRepoStar").text(stars);
					$(".javascriptRepo .sdkRepoFork").text(forks);
				} else if (sortTitle.includes("php") === true){
					$(".phpRepo .sdkRepoStar").text(stars);
					$(".phpRepo .sdkRepoFork").text(forks);
				} else if (sortTitle.includes("net") === true){
					//xamarin and dot net
					$(".xamarinRepo .sdkRepoStar").text(stars);
					$(".xamarinRepo .sdkRepoFork").text(forks);

					//Unity
					$(".unityRepo .sdkRepoStar").text(stars);
					$(".unityRepo .sdkRepoFork").text(forks);
				} else if (sortTitle.includes("arduino") === true){
					$(".arduinoRepo .sdkRepoStar").text(stars);
					$(".arduinoRepo .sdkRepoFork").text(forks);
				} else if (sortTitle.includes("embedded") === true){
					$(".embeddedRepo .sdkRepoStar").text(stars);
					$(".embeddedRepo .sdkRepoFork").text(forks);
				} else if (sortTitle.includes("cli") === true){
					$(".cloudCodeRepo .sdkRepoStar").text(stars);
					$(".cloudCodeRepo .sdkRepoFork").text(forks);
				}
				continue;
			}

			//ignore repos with issues turned off
			if (hasIssues === false){
				continue;
			}

			//Sort non-SDK repos into categories

			//SOCIAL CATEGORY
			//  if name includes facebook, twitter
			if (sortTitle.includes("facebook") === true || sortTitle.includes("twitter") === true){
				//write them to the page
				addToSection($("section.socialRepos table"), url, title, description, forks, stars, language);
			//TUTORIALS CATEGORY
			//  if name tutorial
			} else if (sortTitle.includes("tutorial") === true || sortDescription.includes("tutorial")){
				//write them to the page
				addToSection($("section.tutorials table"), url, title, description, forks, stars, language);
			//PARSE SERVER CATEGORY
			//  if name parse-server, parse-dashboard
		} else if (sortTitle.includes("parse-server") === true || sortDescription.includes("parse-dashboard")){
				//write them to the page
				addToSection($("section.parseServer table"), url, title, description, forks, stars, language);
			//SAMPLES CATEGORY
			//  if name todo, demo, any, scrumptious, store, f8, internetcar
			} else if (sortTitle.includes("todo") === true || sortTitle.includes("demo") === true || sortTitle.includes("any") === true || sortTitle.includes("store") === true || sortTitle.includes("f8") === true || sortTitle.includes("internetcar") === true || sortDescription.includes("example") || sortDescription.includes("sample")){
				//write them to the page
				addToSection($("section.sampleApps table"), url, title, description, forks, stars, language);
			//OTHER CATEGORY
			//   ...everything else
			} else {
				//write them to the page
				addToSection($("section.other table"), url, title, description, forks, stars, language);
			}
		}
	}

	//write total forks, stars and repos into the page
	$(".heroText .repoCount").text(totalRepos);
	$(".heroText .starCount").text(totalStars);
	$(".heroText .forkCount").text(totalForks);

	  //====================================//
	 //  expand/contract
	//====================================//
	$(".expandableRepoLink").click(function(){
		var clicked = $(this);
		$(".expandableRepoLink").not(clicked).removeClass("expanded");
		clicked.toggleClass("expanded");
	});

	  //====================================//
	 //  Header animation
	//====================================//
	var browserHeight 		= $(window).height(),
		browserWidth 		= $(window).width();

	//recalc sizes on browser resize
	$(window).resize(function(){
		browserHeight 	= $(window).height();
		browserWidth 	= $(window).width();
	});

	function headerAnimation(){
		  //
		 // Phone 1 (Left)
		//
		//move line down to grab video
		$(".craneLine").velocity({
			translateY: [0, "-25%"],
		}, { queue: false, duration: 600, easing: [ 0.4, 0, 0.2, 1 ], complete: function(){
			//move line up and right to follow video
			$(".craneLine").velocity({
				translateX: ["13%", 0],
				translateY: ["-14.8%", 0]
			}, { queue: false, duration: 600, delay: 200, easing: [ 0.4, 0, 0.2, 1 ] });
			//move anchor pivot right
			$(".cranePivot").velocity({
				translateX: ["13%", 0]
			}, { queue: false, duration: 600, delay: 200, easing: [ 0.4, 0, 0.2, 1 ] });
			//move line + video onto the phone
			$(".craneVideo").velocity({
				translateY: ["-14.8%", 0],
				translateX: ["13.4%", 0]
			}, { queue: false, duration: 600, delay: 200, easing: [ 0.4, 0, 0.2, 1 ], complete: function(){
				//move the line back up away from phone
				$(".craneLine").velocity({
					translateY: ["-30%", "-14.8%"],
				}, { queue: false, duration: 800, easing: [ 0.4, 0, 0.2, 1 ] });
				//fade + animate in apps
				var rectApps = $(".appRect"),
					pathApps = $(".appSquare");
				for (var p = 0; p < pathApps.length; p++) {
					pathApps.eq(p).velocity({
						opacity: 1,
						scale: [1, 0.45],
						translateY: 0,
						rotateZ: [0, "90deg"]
					}, { queue: false, duration: 600, delay: 100 * p + 400, easing: [ 0.175, 0.885, 0.320, 1.275 ] });
				}
				for (var r = 0; r < rectApps.length; r++) {
					rectApps.eq(r).velocity({
						opacity: 1,
						scale: [1, 0.45],
						translateY: 0,
						rotateZ: 0
					}, { queue: false, duration: 600, delay: ((100 * r) + (100 * p) + 400), easing: [ 0.175, 0.885, 0.320, 1.275 ] });
				}
				//turn screen on
				$(".phone1ScreenContainer").velocity({
					backgroundColor: "#EF3F61"
				}, { queue: false, duration: 600, easing: [ 0.4, 0, 0.2, 1 ] });
			} });
		} });

		  //
		 // Phone 2 (Center)
		//
		//move middle line to grab push icon
		var pushIconTranslate = "-" + ($(".middleLineOne").height() / $(".pushOne").height() * 100) + "%";
		$(".middleLineOne").velocity({
			translateY: [0, "-105%"],
		}, { queue: false, duration: 1200, delay: 800, easing: [ 300, 28 ], complete: function(){
			//rotate the push icon and pull it up
			$(".pushOne").velocity({
				translateY: [pushIconTranslate, 0]
			}, { queue: false, duration: 800, easing: [ 0.4, 0, 0.2, 1 ] })
			//rotate push icon
			.velocity({
				rotateZ: ["12deg", "0deg"],
			}, { queue: false, duration: 300, easing: [ 0.4, 0, 0.2, 1 ] });
			//lift the line back up
			$(".middleLineOne").velocity({
				translateY: ["-100%", 0],
			}, { queue: false, duration: 800, easing: [ 0.4, 0, 0.2, 1 ], complete: function(){
				//put the icon on the phone screen
				$(".middleLine2, .push2").velocity({
					y: [0, "-125%"],
				}, { queue: false, duration: 1000, delay: 200, easing: [ 300, 28 ], complete: function(){
					//pull the line back up
					$(".middleLine2").velocity({
						y: ["-125%", 0],
					}, { queue: false, duration: 1000, delay: 200, easing: [ 300, 28 ] });
					//turn phone screen on
					$(".phone2Screen .phoneCircle").velocity({
						scale: [1, 0]
					}, { queue: false, duration: 350, easing: [ 0.25, 0.46, 0.45, 0.94 ] });
					$(".phone2Screen").velocity({
						backgroundColor: "#4BBC6E"
					}, { queue: false, duration: 150, delay: 200, easing: [ 0.4, 0, 0.2, 1 ] });
					//change icon color
					$(".push2 path").velocity({
						fill: "#40a05b"
					}, { queue: false, duration: 200, easing: [ 0.4, 0, 0.2, 1 ] });
				} });
			} });
		} });

		  //
		 // Phone 3 (Right)
		//
		//preset the scale of the hoist so velocity doesn't overwrite
		function setupScale(){
			var scaleRatio = 1;
			if (browserWidth >= 1480){
				scaleRatio = 0.75;
				$(".wheelsContainer, .hoist, .hoistParts").velocity({
					scale: 		[scaleRatio, scaleRatio]
				}, { queue: false, duration: 0 });
			} else {
				$(".wheelsContainer, .hoist, .hoistParts").velocity({
					scale: 		[scaleRatio, scaleRatio]
				}, { queue: false, duration: 0 });
			}
		}
		$(window).resize(function(){
			setupScale();
		});
		setupScale();

		//move wheels with the hoist
		$(".wheelsContainer").velocity({
			translateX: [0, "100%"],
		}, { queue: false, duration: 4400, easing: [0.39, 0.575, 0.565, 1] });
		//drive in the hoist
		$(".hoist, .hoistParts").velocity({
			translateX: [0, "100%"],
		}, { queue: false, duration: 4400, easing: [0.39, 0.575, 0.565, 1], complete: function(){
			//turn screen on
			$(".phone3Screen .phoneCircle").velocity({
				scale: [1, 0]
			}, { queue: false, duration: 350, easing: [ 0.25, 0.46, 0.45, 0.94 ] });
			$(".phone3Screen").velocity({
				backgroundColor: "#555574"
			}, { queue: false, duration: 150, delay: 200, easing: [ 0.4, 0, 0.2, 1 ] });
			$(".analytics path").velocity({
				fill: "#3A3A59"
			}, { queue: false, duration: 200, easing: [ 0.4, 0, 0.2, 1 ] });

			//lift hoist line up
			$(".hoistLineInner").velocity({
				y: ["-22%", 0]
			}, { queue: false, duration: 800, easing: [ 0.4, 0, 0.2, 1 ] });

		}, begin: function(){
			//turn hoist wheels
			$(".hoistWheel").velocity({
				rotateZ: ["-=720deg"],
			}, { queue: false, duration: 4400, easing: [0.39, 0.575, 0.565, 1]});
		} });
	}
	//fix vw/vh units on mobile safari and old browsers
	function fixVH(){
		var rightWidth = $("img.headerRight").width();
		var leftWidth = $("img.headerLeft").width();
		var centerWidth = $("img.headerCenter").width();
		$(".headerRightContainer").css({"width": rightWidth + "px"});
		$(".headerLeftContainer").css({"width": leftWidth + "px"});
		$(".headerCenterContainer").css({"width": centerWidth + "px"});
	}

	fixVH();
	$(window).load(function(){
		fixVH();
		headerAnimation();
	});

	$(window).resize(function(){
		fixVH();
	});

	  //====================================//
	 // Main Scrolling Events
	//====================================//
	var scrollwheelActive = 0,
		lastScrollPosition,
		navindicatorTimeout = false;
	function scrollAnimation(){
		//variables
		var scrolled 		= $(window).scrollTop();

		//don't recalculate if not scrolling
		if (lastScrollPosition === scrolled) {
			return false;
		} else {

			//update last position when scrolling
			lastScrollPosition = scrolled;

			//parallax header
			var headerheight = $(".header").height();
			if (scrolled >= 0 && scrolled <= browserHeight && browserWidth > 960){
				$(".heroText").css({
					'transform': 'translateY(-' + (scrolled / 1.6) + 'px)',
					'opacity': 1 - (scrolled / headerheight)
				});
				$(".skyline").css({
					'transform': 'translateY(' + (scrolled * 0.135) + 'px)',
				});
			}

			//secondary nav stick/unstick
			var secondaryNav = $(".secondaryNav");
			if (scrolled >= $(".header").height()){
				secondaryNav.addClass("shown");
			} else{
				secondaryNav.removeClass("shown");
			}

			//secondary nav indicators
			var section = $("section");
			for (var s = 0; s < section.length; s++) {
				var sectionTopPos = section.eq(s).offset().top,
					sectionHeight = section.eq(s).height();
				if (scrolled > (sectionTopPos - 64) && scrolled < (sectionTopPos + sectionHeight - 64) && navindicatorTimeout === false){
					$(".secondaryNav ul a").removeClass("active");
					$(".secondaryNav ul a").eq(s).addClass("active");
				}
			}

	    }
	}

	// Call the loop to execute scroll events
	$(window).on('mousewheel', function() {
		scrollAnimation();
		scrollwheelActive = 1;

		//timer to avoid more scroll functions if mousewheel event is already being used
		clearTimeout($.data(this, 'timer'));
		$.data(this, 'timer', setTimeout(function() {
		    //not using the scrollwheel anymore to scroll
		    scrollwheelActive = 0;
		}, 100));
	})

	//for non-scrollwheel
	.scroll(function(){
		//only run if scrollwheel isn't being used
		if (scrollwheelActive === 1){
			return false;
		} else{
			scrollAnimation();
		}
	});

	  //====================================//
	 // Anchor Tags Scroll the Page instead of Jump
	//====================================//
	$('a[href*=#]:not([href=#])').click(function() {
	 	var clicked = $(this),
	 		element = clicked.attr("href");
	    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
	      	$(element).velocity("scroll", { duration: 600, easing: [ 0.4, 0, 0.2, 1 ], begin: function(){
	      		//change indicator color
	      		$(".secondaryNav ul a").removeClass("active");
	      		clicked.addClass("active");
	      		//disable indicator changing from scrolling
	      		navindicatorTimeout = true;
	      	}, complete: function(){
	      		//renable indicator changing from scrolling
	      		navindicatorTimeout = false;
	      	} });
	    }
	});

	  //====================================//
	 // Community projects, listed at the bottom
	//====================================//
	//add new repo to the HTML
	function addCommunityRepoToHTML(title, description, url){
		$("section.community").append("<div class='repo'><div class='repoTitle'><h4>" + title + "</h4></div><div class='repoDescription'><p>" + description + "</p></div><div class='repoButton'><a href=" + url + " target='_blank'><button class='outline'>View on GitHub</button></a></div></div>");
	}

	var communityRepos = [{
		title: "Bolts Android",
		description: "Collection of low-level libraries to make developing mobile apps easier.",
		url: "https://github.com/BoltsFramework/Bolts-Android"
	},{
		title: "Bolts ObjC",
		description: "Collection of low-level libraries to make developing mobile apps easier.",
		url: "https://github.com/BoltsFramework/Bolts-ObjC"
	},
	{
		title: "Bolts Swift",
		description: "Collection of low-level libraries to make developing mobile apps easier.",
		url: "https://github.com/BoltsFramework/Bolts-Swift"
	},{
		title: "Parse Client in Go",
		description: "Parse API Client Library written in Go.",
		url: "https://github.com/kylemcc/parse"
	},{
		title: "Parse Ember Wrapper",
		description: "Includes an adapter, serializer and a session service for auth.",
		url: "https://github.com/GetBlimp/ember-parse"
	},{
		title: "Parse Python Wrapper",
		description: "A Python wrapper for the Parse.com API.",
		url: "https://github.com/dgrtwo/ParsePy"
	}];

	for (var i = 0; i < communityRepos.length; i++) {
		addCommunityRepoToHTML(communityRepos[i].title, communityRepos[i].description, communityRepos[i].url);
	}
});
