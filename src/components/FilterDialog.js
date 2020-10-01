import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// otherstuff
import axios from "axios";
// contextAPI
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import { categoryList } from "./categories";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const config = {
  headers: { "user-key": "8cd455d78407927ed585bf555240c308" },
};

export default function DialogSelect() {
  const classes = useStyles();
  const [
    {
      city,
      openFilter,
      restaurants,
      cuisines,
      categories,
      cuisine,
      category,
      filteredRestaurants,
      isRestaurantsFiltered,
    },
    dispatch,
  ] = useStateValue();

  React.useEffect(() => {
    dispatch({
      type: "SET_CATEGORIES",
      categories: categoryList,
    });

    dispatch({
      type: "SET_CUISINES",
      cuisines: ["Chinese", "North Indian"],
    });
  }, []);

  React.useEffect(() => {
    if (isRestaurantsFiltered) {
      dispatch({
        type: "SET_FILTERED_RESTAURANTS",
        filteredRestaurants: restaurants.filter((item) => {
          if (item.restaurant.cuisines.indexOf(cuisine) != -1) {
            return item.restaurant;
          }
        }),
      });
    }
  }, [restaurants]);

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openFilter}
        onClose={() => {
          dispatch({
            type: actionTypes.SET_OPENFILTER,
            openFilter: false,
          });
        }}
      >
        <DialogTitle>Filter with</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="cuisine-input-label">Cuisine</InputLabel>
              <Select
                labelId="cuisine-select-label"
                id="cuisine-select"
                value={cuisine}
                onChange={(e) => {
                  dispatch({
                    type: "SET_CUISINE",
                    cuisine: e.target.value,
                  });
                  if (e.target.value != "") {
                    dispatch({
                      type: "SET_FILTERED_RESTAURANTS",
                      filteredRestaurants: restaurants.filter((item) => {
                        if (
                          item.restaurant.cuisines.indexOf(e.target.value) != -1
                        ) {
                          return item.restaurant;
                        }
                      }),
                    });

                    dispatch({
                      type: "IS_RESTAURANTS_FILTERED",
                      isRestaurantsFiltered: true,
                    });
                  } else {
                    dispatch({
                      type: "IS_RESTAURANTS_FILTERED",
                      isRestaurantsFiltered: false,
                    });
                  }
                }}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {cuisines.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="category-input-label">Categories</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                onChange={(e) => {
                  let val = e.target.value;
                  dispatch({
                    type: "SET_CATEGORY",
                    category: val,
                  });

                  axios
                    .get(
                      `https://developers.zomato.com/api/v2.1/search?entity_id=${city.id}&entity_type=city&category=${val}`,
                      config
                    )
                    .then((res) => {
                      console.log(res);
                      dispatch({
                        type: actionTypes.SET_RESTAURANTS,
                        restaurants: res.data.restaurants,
                      });
                    });
                }}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.categories.id}>
                      {item.categories.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch({
                type: actionTypes.SET_OPENFILTER,
                openFilter: false,
              });
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch({
                type: actionTypes.SET_OPENFILTER,
                openFilter: false,
              });
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
