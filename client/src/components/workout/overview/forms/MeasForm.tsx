import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import StyleConstants from '../../../tools/StyleConstants';
import BaseColors from '../../../../utils/BaseColors';
import Fonts from '../../../../utils/Fonts';
import SecondaryText from '../../../elements/SecondaryText';
import { normalize } from '../../../../utils/tools';
import { capitalize } from 'lodash';
import Input from '../../../elements/Input';
import { HealthDisMeas } from '../../../../services/workout/types';

interface Props {
    onMeasChange: (txt: HealthDisMeas) => void;
    meas: string;
    onChangeDistance: (txt: string) => void;
    distance: string;
    disPlaceHolder: string;
}


const MeasForm = ({ onMeasChange, meas, onChangeDistance, distance, disPlaceHolder }: Props) => {
    return (
        <View>
            <SecondaryText styles={styles.title} bold>Distance</SecondaryText>
            <View style={styles.container}>
                <View style={{ maxWidth: '40%', marginRight: 5 }}>
                    <SecondaryText styles={styles.label}>Value</SecondaryText>
                    <Input
                        value={distance}
                        onChangeText={onChangeDistance}
                        styles={{ marginBottom: StyleConstants.smallMargin }}
                        placeholder={disPlaceHolder}
                        keyboardType='numeric'
                        maxLength={4}
                    />
                </View>
                {/* <View style={{ width: '60%' }}>
                    <SecondaryText styles={styles.label}>Measurement</SecondaryText>
                    <Picker
                        style={{
                            width: '100%',
                            backgroundColor: BaseColors.white,
                            borderRadius: StyleConstants.borderRadius,
                        }}
                        itemStyle={styles.itemStyle}
                        enabled={false}
                        selectedValue={meas}
                        onValueChange={(itemValue: string) => onMeasChange(itemValue as any)}
                    >
                        {Object.values(HealthDisMeas).map((d, i) => (
                            <Picker.Item value={d} key={d} label={capitalize(d)} />
                        ))}
                    </Picker>
                </View> */}
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
        fontSize: StyleConstants.extraSmallFont,
        fontFamily: Fonts.secondary,
        color: BaseColors.black,
        textTransform: 'capitalize',
        height: normalize.height(15)
    },
    label: {
        fontSize: StyleConstants.extraSmallFont,
        marginBottom: 10,
        color: BaseColors.lightBlack,
        textTransform: 'lowercase'
    },
    title: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginRight: StyleConstants.smallMargin,
        marginBottom: StyleConstants.smallMargin
    }
})
export default MeasForm;