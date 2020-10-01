export const initialState = {
  city: {},
  cities: [],
  restaurants: [],
  openFilter: false,
  cuisines: [],
  categories: [],
  cuisine: "",
  category: "",
  filteredRestaurants: [],
  isRestaurantsFiltered: false,
};

export const actionTypes = {
  SET_CITY: "SET_CITY",
  SET_CITIES: "SET_CITIES",
  SET_RESTAURANTS: "SET_RESTAURANTS",
  SET_OPENFILTER: "SET_OPENFILTER",
  SET_CUISINES: "SET_CUISINES",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_CUISINE: "SET_CUISINE",
  SET_CATEGORY: "SET_CATEGORY",
  SET_FILTERED_RESTAURANTS: "SET_FILTERED_RESTAURANTS",
  SET_IS_RESTAURANTS_FILTERED: "IS_RESTAURANTS_FILTERED",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_CITY:
      return {
        ...state,
        city: action.city,
      };
    case actionTypes.SET_CITIES:
      return {
        ...state,
        cities: action.cities,
      };
    case actionTypes.SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.restaurants,
      };
    case actionTypes.SET_OPENFILTER:
      return {
        ...state,
        openFilter: action.openFilter,
      };
    case actionTypes.SET_CUISINES:
      return {
        ...state,
        cuisines: action.cuisines,
      };
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case actionTypes.SET_CUISINE:
      return {
        ...state,
        cuisine: action.cuisine,
      };
    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case actionTypes.SET_FILTERED_RESTAURANTS:
      return {
        ...state,
        filteredRestaurants: action.filteredRestaurants,
      };

    case actionTypes.SET_IS_RESTAURANTS_FILTERED:
      return {
        ...state,
        isRestaurantsFiltered: action.isRestaurantsFiltered,
      };
    default:
      return state;
  }
};

export default reducer;
