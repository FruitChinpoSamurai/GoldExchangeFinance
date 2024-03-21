const suggestedTransactionReducer = (state, action) => {
    switch (action.type) {
        case "setCurrentDate": {
            return {
                ...state,
                date: action.payload
            };
        }

        case "UpdateText": {
            return {
                ...state,
                [action.field]: action.payload,
            };
        }

        case "UpdatePointsAndPure": {
            return {
                ...state,
                [action.field]: action.payload,
                expected_pure: parseFloat((Number(state.sample_weight)) * (action.payload / 1000)).toFixed(2)
            }
        }

        // Empty the form.
        case "Reset":
            return action.payload

        default:
            return state;
    }
}

export default suggestedTransactionReducer;