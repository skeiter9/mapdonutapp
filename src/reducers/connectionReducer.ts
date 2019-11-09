import { actionGeneral, ConnectionState } from "../@types/redux";
import { NetInfoState } from "@react-native-community/netinfo";

const initialState: ConnectionState = {
    isOffline: true,
    netInfo: {} as NetInfoState
};

export default (state = initialState, action: actionGeneral) => {
    switch (action.type) {
        case 'SAVE_NET_INFO':
            const netInfo = action.payload.netInfo;
            state.netInfo = netInfo;
            state.isOffline = !netInfo.isInternetReachable;
            return state;
        default:
            return state;
    }
}