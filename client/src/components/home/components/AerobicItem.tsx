import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import PencilSvg from '../../../assets/PencilSvg';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';
import PrimaryText from '../../elements/PrimaryText';
import SecondaryText from '../../elements/SecondaryText';
import StyleConstants from '../../tools/StyleConstants';


interface Props {
    svg: React.ReactElement<any, any>;
    label: string;
    text: any;
    onPress: () => void;
}


const AerobicItem = ({ svg, label, text, onPress }: Props) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.svg}>
                {svg}
            </View>
            {/* <SecondaryText styles={styles.label}>{label}</SecondaryText> */}
            <SecondaryText styles={styles.text} bold>{text}</SecondaryText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BaseColors.white,
        padding: StyleConstants.baseMargin,
        borderRadius: StyleConstants.borderRadius,
        marginLeft: StyleConstants.smallMargin,
        marginRight: StyleConstants.smallMargin,
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
    svg: {
        width: normalize.width(20),
        height: normalize.width(20),
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.secondary,
        marginTop: 5,
    },
    text: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        paddingTop: 10,
    }
})
export default AerobicItem;
