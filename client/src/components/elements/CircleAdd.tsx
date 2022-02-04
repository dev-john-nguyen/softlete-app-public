import React from 'react';
import { View, StyleSheet, Pressable, StyleProp } from 'react-native';
import { normalize } from '../../utils/tools';
import BaseColors from '../../utils/BaseColors';
import PlusSvg from '../../assets/PlusSvg';


interface Props {
    onPress: () => void;
    style?: StyleProp<any>
}


const CircleAdd = ({ onPress, style }: Props) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <View style={styles.plus}>
                <PlusSvg strokeColor={BaseColors.white} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        backgroundColor: BaseColors.primary,
        padding: normalize.width(30),
        alignSelf: 'center',
        position: 'absolute',
        bottom: '2%',
        zIndex: 1
    },
    plus: {
        width: normalize.width(20),
        height: normalize.width(20),
    }
})
export default CircleAdd;