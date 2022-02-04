import React from 'react';
import { Switch } from 'react-native';
import { StyleProp, StyleSheet } from 'react-native';
import { normalize } from '../../utils/tools';
import BaseColors from '../../utils/BaseColors';


interface Props {
    styles?: StyleProp<any>;
    onSwitch: () => void;
    active: boolean
}

export default ({ styles, onSwitch, active }: Props) => (
    <Switch
        trackColor={{ false: BaseColors.secondary, true: BaseColors.primary }}
        thumbColor={active ? BaseColors.white : BaseColors.white}
        ios_backgroundColor={BaseColors.secondary}
        onValueChange={onSwitch}
        value={active}
        style={styles}
    />
)

const baseStyles = StyleSheet.create({
    base: {
        height: normalize.width(20),
        width: normalize.width(20),
        borderRadius: 100
    }
})