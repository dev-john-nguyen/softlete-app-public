import React from 'react';
import { View, StyleSheet } from 'react-native';
import NetworkCheckSvg from '../../assets/NetworkCheckSvg';
import { UserProps } from '../../services/user/types';
import BaseColors, { rgba } from '../../utils/BaseColors';
import Constants from '../../utils/Constants';
import { capitalize, normalize } from '../../utils/tools';
import PrimaryText from '../elements/PrimaryText';
import SecondaryText from '../elements/SecondaryText';
import HeaderMenu from '../Menu';
import StyleConstants from '../tools/StyleConstants';


interface Props {
    user: UserProps;
    navigation: any;
    offline: boolean;
    subText: string;
}


const HomeHeader = ({ user, navigation, offline, subText }: Props) => {

    const today = new Date()

    const openDrawer = () => navigation.openDrawer();

    const renderDate = () => `${Constants.months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

    return (
        <View>
            <View style={{ padding: StyleConstants.baseMargin }}>
                <View style={styles.headerContainer}>
                    <View style={{ flex: 1 }}>
                        <PrimaryText styles={styles.greet}>Welcome</PrimaryText>
                    </View>
                    <HeaderMenu onPress={openDrawer} menuColor={BaseColors.white} />
                </View>
                <SecondaryText styles={styles.sub} bold>{renderDate()}</SecondaryText>
                {
                    !offline && (
                        <View style={styles.offlineContainer}>
                            <SecondaryText styles={styles.offlineText}>You are offline</SecondaryText>
                            <View style={styles.offlineSvg}>
                                <NetworkCheckSvg fillColor={BaseColors.white} />
                            </View>
                        </View>
                    )
                }
            </View>
            <View style={styles.promptContainer}>
                <SecondaryText styles={styles.promptText} bold>{subText}</SecondaryText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    greet: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.white,
        textTransform: 'uppercase',
        letterSpacing: 2
    },
    name: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary,
        marginTop: 5
    },
    promptContainer: {
        marginTop: StyleConstants.baseMargin,
        marginBottom: StyleConstants.smallMargin,
        backgroundColor: rgba(BaseColors.primaryRgb, .5),
        padding: 15,
        paddingTop: 20,
        paddingBottom: 20
    },
    promptText: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.white,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    sub: {
        fontSize: StyleConstants.smallerFont,
        color: BaseColors.white,
        opacity: .7,
        marginTop: 5,
        textTransform: 'uppercase',
        letterSpacing: 2
    },
    offlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        opacity: .7
    },
    offlineText: {
        fontSize: StyleConstants.extraSmallFont,
        textTransform: 'uppercase',
        color: BaseColors.white,
        marginRight: 5
    },
    offlineSvg: {
        height: normalize.width(20),
        width: normalize.width(20)
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
export default HomeHeader;