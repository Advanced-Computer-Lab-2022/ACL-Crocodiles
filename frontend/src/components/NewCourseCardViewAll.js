import React from "react";
import bgImage from "../images/course.jpg";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import GradeTwoToneIcon from "@mui/icons-material/GradeTwoTone";
import { lineHeight } from "@mui/system";
import { useSelector } from "react-redux";
import TocIcon from "@mui/icons-material/Toc";
import {
  CardActionArea,
  Card,
  Box,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AssignmentIcon from "@mui/icons-material/Assignment";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 0,
    maxHeight: "200px ",
    marginTop: theme.spacing(1),
    width: "inherit",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const NewCourseCardViewAll = ({ Course, redirect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const DiscountEndDate = new Date(Course.DiscountEndDate);

  const country = useSelector((state) => state.country.value);
  if (Course.Discount != null && Course.Discount != undefined)
    var discountRate = 1 - Course.Discount / 100;
  else var discountRate = 1;
  var newPrice = Course.Price * discountRate;

  if (country.rate)
    var newPrice =
      Math.round(Course.Price * country.rate * discountRate * 100) / 100;
  var oldPrice = Math.round(Course.Price * country.rate * 100) / 100;

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "1",
      }}
    >
      <CardActionArea
        onClick={() => {
          window.location.href = redirect;
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={bgImage}
          alt="course photo"
        />
        <CardContent
          sx={{ display: "flex", flexDirection: "column", flex: "1" }}
        >
          <Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              display="inline"
            >
              {Course.Title}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              display="inline"
              verticalAlign="super"
              color="#a00407"
            >
              &nbsp;({Course.Count} enrolled)
            </Typography>
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "column", flex: "1" }}
            marginBottom={"1.35em"}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              marginBottom={"1.35em"}
              sx={{
                display: "-webkit-box",
                wordBreak: "break-word",
                overflow: "hidden",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
                height: "40px",
              }}
            >
              {Course.Summary}
            </Typography>
          </Box>

          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography
                        sx={{ alignItems: "center", lineHeight: "0.5" }}
                      >
                        {<GradeTwoToneIcon sx={{ color: "rgb(233 176 0)" }} />}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        color="Black"
                        fontWeight={700}
                        sx={{ alignItems: "center" }}
                      >
                        &nbsp;{Math.round(Course.Rating * 10) / 10}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    &nbsp;{Course.Hours} hrs
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container justifyContent="flex-end">
                <Grid item xs={12}>
                  {Course.Discount &&
                  Course.Discount != 1 &&
                  Course.Discount != undefined ? (
                    <div>
                      {newPrice != 0 ? (
                        <Typography
                          variant="body2"
                          color="Black"
                          sx={{ textAlign: "right" }}
                        >
                          <Typography display="inline">
                            <strong>{newPrice + " " + country.code} </strong>
                          </Typography>
                          <Typography
                            fontSize={13}
                            display="inline"
                            color="#b2102f"
                          >
                            <s> {oldPrice + " " + country.code}</s>
                          </Typography>
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          color="Black"
                          sx={{ textAlign: "right" }}
                        >
                          <Typography display="inline">
                            <strong style={{ color: "green" }}>FREE </strong>
                          </Typography>
                          <Typography
                            fontSize={13}
                            display="inline"
                            color="#b2102f"
                          >
                            {" "}
                            <s> {oldPrice + " " + country.code}</s>
                          </Typography>
                        </Typography>
                      )}
                    </div>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "right", fontSize: "1rem" }}
                    >
                      {oldPrice != 0 ? (
                        <strong> {oldPrice + " " + country.code} </strong>
                      ) : (
                        <strong style={{ color: "green" }}>FREE</strong>
                      )}
                    </Typography>
                  )}
                </Grid>

                {Course.DiscountEndDate != undefined &&
                Course.Discount &&
                Course.Discount != 1 &&
                Course.Discount != undefined ? (
                  <Grid item>
                    <Typography
                      variant="body2"
                      color="#357a38"
                      sx={{ textAlign: "right" }}
                    >
                      valid until {DiscountEndDate.toLocaleDateString("en-US")}
                    </Typography>
                  </Grid>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <Button
        variant="text"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        course content
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disabled disableRipple>
          <TocIcon />
          Subtitles
        </MenuItem>
        {Course.Subtitle &&
          Course.Subtitle.map((sub) => (
            <Accordion
              sx={{
                marginTop: "0px !important",
                borderRadius: "0px !important",
                maxHeight: "max-content !important",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {sub.Title} ({sub.Hours}hr)
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: 300,
                    "& ul": { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  <li>
                    {sub.Videos.length != 0 && (
                      <ul>
                        <ListSubheader>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <OndemandVideoIcon htmlColor="grey" />
                            <span style={{ color: "#A00407" }}>
                              &nbsp;Videos
                            </span>
                          </div>
                        </ListSubheader>
                        {sub.Videos &&
                          sub.Videos.map((video) => (
                            <ListItem>
                              <ListItemText primary={` ${video.Title}`} />
                            </ListItem>
                          ))}
                      </ul>
                    )}
                    {sub.Exercises.length != 0 && (
                      <ul>
                        <ListSubheader>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <AssignmentIcon htmlColor="grey" />
                            <span style={{ color: "#A00407" }}>
                              {" "}
                              &nbsp;Exercises
                            </span>
                          </div>
                        </ListSubheader>
                        {sub.Videos &&
                          sub.Exercises.map((ex) => (
                            <ListItem>
                              <ListItemText primary={` ${ex._id}`} />
                            </ListItem>
                          ))}
                      </ul>
                    )}
                  </li>
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
      </StyledMenu>
    </Card>
  );
};

export default NewCourseCardViewAll;
