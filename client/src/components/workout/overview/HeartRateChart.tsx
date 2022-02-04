import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import CloseSvg from '../../../assets/CloseSvg';
import BaseColors from '../../../utils/BaseColors';
import { normalize } from '../../../utils/tools';
import PrimaryText from '../../elements/PrimaryText';
import SecondaryText from '../../elements/SecondaryText';
import StyleConstants from '../../tools/StyleConstants';

interface Props {
    data: number[];
    onBack: () => void;
    dates?: string[];
    color?: string;
}


const HeartRateChart = ({ data, onBack, dates, color }: Props) => {

    return (
        <View>
            <View style={styles.headerContainer}>
                <SecondaryText styles={styles.label}>
                    bpm
                </SecondaryText>
                <PrimaryText styles={styles.headerText}>Heart Rate</PrimaryText>
                <Pressable style={styles.back} hitSlop={5} onPress={onBack}>
                    <CloseSvg fillColor={BaseColors.black} />
                </Pressable>
            </View>
            <LineChart
                data={{
                    labels: dates ? dates : [],
                    datasets: [{
                        data: data.length < 2 ? [0] : data
                    }]
                }}
                width={normalize.width(1)}
                height={normalize.height(5)}
                withVerticalLines={false}
                bezier
                segments={4}
                withDots={false}
                chartConfig={{
                    backgroundGradientFrom: BaseColors.lightWhite,
                    backgroundGradientTo: BaseColors.lightWhite,
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => color ? color : BaseColors.primary,
                    labelColor: (opacity = 1) => color ? color : BaseColors.primary,
                    style: {
                    },
                    propsForLabels: {
                        fontSize: 10
                    },
                    propsForDots: {
                        r: "2",
                        strokeWidth: "0",
                        stroke: color ? color : BaseColors.primary
                    },
                    strokeWidth: 2
                }}
                style={{
                    alignSelf: 'center',
                    right: normalize.width(25),
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    headerText: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.lightBlack,
    },
    label: {
        fontSize: 12,
        color: BaseColors.secondary
    },
    back: {
        fontSize: StyleConstants.extraSmallFont,
        width: normalize.width(30),
        height: normalize.width(30)
    }
})
export default HeartRateChart;