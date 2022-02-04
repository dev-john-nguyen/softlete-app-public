import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import StyleConstants from '../../../tools/StyleConstants';
import BaseColors from '../../../../utils/BaseColors';
import Input from '../../../elements/Input';
import SecondaryText from '../../../elements/SecondaryText';


interface Props {
    onPress: () => void;
    text: string;
    editable: boolean;
}


const AddSet = ({ onPress, text, editable }: Props) => {
    if (!editable) return <></>

    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [styles.setsContainer, { backgroundColor: pressed ? BaseColors.white : 'transparent' }]}
                onPress={onPress}
            >
                <SecondaryText styles={styles.sets}>{text}</SecondaryText>
            </Pressable>
            <View style={{ flex: 1, marginRight: StyleConstants.smallMargin }}>
                <Input
                    value={''}
                    onChangeText={() => undefined}
                    numbers={true}
                    editable={false}
                    styles={{ opacity: 0 }}
                />
            </View>
            <View style={{ flex: .5, marginRight: StyleConstants.smallMargin }} />
            <View style={{ flex: .5 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: StyleConstants.smallMargin
    },
    text: {
        color: BaseColors.primary,
        fontSize: StyleConstants.smallFont
    },
    setsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .4,
        borderRadius: StyleConstants.borderRadius,
        borderWidth: 1,
        borderColor: BaseColors.lightGrey,
        marginRight: 5,
    },
    sets: {
        fontSize: StyleConstants.numFont,
    }
})
export default AddSet;