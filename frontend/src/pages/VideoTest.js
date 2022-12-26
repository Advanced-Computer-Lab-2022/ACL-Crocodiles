import React from 'react';
import { useState,useEffect } from 'react';
import Test from './test.js'
function getArtistId(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false

}

const VideoTest = ({url}) => {
const [window,setWindow]  = useState(null)
var player;
  
  // useEffect(()=>{
  //   loadPlayer();
    
  // })
    
 
  
 
//   function loadPlayer() { 

//       var tag = document.createElement('script');
//       tag.src = "https://www.youtube.com/iframe_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
//       window.onYouTubePlayerAPIReady = function() {
//         onYouTubePlayer();
    
//   }
// }
//   var player1;
//   var player2;
  
//   function onYouTubePlayer() {
 
//     player1 = new window.YT.Player(url, {
//       height: '490',
//       width: '880',
//       videoId: getArtistId(url),
//       playerVars: { controls:1, showinfo: 0, rel: 0, showsearch: 0, iv_load_policy: 3 },
//       events: {
//         'onStateChange': onPlayerStateChange,
//         'onError': catchError
//       }
//     });
//     player2 = new window.YT.Player('player2', {
//       height: '490',
//       width: '880',
//       videoId:getArtistId(url) ,
//       playerVars: { controls:1, showinfo: 0, rel: 0, showsearch: 0, iv_load_policy: 3 },
//       events: {
//         'onStateChange': onPlayerStateChange,
//         'onError': catchError
//       }
//     });
//     console.log(player2)
//   }
  
//     var done = false;
//     function onPlayerStateChange(event) {
//       console.log(player1)
//       if (event.data == window.YT.PlayerState.PLAYING && !done) {
//         // setTimeout(stopVideo, 6000);

//         done = true;
//       } else if (event.data == window.YT.PlayerState.ENDED) {
//         console.log('Ended!')
//       }
//     }
  
//     function onPlayerReady(event) {
  
//       //if(typeof(SONG.getArtistId()) == undefined)
//       //{
//       //  console.log("undefineeeed"); 
//       //} 
//       //event.target.playVideo();   
//     }
//     function catchError(event)
//     {
//       if(event.data == 100) console.log("De video bestaat niet meer");
//     }
  
//     function stopVideo() {
//       player1.stopVideo();
//     }


    // <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->

  
      // 2. This code loads the IFrame Player API code asynchronously.

      
        useEffect(()=>{
         load();
    
   },[])
    
   const load = async ()=>{
    var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
         onYouTubeIframeAPIReady()
   }
        
  
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
      
        function onYouTubeIframeAPIReady() {
          player = new window.YT.Player('player', {
            height: '390',
            width: '640',
            videoId:  getArtistId(url),
            playerVars: {
              'playsinline': 1
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
          console.log(player)
        }
  
        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
          // event.target.playVideo();
        }
  
        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;
        function onPlayerStateChange(event) {
          if (event.data == window.YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
          }
        }
        function stopVideo() {
          player.stopVideo();
        }
      
      // },)
     

    return (
      <div>
    {/* {window.YT &&<div id="player"  style={{  top: 0, left: 0, width: "100%", height: "100%", borderRadius: '16px', objectFit: "cover" }}></div>} */}
 
        {/* <div id="player2" src="" style={{  top: 0, left: 0, width: "100%", height: "100%", borderRadius: '16px', objectFit: "cover" }} > </div> */}

        <Test url={url}/>
  </div>
        
    );
};

export default VideoTest;



