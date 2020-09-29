const initalState = {
    popupVisible: false,
    type: ""
}

const popup = (state = initalState, action) => {
    switch (action.type) {
        case "SET_POPUP":
            return {
                ...state,
                popupVisible: true,
                type: action.payload
            }
        case "REMOVE_POPUP":
            return {
                ...state,
                popupVisible: false,
                type: ""
            }
        default:
            return state;
    }
}

export default popup;