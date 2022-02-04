import React from 'react';
import { Text } from 'react-native';
import { StyleProp, StyleSheet } from 'react-native';
import { normalize } from '../../utils/tools';


interface Props {
    styles?: StyleProp<any>;
    placeholder?: string;
    children: any;
    numberOfLines?: number
}

export default ({ styles, children, numberOfLines }: Props) => (
    <Text
        style={[styles, baseStyles.base, { letterSpacing: styles?.letterSpacing ? styles.letterSpacing : .5 }]}
        numberOfLines={numberOfLines}
        adjustsFontSizeToFit
    >
        {children}
    </Text>
)

const baseStyles = StyleSheet.create({
    base: {
        fontFamily: 'Raleway-Bold'
    }
})