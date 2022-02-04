import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';
import SecondaryText from '../../elements/SecondaryText';
import StyleConstants from '../../tools/StyleConstants';

interface Props {
    svg: React.ReactElement<any, any>;
    onPress?: () => void;
    label: string;
    text: any;
    edit?: boolean;
    color: string;
}


const PreviewAerobicItem = ({ svg, label, text, edit, color }: Props) => {
    return (
        <View style={styles.container}>
            <SecondaryText styles={[styles.text, {
                color: BaseColors.lightBlack
            }]}>{text}</SecondaryText>
            <View style={styles.svg}>
                {svg}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    svg: {
        height: normalize.width(30),
        width: normalize.width(30)
    },
    text: {
        fontSize: normalize.width(28),
    },
})
export default PreviewAerobicItem;