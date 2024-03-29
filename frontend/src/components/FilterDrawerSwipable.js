import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { chooseRatingFilter } from "../Features/ratingFilter";
import { choosePriceFilter } from "../Features/priceFilter";
import { chooseSubjectFilter } from "../Features/subjectFilter";
import { chooseSort } from "../Features/sort";
import { chooseSwipableIsOpen } from "../Features/swipableIsOpen";

export default function SwipeableTemporaryDrawer({ subjectOptions }) {
  const currRatingRange = useSelector(
    (state) => state.ratingFilter.value.range
  );
  const currPriceRange = useSelector((state) => state.priceFilter.value.range);
  const currSubject = useSelector((state) => state.subjectFilter.value.range);
  const currState = useSelector((state) => state.SwipableIsOpen.value);
  const currSort = useSelector((state) => state.sort.value);
  const rate = useSelector((state) => state.country.value.rate);

  const [priceRange, setPriceRange] = useState(currPriceRange);
  const [ratingRange, setRatingRange] = useState(currRatingRange);
  const [subject, setSubject] = useState(currSubject);
  const [state, setState] = React.useState(currState);
  const [sort, setSort] = useState(currSort);

  const dispatch = useDispatch();

  const sortOptions = [
    { label: "Most Popular", value: "Count" },
    { label: "Highest Rating", value: "Rating" },
  ];

  const handleRating = (e, data) => {
    setRatingRange(data);
    dispatch(chooseRatingFilter({ range: data }));
  };
  const handlePrice = (e, data) => {
    setPriceRange(data);
    dispatch(choosePriceFilter({ range: [data[0] / rate, data[1] / rate] }));
  };
  const handleSubject = (e, data) => {
    setSubject(data);
    dispatch(chooseSubjectFilter({ label: data }));
  };

  const handleSort = (data) => {
    console.log(data);
    if (data) {
      const x = { element: data, ascending: sort.ascending };

      setSort(x);
      dispatch(chooseSort(x));
    } else {
      const x = { element: null, ascending: sort.ascending };

      setSort(x);
      dispatch(chooseSort(x));
    }
  };

  // const drawerWidth = 300;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const toggleDrawer = (open) => {
    setState(open);
    dispatch(chooseSwipableIsOpen(open));
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <Toolbar />
      <DrawerHeader>
        <Box
          width="100%"
          height="100%"
          component={Stack}
          direction="column"
          justifyContent="center"
        >
          <Typography style={{ fontWeight: 600, fontSize: "1.2rem" }}>
            Sort
          </Typography>
        </Box>
      </DrawerHeader>

      <Divider />
      <Box sx={{ padding: "5%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Autocomplete
            sx={{ display: "flex", flexDirection: "row", flex: 1 }}
            onChange={(e, data) => {
              data ? handleSort(data.value) : handleSort(null);
            }}
            disablePortal
            id="combo-box-demo"
            options={sortOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Sort by..." />
            )}
          />
          <Button
            variant="text"
            onClick={() => {
              let x;
              if (sort.ascending == 1) {
                x = { element: sort.element, ascending: -1 };
              } else {
                x = { element: sort.element, ascending: 1 };
              }
              setSort(x);
              dispatch(chooseSort(x));
            }}
            sx={{
              color: "black",
              textTransform: "capitalize",
              minWidth: "0px",
            }}
          >
            {sort.ascending == 1 ? (
              <ArrowUpwardIcon
                sx={{ paddingBottom: "5%" }}
                size="small"
                htmlColor="grey"
              />
            ) : (
              <ArrowDownwardIcon
                sx={{ paddingBottom: "5%" }}
                size="small"
                htmlColor="grey"
              />
            )}
          </Button>
        </div>
      </Box>

      <DrawerHeader>
        <Box
          width="100%"
          height="100%"
          component={Stack}
          direction="column"
          justifyContent="center"
        >
          <Typography style={{ fontWeight: 600, fontSize: "1.2rem" }}>
            Filter{" "}
          </Typography>
        </Box>
      </DrawerHeader>

      <Divider />
      <Box sx={{ padding: "5%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <SubjectOutlinedIcon
            sx={{ paddingBottom: "5%" }}
            size="small"
            htmlColor="grey"
          />
          <Typography sx={{ paddingBottom: "5%" }}>&nbsp;Subject</Typography>
        </div>

        <Autocomplete
          onChange={(e, data) => {
            data ? handleSubject(e, data.label) : handleSubject(e, "");
          }}
          // onBlur= {(e,data) => handleSubject(e,data)}
          disablePortal
          id="combo-box-demo"
          options={subjectOptions}
          size="small"
          renderInput={(params) => (
            <TextField {...params} label="Select a subject" />
          )}
        />
      </Box>

      <Divider />

      <Box sx={{ padding: "5%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <MonetizationOnOutlinedIcon size="small" htmlColor="grey" />
          <Typography> &nbsp;Price</Typography>
        </div>

        <Slider
          getAriaLabel={() => "range"}
          sx={{ width: "208px", marginLeft: "10px" }}
          valueLabelDisplay="auto"
          min={0}
          max={500 * rate}
          value={[priceRange[0], priceRange[1]]}
          onChange={(e, data) => {
            setPriceRange(data);
          }}
          onChangeCommitted={(e, data) => handlePrice(e, data)}
          marks={[
            { value: 0, label: "0" },
            {
              value: 500 * rate,
              label: `${Math.round(500 * rate * 100) / 100}`,
            },
          ]}
          size="small"
        />
      </Box>

      <Divider />

      <Box sx={{ padding: "5%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <StarOutlineOutlinedIcon size="small" htmlColor="grey" />
          <Typography> &nbsp;Rating</Typography>
        </div>

        <Slider
          getAriaLabel={() => "range"}
          sx={{ width: "208px", marginLeft: "10px" }}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          value={ratingRange}
          onChange={(e, data) => {
            setRatingRange(data);
          }}
          onChangeCommitted={(e, data) => {
            handleRating(e, data);
          }}
          step={0.1}
          marks={[
            { value: 0, label: "0" },
            { value: 5, label: "5" },
          ]}
          size="small"
        />
      </Box>
    </Box>
  );
  useEffect(() => {
    toggleDrawer(currState);
  }, [currState]);
  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          sx={{ display: { md: "none" } }}
          anchor={"right"}
          open={state}
          onClose={() => toggleDrawer(false)}
          onOpen={() => toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
