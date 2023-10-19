const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD_CLASS':
      return {
        ...state,
        classes: [...state.classes, action.payload],
      };
    case 'REMOVE_CLASS':
      return {
        ...state,
        classes: state.classes.filter((c: string) => c !== action.payload),
      };
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

export default reducer;
