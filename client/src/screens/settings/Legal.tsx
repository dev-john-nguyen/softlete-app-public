import React from 'react';
import { Text, StyleSheet, View, Pressable, Linking } from 'react-native';
import StyleConstants from '../../components/tools/StyleConstants';
import { useHeaderHeight } from '@react-navigation/elements';
import PrimaryText from '../../components/elements/PrimaryText';
import BaseColors from '../../utils/BaseColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { normalize } from '../../utils/tools';
import Chevron from '../../assets/ChevronSvg';
import SecondaryText from '../../components/elements/SecondaryText';
import { SERVERURL } from '../../utils/PATHS';

interface Props {

}


const Legal = ({ }: Props) => {
    const headerHeight = useHeaderHeight();

    const onPP = async () => {
        const url = SERVERURL + 'privacy-policy'
        const canOpen = await Linking.canOpenURL(url)
        if (canOpen) {
            Linking.openURL(url)
        }
    }
    const onTOU = async () => {
        const url = SERVERURL + 'terms'
        const canOpen = await Linking.canOpenURL(url)
        if (canOpen) {
            Linking.openURL(url)
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <View style={{ height: headerHeight }} />
            <PrimaryText styles={styles.headerText}>Legal</PrimaryText>

            <Pressable style={styles.selectContainer} onPress={onPP}>
                <SecondaryText styles={styles.text} bold>Privacy Policy</SecondaryText>
                <View style={styles.chev}>
                    <Chevron strokeColor={BaseColors.lightBlack} />
                </View>
            </Pressable>


            <Pressable style={styles.selectContainer} onPress={onTOU}>
                <SecondaryText styles={styles.text} bold>Terms Of Use</SecondaryText>
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
})
export default Legal;