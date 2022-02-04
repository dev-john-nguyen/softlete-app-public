import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';
import SecondaryText from '../../elements/SecondaryText';
import StyleConstants from '../../tools/StyleConstants';


interface Props {
    num: string;
    label: string;
    svg: React.ReactElement<any, any>;
    topLeftSvg?: React.ReactElement<any, any>;
    topRightSvg?: React.ReactElement<any, any>;
    onPress?: () => void;
}


const StatsItem = ({ num, label, svg, topLeftSvg, topRightSvg, onPress }: Props) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.tlSvg}>
                {topLeftSvg}
            </View>
            <View style={styles.trSvg}>
                {topRightSvg}
            </View>
            <View style={styles.svg}>
                {svg}
            </View>
            <SecondaryText styles={styles.label}>{label}</SecondaryText>
            <SecondaryText styles={styles.text} bold>{num}</SecondaryText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BaseColors.white,
        padding: StyleConstants.baseMargin,
        marginRight: StyleConstants.baseMargin,
        marginTop: StyleConstants.smallMargin,
        marginBottom: StyleConstants.smallMargin,
        borderRadius: StyleConstants.borderRadius,
        shadowColor: BaseColors.lightPrimary,
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    label: {
        color: BaseColors.lightBlack,
        fontSize: StyleConstants.extraSmallFont,
        marginTop: 5
    },
    text: {
        color: BaseColors.black,
        marginTop: 5,
        fontSize: StyleConstants.smallFont
    },
    svg: {
        width: normalize.width(15),
        height: normalize.width(15),
    },
    tlSvg: {
        width: normalize.width(25),
        height: normalize.width(25),
        position: 'absolute',
        top: 5,
        left: 5
    },
    trSvg: {
        width: normalize.width(25),
        height: normalize.width(25),
        position: 'absolute',
        top: 5,
        right: 5
    }
})
export default StatsItem;