import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import StyleConstants from '../../../tools/StyleConstants';
import BaseColors from '../../../../utils/BaseColors';
import Fonts from '../../../../utils/Fonts';
import SecondaryText from '../../../elements/SecondaryText';
import { normalize } from '../../../../utils/tools';

interface Props {
    onDurationUpdate: (num: number) => void;
}


const DurationForm = ({ onDurationUpdate }: Props) => {
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);

    useEffect(() => {
        const ms = (hours * 60 * 60 + mins * 60) * 1000;
        onDurationUpdate(ms)
    }, [hours, mins])


    return (
        <View>
            <SecondaryText styles={styles.title} bold>Duration</SecondaryText>
            <View style={styles.container}>
                <View style={{ width: '40%' }}>
                    <SecondaryText styles={styles.label}>Hours</SecondaryText>
                    <Picker
                        style={{
                            width: '100%',
                            backgroundColor: BaseColors.white,
                            borderRadius: StyleConstants.borderRadius,
                        }}
                        itemStyle={styles.itemStyle}
                        enabled={false}
                        selectedValue={hours}
                        onValueChange={(itemValue: number) => setHours(itemValue)}
                    >
                        {new Array(24).fill('').map((_, i) => (
                            <Picker.Item value={i} key={i} label={i.toString()} />
                        ))}
                    </Picker>
                </View>
                <View style={{ width: '40%', marginLeft: StyleConstants.baseMargin }}>
                    <SecondaryText styles={styles.label}>Minutes</SecondaryText>
                    <Picker
                        style={{
                            width: '100%',
                            backgroundColor: BaseColors.white,
                            borderRadius: StyleConstants.borderRadius,
                        }}
                        itemStyle={styles.itemStyle}
                        enabled={false}
                        selectedValue={mins}
                        onValueChange={(itemValue: number) => setMins(itemValue)}
                    >
                        {new Array(60).fill('').map((_, i) => (
                            <Picker.Item value={i} key={i} label={i.toString()} />
                        ))}
                    </Picker>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: StyleConstants.baseMargin
    },
    itemStyle: {
        fontSize: StyleConstants.smallMediumFont,
        fontFamily: Fonts.secondary,
        color: BaseColors.black,
        textTransform: 'capitalize',
        height: normalize.height(15)
    },
    label: {
        fontSize: StyleConstants.extraSmallFont,
        marginBottom: 10,
        color: BaseColors.lightBlack
    },
    title: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginRight: StyleConstants.smallMargin,
        marginBottom: StyleConstants.smallMargin
    }
})
export default DurationForm;