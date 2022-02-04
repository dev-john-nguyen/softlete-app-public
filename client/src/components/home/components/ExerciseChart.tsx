import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import BaseColors from '../../../utils/BaseColors';
import Constants from '../../../utils/Constants';
import Fonts from '../../../utils/Fonts';
import { normalize } from '../../../utils/tools';
import EmptyChart from '../../data-overview/components/EmptyChart';
import ExerciseChartItem from './ExerciseChartItem';

interface Props {
    data: {
        date: Date,
        value: number
    }[];
}


const ExerciseChart = ({ data }: Props) => {
    const [activeDot, setActiveDot] = useState<number | undefined>();
    const [months, setMonths] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);


    useEffect(() => {
        if (data.length > 0) {
            const m = _.unionWith(data, (a, b) => {
                return a.date.getMonth() === b.date.getMonth()
            }).map(m => Constants.months[m.date.getMonth()].slice(0, 3));
            const vals = data.map(d => d.value);
            setValues(vals)
            setMonths(m)
            setActiveDot(data.length > 3 ? data.length - 1 : undefined)
        } else {
            setMonths([])
            setValues([])
        }
    }, [data])

    if (values.length < 4) {
        return <EmptyChart />
    }

    return (
        <View>
            <LineChart
                data={{
                    labels: months,
                    datasets: [{
                        data: values,

                    }]
                }}
                width={normalize.width(1)}
                height={normalize.height(4)}
                withVerticalLabels={true}
                withVerticalLines={false}
                segments={4}
                bezier
                renderDotContent={(props) => <ExerciseChartItem key={props.index} props={props} isActive={activeDot === props.index} data={data} />}
                onDataPointClick={(props) => setActiveDot(props.index)}
                chartConfig={{
                    backgroundGradientFrom: 'transparent',
                    backgroundGradientTo: 'transparent',
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(${BaseColors.primaryRgb}, ${opacity})`,
                    labelColor: (opacity = 1) => BaseColors.primary,
                    style: {
                        backgroundColor: 'transparent'
                    },
                    propsForLabels: {
                        fontSize: 12,
                        fontFamily: Fonts.secondaryBold,
                    },
                    propsForDots: {
                        r: ".5",
                        strokeWidth: "4",
                        stroke: BaseColors.primary
                    },
                    strokeWidth: 2,
                }}
                style={{
                    marginHorizontal: '-2%',
                    marginTop: 5,
                    backgroundColor: 'transparent'
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})
export default ExerciseChart;