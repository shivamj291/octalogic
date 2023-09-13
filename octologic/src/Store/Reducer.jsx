// reducers.js
const initialState = {
    courseData:[],
    AllData:[]
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'COURSEDATA':
        return {
            ...state,
            courseData:action.payload
          };
      case 'ALLDATA':
        return{
            ...state,
            AllData: [...state.AllData, action.payload], 
          };
      default:
        return state;
    }
  };
  
  export default Reducer;
  