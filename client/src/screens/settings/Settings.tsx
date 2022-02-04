import { View, Pressable, StyleSheet, Linking } from "react-native";
import React from "react";
import BaseColors from "../../utils/BaseColors";
import SecondaryText from "../../components/elements/SecondaryText";
import { normalize } from "../../utils/tools";
import StyleConstants from "../../components/tools/StyleConstants";
import { SettingsStackScreens } from "./types";
import Chevron from "../../assets/ChevronSvg";
import PrimaryText from "../../components/elements/PrimaryText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements';


interface Props {
    navigation: any;
}

function SettingsHome({ navigation }: Props) {
    const headerHeight = useHeaderHeight();

    const onNavToEditProfile = () => navigation.navigate(SettingsStackScreens.EditProfile);
    const onNavToEditSubs = () => navigation.navigate(SettingsStackScreens.Subscription);
    const onNavToPassword = () => navigation.navigate(SettingsStackScreens.ResetPassword);
    const onNavToSettings = () => Linking.openURL('x-apple-health://');
    const onRemoveAccount = () => navigation.navigate(SettingsStackScreens.RemoveAccount);
    const onNavToReportBug = () => navigation.navigate(SettingsStackScreens.BugReport);
    const onNavToLegal = () => navigation.navigate(SettingsStackScreens.Legal);


    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <View style={{ height: headerHeight }} />

            <PrimaryText styles={styles.headerText}>Settings</PrimaryText>

            <Pressable style={styles.selectContainer} onPress={onNavToEditProfile}>
                <SecondaryText styles={styles.text} bold>Profile</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>

            <Pressable style={styles.selectContainer} onPress={onNavToEditSubs}>
                <SecondaryText styles={styles.text} bold>Subscription</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>

            <Pressable style={styles.selectContainer} onPress={onNavToPassword}>
                <SecondaryText styles={styles.text} bold>Reset Password</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>

            <Pressable style={styles.selectContainer} onPress={onNavToSettings}>
                <SecondaryText styles={styles.text} bold>Apple Health Permissions</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>

            <Pressable style={styles.selectContainer} onPress={onNavToLegal}>
                <SecondaryText styles={styles.text} bold>Legal</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>

            <Pressable style={styles.selectContainer} onPress={onNavToReportBug}>
                <SecondaryText styles={styles.text} bold>Issue Report</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>


            <Pressable style={styles.selectContainer} onPress={onRemoveAccount}>
                <SecondaryText styles={styles.text} bold>Remove Account</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: StyleConstants.baseMargin,
        paddingTop: 0
    },
    headerText: {
        fontSize: StyleConstants.largeFont,
        color: BaseColors.primary
    },
    selectContainer: {
        padding: StyleConstants.baseMargin,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: BaseColors.white,
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: BaseColors.lightBlack,
        fontSize: StyleConstants.smallerFont
    },
    chev: {
        width: normalize.width(30),
        height: normalize.width(30),
        transform: [{ rotateY: '180deg' }]
    },
    remove: {
        alignSelf: 'center'
    }
})

export default SettingsHome;