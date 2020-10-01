
export const setNotification = (config) => {
    return {
        type:"SET_NOTIFICATION",
        payload:config
    }
}

export const removeNotification = () => {
    
    return {
        type:"REMOVE_NOTIFICATION"
    }
}

