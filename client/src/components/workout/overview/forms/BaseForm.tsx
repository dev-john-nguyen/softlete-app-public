import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyleConstants from '../../../tools/StyleConstants';
import BaseColors from '../../../../utils/BaseColors';
import SecondaryText from '../../../elements/SecondaryText';
import Input from '../../../elements/Input';

interface Props {
    onChange: (txt: string) => void;
    value: string;
    placeholder: string;
    title: string;
    label: string;
}


const BaseForm = ({ onChange, value, placeholder, title, label }: Props) => {
    return (
        <View>
            <SecondaryText styles={styles.title} bold>{title}</SecondaryText>
            <View style={styles.container}>
                <SecondaryText styles={styles.label}>{label}</SecondaryText>
                <Input
                    value={value}
                    onChangeText={onChange}
                    styles={{ width: '50%' }}
                    placeholder={placeholder}
                    keyboardType='numeric'
                    maxLength={5}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: StyleConstants.baseMargin
    },
    label: {
        fontSize: StyleConstants.extraSmallFont,
        marginBottom: 10,
        color: BaseColors.lightBlack,
        textTransform: 'capitalize'
    },
    title: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginRight: StyleConstants.smallMargin,
        marginBottom: StyleConstants.smallMargin
    }
})
export default BaseForm;