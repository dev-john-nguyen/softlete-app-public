import _ from 'lodash';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CategorySvg from '../../../assets/CategorySvg';
import ClockSvg from '../../../assets/ClockSvg';
import DevicesSvg from '../../../assets/DevicesSvg';
import FireSvg from '../../../assets/FireSvg';
import GraphSvg from '../../../assets/GraphSvg';
import HeartSvg from '../../../assets/HeartSvg';
import RulerSvg from '../../../assets/RulerSvg';
import { HealthDataProps, WorkoutStatus } from '../../../services/workout/types';
import BaseColors from '../../../utils/BaseColors';
import { renderHealthActivityName } from '../../../utils/format';
import { normalize } from '../../../utils/tools';
import StyleConstants from '../../tools/StyleConstants';
import HealthItem from './HealthItem';
import HeartRateChart from './HeartRateChart';
import { convertMsToTime, renderCalories, renderDistance, renderHeartRateAvg } from './helpers/format';


interface Props {
    data?: HealthDataProps;
    status: string;
}


const HealthContainer = ({ data, status }: Props) => {
    const [showGraph, setShowGraph] = useState(false);

    const color = status === WorkoutStatus.completed ? BaseColors.green : BaseColors.primary

    if (showGraph) {
        return (
            <HeartRateChart
                data={data && data.heartRates ? data.heartRates : []}
                onBack={() => setShowGraph(false)}
                color={color}
            />
        )
    }


    return (
        <ScrollView contentContainerStyle={{ alignItems: 'flex-start' }} horizontal>
            <HealthItem svg={<CategorySvg fillColor={color} />} label='Activity' text={data ? renderHealthActivityName(data.activityName) : 'Activity'} />
            <HealthItem svg={<DevicesSvg fillColor={color} />} label='Source' text={data ? data.sourceName : 'unknown'} />
            <HealthItem svg={<ClockSvg fillColor={color} />} label='Duration' text={data ? convertMsToTime(data.duration) : '0 sec'} />
            <HealthItem svg={<RulerSvg fillColor={color} />} label='Distance' text={`${data ? renderDistance(data.distance) : 0} ${data?.disMeas ? data.disMeas : 'mi'}`} />
            <HealthItem svg={<HeartSvg fillColor={color} />} topRight={<GraphSvg fillColor={BaseColors.white} />} topRightColor={color} label='Avg HR' text={`${renderHeartRateAvg(data?.heartRates)} bpm`} onPress={() => setShowGraph(true)} />
            <HealthItem svg={<FireSvg fillColor={color} />} label='Calories' text={data ? renderCalories(data.calories) : '0 kcal'} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    itemContainer: {
        marginTop: StyleConstants.baseMargin,
        backgroundColor: BaseColors.white,
        padding: StyleConstants.baseMargin,
        borderRadius: StyleConstants.borderRadius,
        marginRight: StyleConstants.baseMargin,
        shadowColor: BaseColors.lightPrimary,
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    svg: {
        width: normalize.width(15),
        height: normalize.width(15),
        marginBottom: StyleConstants.smallMargin
    },
    label: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.secondary,
        marginRight: StyleConstants.smallMargin,
        marginBottom: StyleConstants.smallMargin
    },
    text: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.primary,
        paddingTop: StyleConstants.baseMargin,
    },
})
export default HealthContainer;
