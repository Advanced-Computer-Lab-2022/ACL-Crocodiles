import React from 'react';
import YouTube from 'react-youtube';
import { useAuthContext } from "../hooks/useAuthContext";

function getVideoid(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false

  }
const VideoPlayer = ({vid,url,cid}) => {
  const { user } = useAuthContext()

    const handleChange = async (e) => {
    

      const percentageDone =e.target.getCurrentTime()/e.target.getDuration()
      if(percentageDone>0.98){
        console.log(vid)
    
          const response = await fetch('/api/trainee/page/addWatchedVideo/', {
              method: 'PATCH', headers: {
                  'content-type': 'application/json',
                  'Authorization': `Bearer ${user.token}`

              },
         
              body:  JSON.stringify({
                       Videoid: vid,
                        cid:cid
                      })
          })
          const json = await response.json()
          if(!response.ok)
               console.log(json.error) 
          else
            console.log(json)
          

  
      // const response = await fetch('api/trainee/page/addWatchedVideo', {
      //     method: 'PATCH', headers: {
      //         'content-type': 'application/json',
      //         'Authorization': `Bearer ${user.token}`

      //     },
      //     body:  JSON.stringify({
      //       Videoid: vid,
      //         cid:cid })
             
          
      // })

    }
  }

    const opts = {
     
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
     
      };
  
    return (
        <div >
            <YouTube className='test' videoId={getVideoid(url)} opts={opts} onEnd={()=>handleChange} onStateChange={(e)=>handleChange(e) } />
 

        </div>
    );
};

export default VideoPlayer;