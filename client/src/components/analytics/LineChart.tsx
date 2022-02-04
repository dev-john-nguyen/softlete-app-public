import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import BaseColors from '../../utils/BaseColors';
import Constants from '../../utils/Constants';
import { normalize } from '../../utils/tools';
import EmptyChart from '../data-overview/components/EmptyChart';
import GraphItem from './GraphItem';

interface Props {
    data: number[];
    dates: Date[];
}


const CustomLineChart = ({ data, dates }: Props) => {
    const [activeDot, setActiveDot] = useState<number | undefined>();
    const [months, setMonths] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);


    useEffect(() => {
        if (data.length > 0) {
            const m = _.unionWith(dates, (a, b) => {
                return a.getMonth() === b.getMonth()
            }).map(m => Constants.months[m.getMonth()].slice(0, 3));
            setValues(data)
            setMonths(m)
            setActiveDot(data.length > 3 ? data.length - 1 : undefined)
        } else {
            setMonths([])
            setValues([])
        }
    }, [data])

    if (values.length < 5) return <EmptyChart />

    return (
        <LineChart
            data={{
                labels: months,
                datasets: [{
                    data: values
                }]
            }}
            width={normalize.width(1)}
            height={normalize.height(2)}
            renderDotContent={(props) => <GraphItem key={props.index} props={props} isActive={activeDot === props.index} dates={dates} />}
            onDataPointClick={(props) => setActiveDot(props.index)}
            bezier
            fromZero
            chartConfig={{
                backgroundGradientFrom: BaseColors.lightWhite,
                backgroundGradientTo: BaseColors.lightWhite,
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(${BaseColors.primaryRgb}, ${opacity})`,
                labelColor: (opacity = 1) => BaseColors.primary,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: ".5",
                    strokeWidth: "5",
                    stroke: BaseColors.primary
                }
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {

    }
})
export default CustomLineChart;