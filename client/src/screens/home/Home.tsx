import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { AppDispatch } from '../../../App';
import HomeBG from '../../assets/images/HomeBg';
import RunningMan from '../../assets/images/RunningMan';
import DashboardDemo from '../../components/demo/Demo';
import HomeExercises from '../../components/home/Exercises';
import HomeHeader from '../../components/home/Header';
import HomeStats from '../../components/home/Stats';
import HomeWorkouts from '../../components/home/Workouts';
import { ReducerProps } from '../../services';
import { getChats } from '../../services/chat/actions';
import { ChatActionProps } from '../../services/chat/types';
import { fetchLocalStoreExercisesToState, fetchAllUserExercises } from '../../services/exercises/actions';
import { ExerciseActionProps, ExerciseProps } from '../../services/exercises/types';
import { getGlobalVars, goOffline, processBatches } from '../../services/global/actions';
import { DemoStates } from '../../services/global/types';
import { fetchPinExerciseAnalytics } from '../../services/misc/actions';
import { AnalyticsProps, MiscActionProps, PinExerciseProps } from '../../services/misc/types';
import { fetchNotifications, processNotification } from '../../services/notifications/actions';
import { NotificationActionProps, NotificationTypes } from '../../services/notifications/types';
import { fetchGeneratedPrograms } from '../../services/program/actions';
import { ProgramActionProps } from '../../services/program/types';
import { initSockets } from '../../services/sockets/actions';
import { getFriends } from '../../services/user/actions';
import { UserActionProps, UserProps } from '../../services/user/types';
import { fetchWorkouts, getAllHealthData, setViewWorkout } from '../../services/workout/actions';
import { SET_SELECTED_DATE } from '../../services/workout/actionTypes';
import { HealthDataProps, WorkoutActionProps, WorkoutProps } from '../../services/workout/types';
import BaseColors from '../../utils/BaseColors';
import DateTools from '../../utils/DateTools';
import { normalize } from '../../utils/tools';
import { HomeStackScreens } from './types';
import notifee, { Event, EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { IndexStackList } from '../types';
import { NetworkStackScreens } from '../network/types';
import { getRootNavigationState } from '../../RootNavigation';
import { SET_CURRENT_ATHLETE } from '../../services/athletes/actionTypes';
import PrimaryText from '../../components/elements/PrimaryText';
import { filter } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    user: UserProps;
    route: any;
    navigation: any;
    fetchWorkouts: WorkoutActionProps['fetchWorkouts'];
    dispatch: AppDispatch;
    workouts: WorkoutProps[];
    fetchGeneratedPrograms: ProgramActionProps['fetchGeneratedPrograms'];
    removeGeneratedProgram: ProgramActionProps['removeGeneratedProgram'];
    getFriends: UserActionProps['getFriends'];
    getChats: ChatActionProps['getChats'];
    initSockets: () => void;
    offline: boolean;
    goOffline: () => Promise<void>;
    fetchLocalStoreExercisesToState: ExerciseActionProps['fetchLocalStoreExercisesToState'];
    fetchNotifications: NotificationActionProps['fetchNotifications'];
    processBatches: () => Promise<void>;
    fetchAllUserExercises: ExerciseActionProps['fetchAllUserExercises'];
    getAllHealthData: () => Promise<void>;
    healthData: HealthDataProps[];
    exercises: ExerciseProps[];
    fetchPinExerciseAnalytics: MiscActionProps['fetchPinExerciseAnalytics'];
    setViewWorkout: WorkoutActionProps['setViewWorkout'];
    analytics: AnalyticsProps[];
    getGlobalVars: () => Promise<void>;
    connectAppStore: boolean;
    processNotification: NotificationActionProps['processNotification'];
}

const d = new Date()
const today = new Date(d.getFullYear(), d.getMonth(), d.getDate())

const Home = ({ user, navigation, healthData, exercises, getGlobalVars, fetchPinExerciseAnalytics, getAllHealthData, fetchWorkouts, dispatch, workouts, fetchGeneratedPrograms, getFriends, initSockets, getChats, offline, goOffline, setViewWorkout, fetchLocalStoreExercisesToState, fetchNotifications, processBatches, fetchAllUserExercises, route, analytics, connectAppStore, processNotification }: Props) => {
    const [wos, setWos] = useState<WorkoutProps[]>([])

    const mount = useRef(false);

    const initReduxState = useCallback(async () => {
        //await for store exercises
        onMonthChange()
        await fetchLocalStoreExercisesToState().catch(err => console.log(err))
        //get all types of programs
        if (!offline) {
            getGlobalVars().catch(err => console.log(err))
            fetchAllUserExercises().catch(err => console.log(err))
            processBatches().catch(err => console.log(err));
            fetchGeneratedPrograms().catch(err => console.log(err))
            getFriends().catch(err => console.log(err))
            getAllHealthData().catch(err => console.log(err))
            initSockets();
            getChats();
            fetchNotifications();
            const endD = DateTools.dateToStr(today);
            const startD = DateTools.dateToStr(new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()))
            fetchPinExerciseAnalytics(startD, endD, user.pinExercises).catch(err => console.log(err));
        }
    }, [offline])

    const onMonthChange = async () => {
        //fetch the month workotus
        const d = new Date();
        const m = d.getMonth() + 1
        const amtOfDays = new Date(d.getFullYear(), m, 0).getDate() //d.getMonth() is the next month
        const fromDate = new Date(d.getFullYear(), m - 1, 1);
        const toDate = new Date(d.getFullYear(), m - 1, amtOfDays);
        const fromDateStr = DateTools.dateToStr(fromDate)
        const toDateStr = DateTools.dateToStr(toDate);
        dispatch({ type: SET_SELECTED_DATE, payload: DateTools.dateToStr(d) })
        await fetchWorkouts(fromDateStr, toDateStr);
    }

    const getCurrentScreen = () => {
        let currentRootScreen = '';
        const routeState = getRootNavigationState();
        if (routeState) {
            currentRootScreen = routeState.name;
        }
        return currentRootScreen
    }

    const routeIsInNetworkStack = () => {
        let sameStack = false;
        const currentRootScreen = getCurrentScreen();
        if (currentRootScreen) {
            let found = Object.values(NetworkStackScreens).find((screen) => screen === currentRootScreen)
            if (found) {
                sameStack = true
            }
        }
        return sameStack
    }

    const onForegroundEvent = ({ type, detail }: Event) => {
        switch (type) {
            case EventType.DISMISSED:
                break;
            case EventType.PRESS:
                const { notification } = detail;

                if (!notification || !notification.data) return;

                const { notificationType, senderProps, chatId }: { notificationType?: NotificationTypes, senderProps?: string, chatId?: string } = notification.data;

                //if notification type is message, send to message screen with chat
                //if notification is anything else navigate to the athlete profile
                if (!notificationType) return;

                if (notificationType === NotificationTypes.NEW_MESSAGE && chatId) {
                    //identify if it's in the same stack
                    if (routeIsInNetworkStack()) {
                        navigation.navigate(NetworkStackScreens.Message, { chatId })
                    } else {
                        navigation.navigate(IndexStackList.NetworkStack, { screen: NetworkStackScreens.Chats, params: { chatId } })
                    }
                    return;
                }

                if (notificationType === NotificationTypes.FRIEND_REQUEST) {
                    navigation.navigate(IndexStackList.NetworkStack, { screen: NetworkStackScreens.Notifications })
                    return;
                }

                if (senderProps) {
                    //navigate to athlete 
                    let athlete = JSON.parse(senderProps)
                    dispatch({ type: SET_CURRENT_ATHLETE, payload: athlete })
                    if (routeIsInNetworkStack()) {
                        navigation.push(NetworkStackScreens.AthleteDashboard, { athlete })
                    } else {
                        navigation.navigate(IndexStackList.NetworkStack, { screen: NetworkStackScreens.SearchAthletes, params: { athlete } })
                    }
                    return;
                }
        }
    }

    const onMessage = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        const { notification, data } = remoteMessage;
        if (!notification) return;
        const currentRootScreen = getCurrentScreen()
        processNotification(currentRootScreen, notification.title, notification.body, data)
    }

    const filterWos = useCallback(() => {
        const filterDate = today;

        const filteredWo = workouts.filter(w => {
            const woD = DateTools.UTCISOToLocalDate(w.date);
            if (
                woD.getUTCFullYear() === filterDate.getUTCFullYear() &&
                woD.getUTCMonth() === filterDate.getUTCMonth() &&
                woD.getUTCDate() === filterDate.getUTCDate()
            ) return true;
            return false;
        })

        setWos(filteredWo)
    }, [filter, workouts])

    useEffect(() => {
        filterWos()
    }, [workouts, filter])

    useEffect(() => {
        filterWos()
    }, [workouts, filter])

    useEffect(() => {
        notifee.onForegroundEvent(onForegroundEvent)
        const unsubscribe = messaging().onMessage(onMessage);
        return () => {
            unsubscribe()

        }
    }, [])

    useEffect(() => {
        if (route.params && route.params.directToDash) {
            navigation.navigate(HomeStackScreens.Calendar)
        }
    }, [route])

    // useEffect(() => {
    //     mount.current = true;
    //     initReduxState();
    //     return () => {
    //         mount.current = false;
    //     }
    // }, [offline])

    // useEffect(() => {
    //     //Only attempt to get the user to subscribe once right now
    //     if (user.createdAt && connectAppStore) {
    //         const createdAt = new Date(user.createdAt);
    //         const diff = DateTools.dateDiffInDays(createdAt, today);
    //         if (diff.days >= 30) {
    //             if (!user.subscriptionUpdate) {
    //                 navigation.navigate(HomeStackScreens.Subscribe);
    //             }
    //         }
    //     }

    // }, [connectAppStore])

    return (
        <LinearGradient colors={['#5A0003', '#360000', '#7A0000']} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
                <View style={styles.bg}>
                    <HomeBG />
                </View>

                <View style={styles.runningContainer}>
                    <View style={styles.run}>
                        <RunningMan />
                    </View>
                </View>

                <PrimaryText styles={[styles.bgText, { top: '50%', left: '60%', fontSize: normalize.width(11) }]}>
                    Plan
                </PrimaryText>
                <PrimaryText styles={[styles.bgText, { top: '60%', left: '20%', fontSize: normalize.width(9) }]}>
                    Train
                </PrimaryText>
                <PrimaryText styles={[styles.bgText, { top: '75%', left: '40%', fontSize: normalize.width(10) }]}>
                    Evaluate
                </PrimaryText>
                <PrimaryText styles={[styles.bgText, { top: '90%', left: '10%', fontSize: normalize.width(12) }]}>
                    Repeat
                </PrimaryText>

                <DashboardDemo screen={HomeStackScreens.Home} />
                <ScrollView style={styles.container} nestedScrollEnabled>
                    <HomeHeader
                        user={user}
                        offline={offline}
                        navigation={navigation}
                        subText={`${wos.length > 0 ? `You have ${wos.length} workout${wos.length > 1 ? 's' : ''} planned for today.` : `Rest day today.`}`}
                    />
                    <HomeWorkouts
                        wos={wos}
                        navigation={navigation}
                        dispatch={dispatch}
                        setViewWorkout={setViewWorkout}
                    />
                    <HomeStats healthData={healthData} navigation={navigation} />
                    <HomeExercises
                        exercises={exercises}
                        pinAnalytics={analytics}
                        navigation={navigation}
                    />
                </ScrollView>
            </SafeAreaView >
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgText: {
        position: 'absolute',
        zIndex: -100,
        color: BaseColors.white,
        width: '100%',
        opacity: .03
    },
    bg: {
        height: normalize.width(1),
        width: '120%',
        position: 'absolute',
        zIndex: -100,
        top: 0,
        left: '-10%',
        opacity: .02
    },
    runningContainer: {
        position: 'absolute',
        top: '30%',
        left: '0%',
        width: '100%',
        borderBottomWidth: .5,
        borderBottomColor: BaseColors.white,
        opacity: .1
    },
    run: {
        height: normalize.width(10),
        width: normalize.width(10),
        left: '35%',
        opacity: .3
    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user,
    selectedDate: state.workout.selectedDate,
    workouts: state.workout.workouts,
    offline: state.global.offline,
    healthData: state.workout.healthData,
    exercises: state.exercises.data,
    analytics: state.misc.pinExercisesAnalytics,
    connectAppStore: state.global.connectAppStore
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchWorkouts: (fromDate: string, toDate: string) => dispatch(fetchWorkouts(fromDate, toDate)),
        fetchGeneratedPrograms: () => dispatch(fetchGeneratedPrograms()),
        getFriends: () => dispatch(getFriends()),
        initSockets: () => dispatch(initSockets()),
        getChats: () => dispatch(getChats()),
        goOffline: () => dispatch(goOffline()),
        fetchLocalStoreExercisesToState: async () => dispatch(fetchLocalStoreExercisesToState()),
        fetchNotifications: () => dispatch(fetchNotifications()),
        processBatches: () => dispatch(processBatches()),
        fetchAllUserExercises: () => dispatch(fetchAllUserExercises()),
        getAllHealthData: () => dispatch(getAllHealthData()),
        fetchPinExerciseAnalytics: (fromD: string, toD: string, pinExs: PinExerciseProps[]) => dispatch(fetchPinExerciseAnalytics(fromD, toD, pinExs)),
        setViewWorkout: (id: string) => dispatch(setViewWorkout(id)),
        getGlobalVars: async () => dispatch(getGlobalVars()),
        processNotification: (screen: string, title?: string, body?: string, data?: {
            [key: string]: string;
        }) => dispatch(processNotification(screen, title, body, data)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);