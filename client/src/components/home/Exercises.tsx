import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ExerciseProps } from '../../services/exercises/types';
import { AnalyticsProps, MiscActionProps, PinExerciseProps } from '../../services/misc/types';
import BaseColors from '../../utils/BaseColors';
import { normalize } from '../../utils/tools';
import PrimaryText from '../elements/PrimaryText';
import StyleConstants from '../tools/StyleConstants';
import WoExerciseChart from './components/WoExerciseChart';
import CustomPicker from '../elements/Picker';
import { Picker } from '@react-native-picker/picker';
import _ from 'lodash';
import Chevron from '../../assets/ChevronSvg';
import { HomeStackScreens } from '../../screens/home/types';
import SearchSvg from '../../assets/SearchSvg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SecondaryText from '../elements/SecondaryText';

interface Props {
    exercises: ExerciseProps[];
    pinAnalytics: AnalyticsProps[];
    navigation: any;
}

const HomeExercises = ({ exercises, pinAnalytics, navigation }: Props) => {
    const [pinExsProps, setPinExsProps] = useState<ExerciseProps[]>([]);
    const [selectedEx, setSelectedEx] = useState<ExerciseProps>();
    const [picker, setPicker] = useState<string | undefined>();
    const [chartFilter, setChartFilter] = useState('avg');
    const insets = useSafeAreaInsets();

    const initData = useCallback(() => {
        let exStore: ExerciseProps[] = [];
        if (!selectedEx) {
            if (pinAnalytics.length > 0) {
                //select the first one
                const e = exercises.find(e => e._id === pinAnalytics[0].exerciseUid)
                setSelectedEx(e)
            }
        }
        pinAnalytics.forEach(p => {
            const e = exercises.find(e => e._id === p.exerciseUid)
            if (e) exStore.push(e)
        })

        setPinExsProps(exStore)
    }, [selectedEx, exercises, pinAnalytics])

    useEffect(() => {
        initData()
    }, [exercises, selectedEx, pinAnalytics])

    const renderPickerItems = () => {
        if (picker && picker === 'chartFilter') {
            const items = ['avg', 'min', 'max'].map(s => (
                <Picker.Item value={s} label={_.capitalize(s)} key={s} />
            ))
            return items;
        }

        const items = pinExsProps.filter(d => d.name && d._id).map(d => (
            <Picker.Item value={d._id} label={_.capitalize(d.name)} key={d._id} />
        ))

        items.unshift(<Picker.Item value={undefined} label={''} key={'nothing'} />)
        return items;
    }

    const onPickerChange = (id: string) => {
        if (picker && picker === 'chartFilter') {
            setChartFilter(id)
        } else {
            const picked = pinExsProps.find(d => d._id === id)
            setSelectedEx(picked)
        }
    }

    const getPickerValue = () => {
        if (picker && picker === 'chartFilter') {
            return chartFilter
        }
        if (selectedEx) {
            if (selectedEx._id) return selectedEx._id
        }
        return ''
    }

    const onNavigateToSearchExercises = () => navigation.navigate(HomeStackScreens.SearchExercises);

    return (
        <>
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <View style={styles.headerContainer}>
                    <Pressable onPress={() => setPicker('exercise')} style={styles.filterContainer}>
                        {
                            selectedEx ?
                                <SecondaryText styles={styles.headerText} numberOfLines={1} bold>{selectedEx.name}</SecondaryText> :
                                <SecondaryText styles={styles.headerText} bold>Exercises</SecondaryText>
                        }
                        <View style={styles.chev}>
                            <Chevron strokeColor={BaseColors.lightBlack} />
                        </View>
                    </Pressable>
                    <Pressable style={styles.searchContainer} onPress={onNavigateToSearchExercises} hitSlop={5}>
                        <SearchSvg strokeColor={BaseColors.black} />
                    </Pressable>
                </View>
                <View style={styles.content}>
                    <WoExerciseChart
                        analytics={pinAnalytics}
                        selectedEx={selectedEx}
                        chartFilter={chartFilter}
                        setPicker={setPicker}
                    />
                </View>
            </View>
            <CustomPicker
                pickerItems={renderPickerItems()}
                setOpen={(o) => setPicker(undefined)}
                open={picker ? true : false}
                value={getPickerValue()}
                setValue={onPickerChange}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: StyleConstants.baseMargin,
        paddingTop: StyleConstants.baseMargin,
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: StyleConstants.baseMargin,
        marginLeft: StyleConstants.baseMargin,
        marginBottom: StyleConstants.baseMargin
    },
    headerText: {
        color: BaseColors.black,
        fontSize: StyleConstants.smallMediumFont,
        textTransform: 'capitalize',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '80%'
    },
    content: {
    },
    chev: {
        width: normalize.width(26),
        height: normalize.width(26),
        transform: [{ rotate: '-90deg' }],
        marginLeft: 10
    },
    searchContainer: {
        width: normalize.width(20),
        height: normalize.width(20)
    }
})
export default HomeExercises;