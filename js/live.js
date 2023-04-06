var objElem = document.createElement("object");
objElem.type = "application/avplayer";

const queryString = location.search;
const params = new URLSearchParams(queryString);
const videoUrl = params.get("videoUrl");
console.log(videoUrl);
//Adjust the size and position of the media display area
//by changing the CSS style attribute
objElem.style.left = 10 + "px";
objElem.style.top = 20 + "px";
objElem.style.width = 1920 + "px";
objElem.style.height = 1080 + "px";

//Append the object element to your document
document.body.appendChild(objElem);

//https://d1akq03u1jevln.cloudfront.net/wp-gmg/20230328/64225b47e690725a5afab81e/t_f402fad17cdd41739a1867769b85121c_name_video/hlsv4_master.m3u8
//https://vod.field59.com/vod/_definst_/mp4:bimvid-storage/WDRB/1679932204-82df9de20ed72c412c1fad2eae45c3731f5577b3_fl9-720p.mp4/playlist.m3u8
try {
  webapis.avplay.open(videoUrl);
} catch (e) {
  console.log(">>> " + e);
}

var listener = {
  onbufferingstart: function () {
    console.log("Buffering start.");
  },

  onbufferingprogress: function (percent) {
    console.log("Buffering progress data : " + percent);
  },

  onbufferingcomplete: function () {
    console.log("Buffering complete.");
  },
  onstreamcompleted: function () {
    console.log("Stream Completed");
    webapis.avplay.stop();
    window.history.back();
    console.log("### back to history");
  },

  oncurrentplaytime: function (currentTime) {
    console.log("Current playtime: " + currentTime);
  },

  onerror: function (eventType) {
    console.log("event type error : " + eventType);
  },

  onevent: function (eventType, eventData) {
    console.log("event type: " + eventType + ", data: " + eventData);
  },

  onsubtitlechange: function (duration, text, data3, data4) {
    console.log("subtitleText: " + text);
  },
  ondrmevent: function (drmEvent, drmData) {
    console.log("DRM callback: " + drmEvent + ", data: " + drmData);
  },
};

webapis.avplay.setListener(listener);

// Base resolution of avplay
var avplayBaseWidth = 1920;

// Calculate ratio to base resolution
var ratio = avplayBaseWidth / window.document.documentElement.clientWidth;

// Convert rectangle to base resolution
var newLeft = 0 * ratio;
var newTop = 0 * ratio;
var newWidth = 1920 * ratio;
var newHeight = 1080 * ratio;

webapis.avplay.setDisplayRect(newLeft, newTop, newWidth, newHeight);

var bitRateString =
  "BITRATES=1000~20000|STARTBITRATE=HIGHEST|SKIPBITRATE=LOWEST";
webapis.avplay.setStreamingProperty("ADAPTIVE_INFO", bitRateString);
//webapis.avplay.setStreamingProperty("ADAPTIVE_INFO", "FIXED_MAX_RESOLUTION=1920x1080");

//webapis.avplay.prepare();

var successCallback = function () {
  console.log("The media has finished preparing");
  webapis.avplay.play();
};

var errorCallback = function () {
  console.log("The media has failed to prepare");
};
webapis.avplay.prepareAsync(successCallback, errorCallback);

//webapis.avplay.play();
//webapis.avplay.stop();

/*
				var value = tizen.tvinputdevice.getSupportedKeys();
		console.log('######## '+ JSON.stringify(value)); 
var init = function(){
	 console.log('init() called');
	// tizen.tvinputdevice.registerKeyBatch(['VolumeUp', 'VolumeDown','MediaPlay','MediaPlayPause','ArrowLeft','ArrowRight']);
	 document.body.addEventListener('keydown', function(event){
		 
		 
		 tizen.tvinputdevice.registerKey("MediaPlayPause");
			tizen.tvinputdevice.registerKey("MediaPlay");
			tizen.tvinputdevice.registerKey("MediaStop");
			tizen.tvinputdevice.registerKey("MediaPause");
			tizen.tvinputdevice.registerKey("MediaRewind");
			tizen.tvinputdevice.registerKey("MediaFastForward");
			
			
		 console.log('##################' + event.keyCode);
		  switch (event.keyCode) {
		    case 10252: //MediaPlayPause
		      console.log('Play/ Paused');
		      if(webapis.avplay.getState() === 'PLAYING'){
		    	  webapis.avplay.pause();
		      }else if(webapis.avplay.getState() === 'PAUSED') {
		    	  webapis.avplay.play();
		      }
		    break;
		    
		    
		    case 10009: //back
			      console.log('Stoped');
			      webapis.avplay.stop();
			    break;
			    
		    case 415: //MediaPlay
		    	console.log('plyed!');
		    	webapis.avplay.play();
		    break;
		    case 13: //Enter
		    	console.log('played!');
		    	 webapis.avplay.play();
		    break;
		    
		    case 19: //MediaPause
		    	console.log('paused!');
		    	webapis.avplay.pause();
		    break;

		    case 403: //ColorF0Red
		      console.log('red color');
		    break;
		    case 37: //left arrow
			      console.log('Left arrow pressed');
			    break;
		    case 38: //up arrow
			      console.log('Up arrow pressed!');
			    break;
		    case 39: //right arrow
			      console.log('right arrow pressed!');
			    break;
		    case 40: //down arrow
			     console.log('Down arrow pressed!');
			    break;
		    case 447: //volum up
			     console.log('Volum up');
			    break;
		    case 448: //Volum down
			      console.log('Volume down');
			    break;
		    case 449: //volum mute
			     console.log('volume muted!');
			    break;
				  
		  }
		 
		 
	 });
}
		

*/

//window.onload = init;
