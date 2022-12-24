import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Toolbar from "@mui/material/Toolbar";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const drawerWidth = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const TraineeDrawer = ({
  subtitles,
  arrowHandler,
  open,
  vidHandler,
  exerciseHandler,
  trainee,
  change,
}) => {
  const [subOpen, setSubOpen] = useState([]);
  const [ExOpen, setExOpen] = useState([]);
  const [VidOpen, setVidOpen] = useState([]);
  const watchedVids = trainee.Watched_videos;
  const solved = trainee.My_assignments;
  useState(() => {}, [change]);
  const handleSubClick = (id) => {
    const currIndex = subOpen.indexOf(id);
    const newHook = [...subOpen];
    if (currIndex == -1) {
      newHook.push(id);
    } else {
      newHook.splice(currIndex, 1);
    }
    setSubOpen(newHook);
  };
  const handleExClick = (id) => {
    const currIndex = ExOpen.indexOf(id);
    const newHook = [...ExOpen];
    if (currIndex == -1) {
      newHook.push(id);
    } else {
      newHook.splice(currIndex, 1);
    }
    setExOpen(newHook);
  };

  const handleVidClick = (id) => {
    const currIndex = VidOpen.indexOf(id);
    const newHook = [...VidOpen];
    if (currIndex == -1) {
      newHook.push(id);
    } else {
      newHook.splice(currIndex, 1);
    }
    setVidOpen(newHook);
  };

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar />
        <DrawerHeader>
          <Grid container item>
            <Grid item xs={9}>
              <Box
                width="100%"
                height="100%"
                component={Stack}
                direction="column"
                justifyContent="center"
              >
                <Typography style={{ fontWeight: 600 }}>
                  Course Content{" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box
                align="right"
                width="100%"
                height="100%"
                component={Stack}
                direction="column"
                justifyContent="end"
              >
                <IconButton onClick={arrowHandler}>
                  {useTheme().direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DrawerHeader>
        <Divider />
        <List>
          {subtitles &&
            subtitles.map((subtitle) => (
              <div>
                <ListItemButton onClick={() => handleSubClick(subtitle._id)}>
                  <ListItemText primary={subtitle.Title} />
                  {subOpen.indexOf(subtitle._id) !== -1 ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse
                  in={subOpen.indexOf(subtitle._id) !== -1}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={() => handleVidClick(subtitle._id)}
                      sx={{ pl: 4, pr: 6 }}
                    >
                      <ListItemIcon>
                        <OndemandVideoIcon />
                      </ListItemIcon>
                      <ListItemText primary="Videos" />
                      {VidOpen.indexOf(subtitle._id) !== -1 ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={VidOpen.indexOf(subtitle._id) !== -1}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {subtitle.Videos &&
                          subtitle.Videos.map((video) => (
                            <ListItemButton
                              onClick={() => vidHandler(video)}
                              sx={{}}
                            >
                              {watchedVids.find(
                                (v) => v.video_id == video._id
                              ) != undefined ? (
                                <>
                                  {" "}
                                  <CheckCircleOutlineOutlinedIcon
                                    sx={{ paddingBottom: "5%", pl: 4.5 }}
                                    size="small"
                                    htmlColor="green"
                                  />
                                  <Typography
                                    sx={{
                                      paddingBottom: "5%",
                                      fontSize: "0.9rem",
                                      pl: 0,
                                    }}
                                  >
                                    &nbsp;{video.Title}
                                  </Typography>
                                </>
                              ) : (
                                <Typography
                                  sx={{
                                    paddingBottom: "5%",
                                    fontSize: "0.9rem",
                                    pl: 8,
                                  }}
                                >
                                  {video.Title}
                                </Typography>
                              )}
                            </ListItemButton>
                          ))}
                      </List>
                    </Collapse>

                    <ListItemButton
                      onClick={() => handleExClick(subtitle._id)}
                      sx={{ pl: 4, pr: 6 }}
                    >
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary="Exercises" />
                      {ExOpen.indexOf(subtitle._id) !== -1 ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={ExOpen.indexOf(subtitle._id) !== -1}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {subtitle.Exercises &&
                          subtitle.Exercises.map((exercise) => (
                            <ListItemButton
                              onClick={() => exerciseHandler(exercise)}
                              sx={{}}
                            >
                              {solved.find((s) => s.quiz_id == exercise._id) !=
                              undefined ? (
                                <>
                                  {" "}
                                  <CheckCircleOutlineOutlinedIcon
                                    sx={{ paddingBottom: "5%", pl: 4.5 }}
                                    size="small"
                                    htmlColor="green"
                                  />
                                  <Typography
                                    sx={{
                                      paddingBottom: "5%",
                                      fontSize: "0.9rem",
                                      pl: 0,
                                    }}
                                  >
                                    &nbsp;{exercise._id}
                                  </Typography>
                                </>
                              ) : (
                                <Typography
                                  sx={{
                                    paddingBottom: "5%",
                                    fontSize: "0.9rem",
                                    pl: 8,
                                  }}
                                >
                                  {exercise._id}
                                </Typography>
                              )}
                            </ListItemButton>
                          ))}
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              </div>
            ))}
        </List>
      </Drawer>
    </div>
  );
};

export default TraineeDrawer;
