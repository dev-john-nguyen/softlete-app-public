import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import Input from '../../components/elements/Input';
import { connect } from 'react-redux';
import BaseColors from '../../utils/BaseColors';
import PrimaryButton from '../../components/elements/PrimaryButton';
import { StyleSheet, View, Pressable, Keyboard } from 'react-native';
import { ReducerProps } from '../../services';
import SecondaryText from '../../components/elements/SecondaryText';
import { RootWorkoutProps, WorkoutActionProps, WorkoutHeaderProps, WorkoutTypes } from '../../services/workout/types';
import StyleConstants from '../../components/tools/StyleConstants';
import DateTools from '../../utils/DateTools';
import { capitalize, convertDaysToWeekObj, convertObjToDays, normalize, programWorkoutsArrToObj } from '../../utils/tools';
import { RootProgramProps, ProgramWorkoutHeaderProps, ProgramActionProps, GeneratedProgramProps } from '../../services/program/types';
import { updateWorkoutHeader } from '../../services/workout/actions';
import { updateProgramWorkoutHeader } from '../../services/program/actions';
import { HomeStackScreens } from './types';
import { Picker } from '@react-native-picker/picker';
import CustomPicker from '../../components/elements/Picker';
import DatePicker from 'react-native-date-picker';
import CalendarTodaySvg from '../../assets/CalendarToday';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useHeaderHeight } from '@react-navigation/elements';
import PrimaryText from '../../components/elements/PrimaryText';
import { HealthActivity } from 'react-native-health';
import CategorySvg from '../../assets/CategorySvg';
import { renderHealthActivityName } from '../../utils/format';
import BackButton from '../../components/BackButton';
import DashboardDemo from '../../components/demo/Demo';
import { DemoStates } from '../../services/global/types';

interface Props {
    genPrograms: GeneratedProgramProps[];
    route: any;
    navigation: any;
    workoutHeader: RootWorkoutProps['workoutHeader'];
    targetProgram: RootProgramProps['targetProgram'];
    updateWorkoutHeader: WorkoutActionProps['updateWorkoutHeader'];
    demoState: DemoStates;
}

//calendar date format yyyy-mm-dd

const WorkoutHeader = ({ genPrograms, route, navigation, workoutHeader, targetProgram, updateWorkoutHeader }: Props) => {
    const [type, setType] = useState<HealthActivity>(WorkoutTypes.TraditionalStrengthTraining)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [programUid, setProgramUid] = useState('');
    const [date, setDate] = useState(new Date())
    const [error, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [picker, setPicker] = useState('');
    const [datePicker, setDatePicker] = useState(false);
    const insets = useSafeAreaInsets();
    const headerHeight = useHeaderHeight();

    const init = useCallback(() => {
        if (workoutHeader) {
            setType(workoutHeader.type ? workoutHeader.type : WorkoutTypes.TraditionalStrengthTraining)
            setName(workoutHeader.name);
            setDescription(workoutHeader.description);
            setProgramUid(workoutHeader.programUid ? workoutHeader.programUid : '');
            const d = workoutHeader.date ? DateTools.UTCISOToLocalDate(workoutHeader.date) : new Date()
            setDate(d)
        } else {
            setName('');
            setDescription('');
            setProgramUid('');
        }
    }, [route, workoutHeader])

    useEffect(() => {
        init()
    }, [route, workoutHeader])

    useLayoutEffect(() => {
        const { params } = route;
        navigation.setOptions({
            headerLeft: () => (
                <BackButton onPress={() => (params && params.goBackScreen) ? navigation.navigate(params.goBackScreen) : navigation.navigate(HomeStackScreens.Home, {
                    directToDash: (params && params.directToDash) ? true : false
                })} />
            )
        })
    }, [navigation, route])

    const onContinuePress = () => {
        //check values
        if (loading) return;

        let errors = [];

        if (!name && type === WorkoutTypes.TraditionalStrengthTraining) {
            errors.push("Name required.")
        }

        if (!type) {
            errors.push('type is required.')
        }

        if (!date) {
            errors.push('Date is required.')
        }

        if (errors.length > 0) {
            return setErrors(errors)
        }

        setErrors([]);

        setLoading(true);

        //saving workout
        const workoutHeaderData: WorkoutHeaderProps = {
            name: type === WorkoutTypes.TraditionalStrengthTraining ? name ? name : WorkoutTypes.TraditionalStrengthTraining : type,
            description,
            programUid,
            date: DateTools.dateToStr(date),
            _id: workoutHeader ? workoutHeader._id : '',
            isPrivate: false,
            type: type
        }

        updateWorkoutHeader(workoutHeaderData)
            .then(() => {
                setLoading(false)
                navigation.navigate(HomeStackScreens.Workout, { goBackScreen: HomeStackScreens.Home })
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    const renderActiveProgramName = (_id: string) => {
        const program = genPrograms.find(g => g._id === programUid);
        if (program) return program.name
    }

    const renderPickerItems = useCallback(() => {
        switch (picker) {
            case 'type':
                return Object.values(WorkoutTypes).map(type => {
                    return <Picker.Item label={renderHealthActivityName(type)} value={type} key={type} />
                })
            case 'program':
        }

        const generatedPrograms = genPrograms.map((item) => (
            <Picker.Item label={capitalize(item.name)} value={item._id} key={item._id} />
        ))
        return [(<Picker.Item label={'None'} value={''} key={'none'} />), ...generatedPrograms]
    }, [genPrograms, picker])


    const getPickerValue = () => {
        switch (picker) {
            case 'type':
                return type
            case 'program':
                return programUid;
        }

        return ''
    }

    const onPickerChangeValue = (val: string) => {
        switch (picker) {
            case 'type':
                return setType(val as any)
            case 'program':
                return setProgramUid(val);
        }
    }


    return (
        <Pressable style={{ flex: 1, paddingTop: headerHeight, paddingLeft: insets.left, paddingRight: insets.right }} onPress={() => Keyboard.dismiss()}>
            <DashboardDemo screen={HomeStackScreens.WorkoutHeader} />
            <View style={[styles.container, { paddingBottom: insets.bottom }]}>
                <View>
                    <PrimaryText styles={styles.headerText}>Workout Details</PrimaryText>
                    <SecondaryText styles={styles.headerSubText}>Fill out the form below.</SecondaryText>

                    <View style={styles.errorContainer}>
                        {error.map((e) => (
                            <SecondaryText key={Math.random()} styles={styles.errorText}>*{e}</SecondaryText>
                        ))}
                    </View>

                    <SecondaryText styles={styles.label}>Type</SecondaryText>
                    <Pressable style={styles.programContainer} onPress={() => {
                        Keyboard.dismiss()
                        setPicker(p => p ? '' : 'type')
                    }}>
                        <View style={styles.programSvg}>
                            <CategorySvg fillColor={BaseColors.primary} />
                        </View>
                        <SecondaryText styles={styles.text}>{renderHealthActivityName(type)}</SecondaryText>
                    </Pressable>

                    {
                        type === WorkoutTypes.TraditionalStrengthTraining && (
                            <>
                                <SecondaryText styles={styles.label}>Name</SecondaryText>
                                <Input
                                    value={name}
                                    placeholder='Name'
                                    autoCapitalize='words'
                                    onChangeText={(txt) => setName(txt)}
                                    styles={{ marginBottom: StyleConstants.smallMargin }}
                                    maxLength={50}
                                />
                            </>
                        )
                    }

                    <SecondaryText styles={styles.label}>Description</SecondaryText>
                    <Input
                        value={description}
                        placeholder='Description'
                        multiline={true}
                        onChangeText={(txt) => setDescription(txt)}
                        maxLength={100}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        blurOnSubmit
                        styles={{ marginBottom: StyleConstants.smallMargin }}
                    />
                    <View>
                        {/* <SecondaryText styles={styles.label}>Program</SecondaryText>
                                <Pressable style={styles.programContainer} onPress={() => setPicker(p => p ? '' : 'program')}>
                                    <View style={styles.programSvg}>
                                        <BooksSvg fillColor={BaseColors.primary} />
                                    </View>
                                    <SecondaryText styles={styles.text}>{renderActiveProgramName(programUid)}</SecondaryText>
                                </Pressable> */}

                        <SecondaryText styles={styles.label}>Date</SecondaryText>
                        <Pressable style={styles.programContainer} onPress={() => setDatePicker(p => p ? false : true)}>
                            <View style={styles.programSvg}>
                                <CalendarTodaySvg fillColor={BaseColors.primary} />
                            </View>
                            <SecondaryText styles={styles.text}>{date.toDateString()}</SecondaryText>
                        </Pressable>
                    </View>
                </View>
                <PrimaryButton onPress={onContinuePress} styles={styles.button} loading={loading}>Done</PrimaryButton>
                <DatePicker
                    modal
                    mode='date'
                    open={datePicker}
                    date={date}
                    onConfirm={(date) => {
                        setDatePicker(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setDatePicker(false)
                    }}
                />
                <CustomPicker
                    open={!!picker ? true : false}
                    setOpen={() => setPicker('')}
                    value={getPickerValue()}
                    pickerItems={renderPickerItems()}
                    setValue={onPickerChangeValue}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: StyleConstants.baseMargin,
        paddingRight: StyleConstants.baseMargin
    },
    headerText: {
        fontSize: StyleConstants.mediumFont,
        color: BaseColors.primary
    },
    headerSubText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black
    },
    errorText: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.red,
        marginBottom: 2,
    },
    errorContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    dateInfo: {
        marginTop: StyleConstants.baseMargin,
        marginBottom: StyleConstants.baseMargin
    },
    label: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.black,
        marginBottom: 10
    },
    date: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginLeft: 5
    },
    button: {
        marginTop: StyleConstants.baseMargin,
        marginBottom: StyleConstants.baseMargin
    },
    text: {
        fontSize: StyleConstants.smallFont,
        color: BaseColors.black,
        marginLeft: 5,
        textTransform: 'capitalize'
    },
    programContainer: {
        flexDirection: 'row', backgroundColor: BaseColors.white,
        padding: 15,
        borderRadius: StyleConstants.borderRadius,
        borderWidth: 1,
        borderColor: BaseColors.lightGrey,
        marginBottom: StyleConstants.smallMargin
    },
    programSvg: {
        width: normalize.width(20),
        height: normalize.width(20)
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    genPrograms: state.program.generatedPrograms,
    targetProgram: state.program.targetProgram,
    workoutHeader: state.workout.workoutHeader,
    demoState: state.global.demoState
})
export default connect(mapStateToProps, { updateWorkoutHeader, updateProgramWorkoutHeader })(WorkoutHeader);