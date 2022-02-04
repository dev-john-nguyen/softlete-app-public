import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import PlusSvg from '../../../assets/PlusSvg';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';
import StyleConstants from '../../tools/StyleConstants';
import { HomeBoxShadow } from '../types';

interface Props {
    onPress: () => void;
}


const WoAdd = ({ onPress }: Props) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.add}>
                <PlusSvg strokeColor={BaseColors.primary} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: StyleConstants.baseMargin,
        marginLeft: StyleConstants.baseMargin,
        height: normalize.height(4.5),
        borderWidth: .3,
        borderColor: BaseColors.lightGrey,
        backgroundColor: BaseColors.primary,
        borderRadius: StyleConstants.borderRadius,
        ...HomeBoxShadow
    },
    add: {
        width: normalize.width(10),
        height: normalize.width(10),
        borderRadius: 100,
        backgroundColor: BaseColors.white,
        padding: 12,
    }
})
export default WoAdd;