import account from "./account";

const initalState = {
    popupVisible:false
}

const popup = (state = initalState, action) => {
    switch (action.type) {
        case "SET_POPUP":
            return{
                ...state,
                popupVisible:true
            }
        case "REMOVE_POPUP":
        return{
            ...state,
            popupVisible:false
        }
    
        default:
            return state;
    }
}

export default popup;