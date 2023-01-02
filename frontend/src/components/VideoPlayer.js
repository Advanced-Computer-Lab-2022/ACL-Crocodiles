import React from "react";
import YouTube from "react-youtube";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { Alert } from "@mui/material";

function getVideoid(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}
const VideoPlayer = ({ vid, url, cid, setChange, setPlayer }) => {
  const { user } = useAuthContext();
  const [added, setAdded] = useState(false);
  const [alert, setAlert] = useState(null);
  const handleChange = async (e) => {
    const percentageDone = e.target.getCurrentTime() / e.target.getDuration();
    let response;
    if (percentageDone > 0.98) {
      if (!added) {
        setChange(true);
        setAdded(true);
        if(user.Type==="Trainee"){
         response = await fetch("/api/trainee/page/addWatchedVideo/", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },

          body: JSON.stringify({
            Videoid: vid,
            cid: cid,
          }),
        });
      }
      else{
         response = await fetch("/api/corpTrainee/page/addWatchedVideo/", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },

          body: JSON.stringify({
            Videoid: vid,
            cid: cid,
          }),
        });
      }
        const json = await response.json();
        if (!response.ok) setAlert(json.error.message);
        else {
          setAdded(false);
        }
        setChange(false);
      }
    }
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube
        className="test"
        videoId={getVideoid(url)}
        opts={opts}
        onEnd={() => handleChange}
        onStateChange={(e) => handleChange(e)}
        onReady={(e) => setPlayer(e)}
      />
      {alert && <Alert severity="error">{alert}</Alert>}
    </div>
  );
};

export default VideoPlayer;
