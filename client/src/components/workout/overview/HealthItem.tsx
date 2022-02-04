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
    onPress?: () => void;
    label: string;
    text: any;
    edit?: boolean;
    topRight?: React.ReactElement<any, any>;
    topRightColor?: string;
}


const HealthItem = ({ onPress, svg, label, text, edit, topRight, topRightColor }: Props) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.svg}>
                {svg}
            </View>
            <SecondaryText styles={styles.label}>{label}</SecondaryText>
            <PrimaryText styles={styles.text}>{text}</PrimaryText>
            {edit && (
                <View style={styles.topRight}>
                    <PencilSvg fillColor={BaseColors.white} />
                </View>
            )}
            {
                topRight && <View style={[styles.topRight, { backgroundColor: topRightColor ? topRightColor : BaseColors.primary }]}>
                    {topRight}
                </View>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BaseColors.white,
        padding: StyleConstants.baseMargin,
        borderRadius: StyleConstants.borderRadius,
        marginRight: StyleConstants.baseMargin,
        shadowColor: BaseColors.lightPrimary,
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignSelf: 'flex-start'
    },
    svg: {
        width: normalize.width(15),
        height: normalize.width(15),
        marginBottom: StyleConstants.smallMargin
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.lightBlack,
        marginRight: StyleConstants.smallMargin,
        marginBottom: StyleConstants.smallMargin
    },
    text: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        paddingTop: StyleConstants.smallMargin,
    },
    topRight: {
        width: 20,
        height: 20,
        borderRadius: 100,
        padding: 5,
        position: 'absolute',
        top: 5,
        right: 5
    }
})
export default HealthItem;
