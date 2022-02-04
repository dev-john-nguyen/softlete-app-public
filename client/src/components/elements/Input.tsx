import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { StyleProp, StyleSheet } from 'react-native';
import StyleConstants from '../tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';


interface Props {
    placeholder?: string;
    onChangeText: (txt: string) => void;
    value?: string;
    keyboardType?: 'numeric';
    maxLength?: number;
    autoCapitalize?: TextInputProps['autoCapitalize'];
    textContentType?: TextInputProps['textContentType'];
    secureTextEntry?: boolean;
    multiline?: boolean;
    onSubmitEditing?: () => void;
    numbers?: boolean;
    onBlur?: () => void;
    editable?: boolean;
    onFocus?: () => void;
    styles?: StyleProp<any>;
    autoCorrect?: TextInputProps['autoCorrect'];
    blurOnSubmit?: boolean;
    inputRef?: any;
}

export default ({ placeholder, onChangeText, value, keyboardType, maxLength, autoCapitalize, textContentType, secureTextEntry, multiline, onSubmitEditing, numbers, onBlur, editable, onFocus, styles, autoCorrect, blurOnSubmit, inputRef }: Props) => (
    <TextInput
        style={[baseStyles.input, {
            fontSize: numbers ? StyleConstants.numFont : StyleConstants.smallFont,
            paddingTop: multiline ? 15 : undefined,
            backgroundColor: editable || editable == null ? BaseColors.white : BaseColors.lightWhite,
            color: editable || editable == null ? BaseColors.black : BaseColors.medGrey
        }, styles]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
        textContentType={textContentType ? textContentType : 'none'}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        onSubmitEditing={onSubmitEditing}
        onBlur={onBlur}
        editable={editable || editable == null ? true : false}
        onFocus={onFocus}
        autoCorrect={autoCorrect}
        blurOnSubmit={blurOnSubmit}
        ref={inputRef}
    />
)

const baseStyles = StyleSheet.create({
    input: {
        padding: 15,
        fontFamily: 'Lato-Regular',
        borderRadius: StyleConstants.borderRadius,
        borderWidth: 1,
        borderColor: BaseColors.lightGrey
    }
})