import React from 'react';
import { View, StyleSheet } from 'react-native';
import BaseColors from '../../utils/BaseColors';
import StyleConstants from '../tools/StyleConstants';
import _ from 'lodash';
import SecondaryText from '../elements/SecondaryText';
import { normalize } from '../../utils/tools';
import CustomLineChart from './LineChart';
import Constants from '../../utils/Constants';

interface Props {
    data: any;
    dates: Date[];
}


const AnalyticsGraph = ({ dates, data }: Props) => {
    const renderHeaderDates = () => {
        const start = dates[0];
        const end = dates[dates.length - 1];
        const startStr = Constants.months[start.getMonth()].slice(0, 3) + ' ' + start.getDate()
        const endStr = Constants.months[end.getMonth()].slice(0, 3) + ' ' + end.getDate()
        return startStr + ' - ' + endStr
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <SecondaryText styles={styles.headerText} bold>{renderHeaderDates()}</SecondaryText>
            </View>
            <View style={{ flex: 1 }}>
                <CustomLineChart
                    data={data}
                    dates={dates}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: normalize.width(1)
    },
    headerContainer: {
        padding: StyleConstants.baseMargin,
    },
    headerText: {
        fontSize: StyleConstants.mediumFont,
        textAlign: 'center',
        color: BaseColors.black
    },
    headerSubText: {
        color: BaseColors.black,
        fontSize: StyleConstants.smallFont
    },
    progressContainer: {
        marginTop: normalize.height(14),
        height: normalize.height(2.5),
        marginBottom: StyleConstants.largeMargin,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        fontSize: StyleConstants.smallMediumFont,
        color: BaseColors.white
    }
})

export default AnalyticsGraph;
