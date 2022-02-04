import React from 'react';
import { StyleSheet, View } from 'react-native';
import ClockSvg from '../../../assets/ClockSvg';
import FireSvg from '../../../assets/FireSvg';
import HeartSvg from '../../../assets/HeartSvg';
import RulerSvg from '../../../assets/RulerSvg';
import { HealthDataProps } from '../../../services/workout/types';
import BaseColors from '../../../utils/BaseColors';
import { convertMsToTime, renderDistance, renderHeartRateAvg, renderCalories } from '../../workout/overview/helpers/format';
import AerobicItem from './AerobicItem';


interface Props {
    healthData?: HealthDataProps;
    color: string;
    onPress: () => void;
}

const WoAerobic = ({ healthData, onPress, color }: Props) => {
    return (
        <View style={styles.container}>
            <AerobicItem svg={<ClockSvg fillColor={color} />} label='Duration' text={healthData ? convertMsToTime(healthData.duration) : '0 sec'} onPress={onPress} />
            <AerobicItem svg={<RulerSvg fillColor={color} />} label='Distance' text={`${healthData ? renderDistance(healthData.distance) : 0} ${healthData?.disMeas ? healthData.disMeas : 'mi'}`} onPress={onPress} />
            <AerobicItem svg={<HeartSvg fillColor={color} />} label='Avg HR' text={`${renderHeartRateAvg(healthData?.heartRates)} bpm`} onPress={onPress} />
            <AerobicItem svg={<FireSvg fillColor={color} />} label='Calories' text={healthData ? renderCalories(healthData.calories) : '0 kcal'} onPress={onPress} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})
export default WoAerobic;