import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import { useState, useEffect, useRef } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useAuthContext } from "../hooks/useAuthContext";
import { Alert } from "@mui/material";
import PDF from "./PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function NoteTaking({ player, video_id, title, course_id }) {
  const [time, setTime] = useState(0);
  const [date, setDate] = useState({ hours: 0, mins: 0, sec: 0 });
  const [timeString, setTimeString] = useState("00:00:00");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [value, setValue] = useState("");
  const [notesReady, setNotesReady] = useState(true);
  const { user } = useAuthContext();
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setNotesReady(false);
    if(user.Type==="Trainee"){
    fetch("/api/trainee/page/getNotes", {
      method: "POST",
      body: JSON.stringify({
        video_id: video_id,
        course_id: course_id,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes(data.Notes);
        setNotesReady(true);
      })
      .catch((error) => {
        setAlert(error.message);
      });}
      else{
        fetch("/api/corpTrainee/page/getNotes", {
          method: "POST",
          body: JSON.stringify({
            video_id: video_id,
            course_id: course_id,
          }),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setNotes(data.Notes);
            setNotesReady(true);
          })
          .catch((error) => {
            setAlert(error.message);
          });
      }
  }, []);

  const handleFocus = () => {
    const currSec = player.target.getCurrentTime();

    var h = Math.floor(currSec / 3600);
    var m = Math.floor((currSec % 3600) / 60);
    var s = Math.floor((currSec % 3600) % 60);
    setDate({ hours: h, mins: m, sec: s });
    setTime(player.target.getCurrentTime());
    const dateObj = new Date(currSec * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    setTimeString(
      hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
    );
  };

  const addNote = () => {
    if (newNote !== "") {
      setValue("");
      const temp = [...notes];
      temp.push(`[${timeString}]: ${newNote}`);
      setNotes(temp);
      setNewNote("");
      if(user.Type==="Trainee"){
      fetch("/api/trainee/page/addNote", {
        method: "PATCH",
        body: JSON.stringify({
          video_id: video_id,
          course_id: course_id,
          note: `[${timeString}]: ${newNote}`,
        }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          setAlert(error.message);
        });
      }
      else{
        fetch("/api/corpTrainee/page/addNote", {
          method: "PATCH",
          body: JSON.stringify({
            video_id: video_id,
            course_id: course_id,
            note: `[${timeString}]: ${newNote}`,
          }),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => {
            setAlert(error.message);
          });
      }
    }
  };
  const deleteNote = (i) => {
    const temp = [...notes];

    temp.splice(i, 1);
    setNotes(temp);

    if(user.Type==="Trainee"){
    fetch("/api/trainee/page/deleteNote", {
      method: "PATCH",
      body: JSON.stringify({
        video_id: video_id,
        course_id: course_id,
        Note_index: i,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        setAlert(error.message);
      });
    }
    else{
      fetch("/api/corpTrainee/page/deleteNote", {
        method: "PATCH",
        body: JSON.stringify({
          video_id: video_id,
          course_id: course_id,
          Note_index: i,
        }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          setAlert(error.message);
        });
    }
  };
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        paddingTop: "10px",
      }}
      noValidate
      autoComplete="off"
    >
      {alert && <Alert severity="error">{alert}</Alert>}
      <div>
        <TextField
          sx={{
            width: "100%",
          }}
          id="outlined-textarea"
          label={`Take a Note at ${timeString}`}
          placeholder="Type what you are thinking..."
          maxRows={4}
          multiline
          value={value}
          onFocus={() => handleFocus()}
          onChange={(e) => {
            setValue(e.target.value);
            setNewNote(e.target.value);
          }}
        />
        <Button
          sx={{ marginTop: "10px", width: "20%", maxHeight: "40px" }}
          variant="outlined"
          onClick={addNote}
        >
          Add note
        </Button>
        <PDFDownloadLink
          style={{ textDecoration: "none" }}
          document={<PDF Title={title} notes={notes} />}
          fileName={`${title} notes`}
        >
          {({ loading }) =>
            loading ? (
              <Button
                sx={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  width: "max-content",
                  maxHeight: "40px",
                }}
                variant="contained"
              >
                Loading...
              </Button>
            ) : (
              <Button
                sx={{
                  marginTop: "10px",
                  marginLeft: "10px",
                  width: "max-content",
                  maxHeight: "40px",
                }}
                variant="contained"
                startIcon={<FileDownloadOutlinedIcon />}
              >
                Download PDF
              </Button>
            )
          }
        </PDFDownloadLink>
        <div style={{ marginTop: "30px" }}>
          {notesReady &&
            notes &&
            notes.map((note, i) => (
              <TextField
                sx={{
                  width: "100%",
                  paddingTop: "10px",
                }}
                id="standard-read-only-input"
                placeholder="Placeholder"
                maxRows={4}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <IconButton>
                      <ClearIcon
                        onClick={() => {
                          deleteNote(i);
                        }}
                      />
                    </IconButton>
                  ),
                }}
                multiline
                value={note}
              />
            ))}
        </div>
      </div>
    </Box>
  );
}
