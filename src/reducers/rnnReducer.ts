import { actionGeneral, RnnState } from "../@types/redux";

const initialState: RnnState = {
    root: {},
    componentsRegistered: []
};

export default (state = initialState, action: actionGeneral) => {
    switch (action.type) {
        case 'SET_ROOT':
            state.root = action.payload.root
            return state;
        case 'RNN_REGISTER_COMMAND_COMPLETED':
            state.componentsRegistered.push(action.payload.command);
            return state;
        default:
            return state;
    }
}