import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { RNN_screenProps } from '../@types/rnn';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image'
import { Text, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { languageSelector, themeSelector } from '../utils/appSelectors';
import createCachedSelector from 're-reselect';
import { StoreApp } from '../@types/redux';
import Avatar from '../components/Avatar';

Profile.propTypes = {
};
interface Props extends RNN_screenProps {
}
const profileSelector = createCachedSelector(
    (s: StoreApp) => s.app.currentUser,
    (cu) => (!cu ? {} : {
        coverURL: cu.coverURL, photoURL: cu.photoURL,
        bio: cu.bio, displayName: cu.displayName,
        username: cu.username
    })
)(() => 'Profile');

export default function Profile(props: Props) {
    const { } = props;
    const { words } = useSelector(languageSelector);
    const { themeVariables } = useSelector(themeSelector);
    const { coverURL, photoURL, bio, displayName, username } = useSelector(profileSelector);
    const _onPress = () => {};
    return (
        <ScrollView style={{
            //height: viewportHeight - 56 - 56 - (isIphoneX() ? 64 : 0)
        }}>

            <View>
                <Avatar photoUrl={photoURL || ''} styles={{ width: 90, height: 90 }} />
                <Text style={{ color: themeVariables.PRIMARY_COLOR }}> {displayName} </Text>
                <Text style={{ color: themeVariables.TEXT_COLOR__BIO }}> @{username} </Text>
            </View>

            <Text style={{ color: themeVariables.TEXT_COLOR__BIO }}>
                {bio}
            </Text>

            <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                <View style={{ flex: 1 }}>
                    <Button onPress={_onPress}>
                        {words.PROFILE_EDIT_PROFILE}
                    </Button>
                </View>
            </View>


        </ScrollView>
    )
}