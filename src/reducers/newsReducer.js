const initialState = {
    searchQuery: '',
    searchCategory:''
  };
  
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH_QUERY':
        return {
          ...state,
          searchQuery: action.payload,
        };
      case 'SET_SEARCH_CATEGORY':
      return {
        ...state,
        searchCategory: action.payload,
      };
      default:
        return state;
    }
  };
  
  export default searchReducer;
  