import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Chevron from '../assets/ChevronSvg';
import BaseColors from '../utils/BaseColors';
import { normalize } from '../utils/tools';
import StyleConstants from './tools/StyleConstants';


interface Props {
    onPress: () => void;
    color?: string;
}


const BackButton = ({ onPress, color }: Props) => {
    return (
        <Pressable style={styles.container} onPress={onPress} hitSlop={5} >
            <Chevron strokeColor={color ? color : BaseColors.black} />
        </Pressable >
    )
}

const styles = StyleSheet.create({
    container: {
        height: normalize.width(25), width: normalize.width(25), marginLeft: StyleConstants.smallMargin
    }
})
export default BackButton;