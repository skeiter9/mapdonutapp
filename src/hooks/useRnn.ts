import { useEffect } from "react";
import { Navigation } from "react-native-navigation";
import { RNN_searchBarUpdated } from "../@types/rnn";

export default function useRnnBindScreen(_this: any, componentId: string,
    events: {
        componentDidAppear?: () => void,
        componentDidDisappear?: () => void,
        navigationButtonPressed?: (e: any) => void,
        commandCompletedListener?: (e: any) => void,
        commandListener?: (e: string) => void,
        searchBarUpdated?: (res: RNN_searchBarUpdated) => void
    } = {},
) {
    if (!componentId) throw new Error(`Unable to Bind Screen`);

    if (events.componentDidAppear) _this['componentDidAppear'] = events.componentDidAppear;
    if (events.componentDidDisappear) _this['componentDidDisappear'] = events.componentDidDisappear;
    if (events.navigationButtonPressed) _this['navigationButtonPressed'] = events.navigationButtonPressed;
    if (events.searchBarUpdated) _this['searchBarUpdated'] = events.searchBarUpdated;

    const commandListener = events.commandListener ?
        Navigation.events().registerCommandListener(events.commandListener) :
        { remove: () => { } };

    const commandCompletedListener = events.commandCompletedListener ?
        Navigation.events().registerCommandCompletedListener(events.commandCompletedListener) :
        { remove: () => { } };

    useEffect(() => {
        const navigationEventListener = Navigation.events().bindComponent(_this, componentId);
        return () => {
            navigationEventListener.remove();
            commandListener.remove();
            commandCompletedListener.remove();
        }
    }, []);
}