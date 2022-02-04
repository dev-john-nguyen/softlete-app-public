import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ClockSvg from '../../../assets/ClockSvg';
import FireSvg from '../../../assets/FireSvg';
import HeartSvg from '../../../assets/HeartSvg';
import RulerSvg from '../../../assets/RulerSvg';
import { HealthDataProps, WorkoutStatus } from '../../../services/workout/types';
import BaseColors from '../../../utils/BaseColors';
import { renderCalories, convertMsToTime, renderDistance, renderHeartRateAvg } from '../overview/helpers/format';
import PreviewAerobicItem from './PreviewAerobicItem';


interface Props {
    data?: HealthDataProps;
    color: string;
}


const PreviewAerobic = ({ data, color }: Props) => {
    return (
        <View style={styles.container}>
            <PreviewAerobicItem svg={<FireSvg fillColor={color} />} label='Calories' text={data ? renderCalories(data.calories) : '0 kcal'} color={color} />
            <PreviewAerobicItem svg={<ClockSvg fillColor={color} />} label='Duration' text={data ? convertMsToTime(data.duration) : '0 sec'} color={color} />
            <PreviewAerobicItem svg={<RulerSvg fillColor={color} />} label='Distance' text={`${data ? renderDistance(data.distance) : 0} ${data?.disMeas ? data.disMeas : 'mi'}`} color={color} />
            <PreviewAerobicItem svg={<HeartSvg fillColor={color} />} label='Distance' text={`${data ? renderHeartRateAvg(data.heartRates) : 0} bpm`} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})
export default PreviewAerobic;