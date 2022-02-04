import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { StyleProp, StyleSheet } from 'react-native';
import Colors, { rgba } from '../../utils/BaseColors';
import BaseColors from '../../utils/BaseColors';
import StyleConstants from '../tools/StyleConstants';


interface Props {
    styles?: StyleProp<any>;
    children: any;
    onPress: () => void;
    loading?: boolean;
}

export default ({ styles, children, onPress, loading }: Props) => (
    <Pressable
        style={({ pressed }) => {
            return [baseStyles.container, {
                backgroundColor: pressed ? rgba(BaseColors.primaryRgb, .5) : BaseColors.primary,
            }, styles]
        }}
        onPress={onPress}
    >
        <Text style={[baseStyles.text, {
            fontSize: styles?.fontSize ? styles.fontSize : StyleConstants.smallFont,
            textTransform: styles?.textTransform ? styles.textTransform : 'capitalize'
        }]}>
            {children}
        </Text>
        {
            loading && (
                <ActivityIndicator size='small' color={BaseColors.white} style={{ marginLeft: 5 }} />
            )
        }
    </Pressable>
)

const baseStyles = StyleSheet.create({
    container: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    text: {
        color: Colors.white,
        fontFamily: 'Raleway',
        letterSpacing: .3,
    }
})