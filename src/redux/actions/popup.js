export const setPopup = (type) => {
    return{
        type:"SET_POPUP",
        payload:type
    }
}

export const removePopup = () => {
    return{
        type:"REMOVE_POPUP"
    }
}