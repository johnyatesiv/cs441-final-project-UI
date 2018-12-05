const initialState = {
    menuOpen: false,
    menuRestaurant: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "OPEN_MENU": {
            state.menuOpen = true;
            return state;
        }
        case "CLOSE_MENU": {
            state.menuOpen = false;
            return state;
        }
        default:
            return state;
    }
}
