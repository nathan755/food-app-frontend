const initalState = {
    loading:false
}

const app = (state=initalState,action) => {
    switch (action.type) {
        case "INIT_APP":
            return {
                ...state,
                loading:false,

            }
        default:
            return null
    }
}

export default app;