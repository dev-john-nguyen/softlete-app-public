import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import Constants from '../../utils/Constants';
import PrimaryText from '../elements/PrimaryText';
import StyleConstants from '../tools/StyleConstants';
import BaseColors from '../../utils/BaseColors';
import { normalize } from '../../utils/tools';
import Chevron from '../../assets/ChevronSvg';
import HeaderMenu from '../Menu';
import { } from 'react-native-calendars';
import _ from 'lodash';
import SecondaryText from '../elements/SecondaryText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { months } = Constants;

interface Props {
    addMonth: any;
    monthProps: any;
    loading: boolean;
    offline: boolean;
    goOnline?: () => void;
}

function monthDiff(dateFrom: Date, dateTo: Date) {
    return dateTo.getMonth() - dateFrom.getMonth() +
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
}

const areEqual = (prevProps: Props, nextProps: Props) => _.isEqual(prevProps, nextProps)

const CalendarHeader = ({ addMonth, monthProps, loading, offline }: Props) => {
    const arrowNext = () => (!loading) && addMonth(1);
    const arrowPrev = () => (!loading) && addMonth(-1);
    const insets = useSafeAreaInsets();

    const goToThisMonth = () => {
        //find month differenct
        const thisMonth = new Date();
        const curMonth = monthProps
        const diffTime = monthDiff(curMonth, thisMonth);
        if (diffTime === 0) return;
        addMonth(diffTime)
    }

    const renderDate = () => months[monthProps.getMonth()];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* <View style={[styles.yearContainer, {
                backgroundColor: offline ? BaseColors.lightGrey : BaseColors.primary,
                marginTop: insets.top / 2
            }]}>
                <SecondaryText styles={[styles.year, {
                    color: offline ? BaseColors.white : BaseColors.white
                }]} bold>{monthProps.getFullYear()}</SecondaryText>
            </View> */}
            <View style={styles.topContainer}>
                <View style={styles.headerContainer}>

                    <Pressable style={[styles.chev]} onPress={arrowPrev} hitSlop={5}>
                        <Chevron strokeColor={(!loading) ? BaseColors.black : BaseColors.lightGrey} />
                    </Pressable>

                    {
                        loading ?
                            <ActivityIndicator size='small' color={BaseColors.black} />
                            :
                            <Pressable style={styles.calendarNameContainer} onPress={goToThisMonth}>
                                <PrimaryText styles={styles.month}>{renderDate()}</PrimaryText>
                            </Pressable>

                    }

                    <Pressable style={[styles.chev, {
                        transform: [{ rotateZ: '-180deg' }]
                    }]} onPress={arrowNext} hitSlop={5}>
                        <Chevron strokeColor={(!loading) ? BaseColors.black : BaseColors.lightGrey} />
                    </Pressable>

                </View>
            </View>
            <View style={styles.dayContainer}>
                {Constants.daysOfWeek.map(d => (
                    <SecondaryText key={d} styles={styles.dayHeader} bold>{d.slice(0, 3)}</SecondaryText>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        zIndex: 1000,
    },
    topContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: StyleConstants.baseMargin,
        paddingTop: StyleConstants.smallMargin,
        alignSelf: 'flex-end'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    calendarNameContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    dayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: StyleConstants.smallMargin,
    },
    dayHeader: {
        fontSize: 14,
        textTransform: 'capitalize',
        color: BaseColors.lightBlack,
        flex: 1,
        textAlign: 'center'
    },
    chevContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: StyleConstants.baseMargin
    },
    chev: {
        width: normalize.width(25),
        height: normalize.width(25),
        alignSelf: 'center'
    },
    network: {
        width: normalize.width(40),
        height: normalize.width(40),
    },
    month: {
        fontSize: 18,
        color: BaseColors.black,
        textTransform: 'uppercase'
    },
    year: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.white,
    },
    yearContainer: {
        backgroundColor: BaseColors.primary,
        borderRadius: 100,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'flex-end',
        marginRight: StyleConstants.baseMargin
    },
    svg: {
        width: normalize.height(40),
        height: normalize.height(40)
    },
    offline: {
        color: BaseColors.secondary,
        alignSelf: 'center',
        marginLeft: StyleConstants.baseMargin
    }
})
export default React.memo(CalendarHeader, areEqual);