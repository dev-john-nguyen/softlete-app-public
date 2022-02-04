import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, SectionList, Pressable, View, Keyboard } from 'react-native';
import BaseColors from '../../utils/BaseColors';
import { ExerciseProps, ExerciseActionProps, Categories } from '../../services/exercises/types';
import { ReducerProps } from '../../services';
import { connect } from 'react-redux';
import ExerciseSearchPreview from '../../components/ExerciseSearchPreview';
import { searchExercises } from '../../services/exercises/actions';
import { updateWorkoutExercises } from '../../services/workout/actions';
import { WorkoutActionProps, WorkoutExerciseProps } from '../../services/workout/types';
import { updateProgramWorkoutExercises } from '../../services/program/actions';
import { ProgramActionProps } from '../../services/program/types';
import { PinExerciseProps } from '../../services/misc/types';
import _ from 'lodash';
import StyleConstants from '../../components/tools/StyleConstants';
import { HomeStackScreens } from '../home/types';
import { UserProps } from '../../services/user/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircleAdd from '../../components/elements/CircleAdd';
import SearchHeader from '../../components/SearchHeader';
import SearchFilter from '../../components/SearchFilter';
import SecondaryText from '../../components/elements/SecondaryText';
import { AppDispatch } from '../../../App';
import { SET_TARGET_EXERCISE } from '../../services/exercises/actionTypes';
import { ProgramStackScreens } from '../program/types';
import BackButton from '../../components/BackButton';
import DashboardDemo from '../../components/demo/Demo';
import { DemoStates } from '../../services/global/types';
import { SET_DEMO_STATE } from '../../services/global/actionTypes';

interface Props {
    navigation: any;
    exercisesProps: ExerciseProps[];
    route: any;
    searchExercises: ExerciseActionProps['searchExercises'];
    updateWorkoutExercises: WorkoutActionProps['updateWorkoutExercises'];
    updateProgramWorkoutExercises: ProgramActionProps['updateProgramWorkoutExercises'];
    pinExercises: PinExerciseProps[];
    user: UserProps;
    offline: boolean;
    dispatch: AppDispatch;
    demoState: DemoStates
}

const Exercises = ({ navigation, route, searchExercises, exercisesProps, updateWorkoutExercises,
    updateProgramWorkoutExercises, pinExercises, user, offline, dispatch, demoState }: Props) => {
    const [searchLimit] = useState(10);
    const [exercises, setExercises] = useState<{ title: string, data: ExerciseProps[] }[]>([]);
    const [showFilter, setShowFilter] = useState(false);
    const [catFilter, setCatFilter] = useState('');
    const [equipFilter, setEquipFilter] = useState('');
    const [mGFilter, setMGFilter] = useState('');
    const [hiddenGroups, setHiddenGroups] = useState<string[]>([]);
    const [fetchedExs, setFetchedExs] = useState<{ title: string, data: ExerciseProps[] }[]>([]);
    const [query, setQuery] = useState('');
    const mount = useRef(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <BackButton onPress={navToWorkoutScreen} />
        })
    }, [navigation])

    useEffect(() => {
        const pinExs = _.intersectionWith(exercisesProps, pinExercises, (a, b) => a._id === b.exerciseUid)

        let pinStore: { title: string, data: ExerciseProps[] } = {
            title: "Pinned",
            data: []
        };

        if (pinExs.length > 0 && !hiddenGroups.find(g => g === "Pinned")) {
            pinStore.data = pinExs
        }

        let clone = _.cloneDeep(exercisesProps);

        //regex querying
        const regex = new RegExp(query.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1").toLowerCase())
        clone = clone.filter(e => e.name && regex.test(e.name.toLowerCase()))

        if (equipFilter || catFilter || equipFilter) {
            //filter checks
            //filter each one one at a time
            if (catFilter) {
                clone = clone.filter((item) => item.category === catFilter)
            }

            if (mGFilter) {
                clone = clone.filter((item) => item.muscleGroup === mGFilter)
            }

            if (equipFilter) {
                clone = clone.filter((item) => item.equipment === equipFilter)
            }
        }


        let grouped = processFetchedExercises(clone);

        //hide all the groups
        if (hiddenGroups.length > 0) {
            grouped = grouped.map(item => {
                const remove = hiddenGroups.find(g => g === item.title)
                if (remove) {
                    item.data = []
                }
                return item
            })
        }

        setExercises([pinStore, ...grouped])

    }, [pinExercises, hiddenGroups, fetchedExs, catFilter, mGFilter, equipFilter, exercisesProps, query])

    const navToWorkoutScreen = () => {
        if (navigation.canGoBack()) return navigation.goBack()
        navigation.navigate(HomeStackScreens.Home)
    }

    const onSendExerciseToWorkout = (exercise: ExerciseProps) => {
        const { group, order, workoutUid, programTemplateUid } = route.params as { group: number, order: number, workoutUid: string, programTemplateUid?: string };

        if (!workoutUid) return navigation.goBack()

        const workoutExercise: WorkoutExerciseProps = {
            group: group,
            order: order,
            exercise: exercise,
            data: [{
                reps: 1,
                predictVal: 0,
                pct: 100
            }],
        }

        if (programTemplateUid || (route.params && route.params.programStack)) {
            updateProgramWorkoutExercises(workoutUid, [workoutExercise])
                .then(() => navToWorkoutScreen())
                .catch((err) => console.log(err))
        } else {
            updateWorkoutExercises(workoutUid, [workoutExercise])
                .then(() => navToWorkoutScreen())
                .catch((err) => console.log(err))

        }
    }

    const onExercisePress = (exercise: ExerciseProps) => {
        setShowFilter(false)
        if (route.params && route.params) {
            if (demoState) dispatch({ type: SET_DEMO_STATE, payload: DemoStates.WO_EX_ADDED })
            onSendExerciseToWorkout(exercise)
        } else {
            navigation.navigate(HomeStackScreens.Exercise, {
                exercise: exercise
            })
        }
    }

    const onAddExerciessPress = () => {
        dispatch({ type: SET_TARGET_EXERCISE, payload: {} })
        if (route && route.params && route.params.programStack) {
            navigation.navigate(ProgramStackScreens.ProgramUploadVideo)
        } else {
            navigation.navigate(HomeStackScreens.UploadExerciseVideo)
        }
    }

    const onSearch = async (query: string) => {
        setQuery(query)
    }

    const onSearchByCat = async (category: Categories) => {
        const regex = new RegExp(category.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1").toLowerCase())
        const queryExercise = exercisesProps.filter(e => regex.test(e.category.toLowerCase()))
        const format = processFetchedExercises(queryExercise)
        setExercises(format)
    }

    const processFetchedExercises = (exs: ExerciseProps[] | void) => {
        if (!exs) return [];

        const groups = _.groupBy(exs, 'category')

        const groupExs: { title: string, data: ExerciseProps[] }[] = [];

        Object.keys(groups).forEach(function (key) {
            groupExs.push({
                title: key,
                data: groups[key]
            })
        });

        return groupExs
    }

    const renderItem = useCallback(({ item }: { item: ExerciseProps }) => {
        return <ExerciseSearchPreview exercise={item} onPress={() => onExercisePress(item)} softlete={item.softlete} user={user} />
    }, [exercises])

    const onReset = () => {
        setCatFilter('');
        setEquipFilter('');
        setHiddenGroups([]);
        setMGFilter('')
        setShowFilter(false);
        setExercises([]);
        setFetchedExs([])
    }

    const handleOnFilter = () => {
        Keyboard.dismiss();
        setShowFilter(f => f ? false : true);
    }

    const hideGroup = (group: string) => setHiddenGroups(gs => {
        const foundIndex = gs.findIndex(g => group === g);
        if (foundIndex > -1) {
            gs.splice(foundIndex, 1)
        } else {
            gs.push(group)
        }
        return [...gs]
    })

    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1 }}>
            <DashboardDemo screen={HomeStackScreens.SearchExercises} />
            <SearchFilter
                show={showFilter}
                onHide={() => setShowFilter(false)}
                catFilter={catFilter}
                setCatFilter={setCatFilter}
                equipFilter={equipFilter}
                setEquipFilter={setEquipFilter}
                mGFilter={mGFilter}
                setMGFilter={setMGFilter}
                onReset={onReset}
                onSearchByCat={onSearchByCat}
            />
            <SearchHeader onSearch={onSearch} onFilter={handleOnFilter} onChange={onSearch} />
            <SectionList
                sections={exercises}
                keyExtractor={(item, index) => item._id ? item._id : index.toString()}
                contentContainerStyle={{ paddingBottom: StyleConstants.baseMargin }}
                renderItem={renderItem}
                initialNumToRender={20}
                renderSectionHeader={({ section: { title } }) => (
                    <Pressable style={({ pressed }) => [styles.titleContainer, { backgroundColor: pressed ? BaseColors.lightGrey : BaseColors.lightWhite }]} onPress={() => hideGroup(title)}>
                        <SecondaryText styles={styles.title}>{title}</SecondaryText>
                        {
                            hiddenGroups.find(g => g === title) && <View style={styles.minus} />
                        }
                    </Pressable>
                )}
                stickySectionHeadersEnabled={false}
            />
            {!offline && <CircleAdd onPress={onAddExerciessPress} style={{ bottom: '5%' }} />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: BaseColors.primary,
        paddingBottom: StyleConstants.baseMargin,
        paddingLeft: StyleConstants.baseMargin,
        paddingRight: StyleConstants.baseMargin
    },
    menu: {
        marginLeft: StyleConstants.smallMargin,
        justifyContent: 'center', alignItems: 'center'
    },
    title: {
        fontSize: StyleConstants.extraSmallFont,
        color: BaseColors.secondary,
        textTransform: 'capitalize'
    },
    titleContainer: {
        paddingTop: StyleConstants.smallMargin,
        paddingBottom: StyleConstants.smallMargin,
        paddingLeft: StyleConstants.baseMargin,
        paddingRight: StyleConstants.baseMargin,
        borderBottomWidth: .2,
        borderBottomColor: BaseColors.lightGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    minus: {
        width: '4%',
        height: 1,
        borderRadius: 100,
        backgroundColor: BaseColors.secondary
    },
})

const mapStateToProps = (state: ReducerProps) => ({
    exercisesProps: state.exercises.data,
    pinExercises: state.misc.pinExercises,
    user: state.user,
    offline: state.global.offline,
    demoState: state.global.demoState
})

const mapDispatchToProps = (dispatch: any) => ({
    searchExercises: async (query: string, limit?: number) => dispatch(searchExercises(query, limit)),
    updateWorkoutExercises: async (workoutUid: string, exercises: WorkoutExerciseProps[]) => dispatch(updateWorkoutExercises(workoutUid, exercises)),
    updateProgramWorkoutExercises: (workoutUid: string, exercises: WorkoutExerciseProps[], removedExercises?: WorkoutExerciseProps[]) => dispatch(updateProgramWorkoutExercises(workoutUid, exercises, removedExercises)),
    dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);