import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import View from './Workout';
import WorkoutHeader from './WorkoutHeader';
import SearchExercises from '../exercises/Search';
import EditExercise from '../exercises/Edit';
import WorkoutExerciseRestructure from './ExerciseRestructure';
import Calendar from './Calendar';
import screenOptions from '../utils/screenOptions';
import ExerciseAnalytics from '../exercises/Analytics';
import Exercise from '../exercises/View';
import BaseColors from '../../utils/BaseColors';
import { HomeStackParamsList, HomeStackScreens, HomeStackScreenTitle } from './types';
import WorkoutModal from './modals/WorkoutModal';
import GoOnlineModal from './modals/GoOnlineModal';
import OverviewModal from './modals/OverviewModal';
import UploadExerciseVideo from '../exercises/UploadVideo';
import DataOverview from './DataOverview';
import Home from './Home';
import EditExerciseDetails from '../exercises/EditDetails';
import Subscribe from './Subscribe';

const Tab = createStackNavigator<HomeStackParamsList>();

function HomeStack(parentProps: any) {

    return (
        <Tab.Navigator
            screenOptions={(childProps) => screenOptions(parentProps, childProps)}
            initialRouteName={HomeStackScreens.Home}>

            <Tab.Group>

                <Tab.Screen
                    name={HomeStackScreens.Home}
                    component={Home}
                    options={{
                        headerTitle: '',
                        headerTransparent: true,
                        headerLeft: undefined,
                        headerRight: undefined
                    }}
                />

                <Tab.Screen
                    name={HomeStackScreens.Calendar}
                    component={Calendar}
                    options={{
                        headerTitle: '',
                        headerTransparent: true,
                        headerLeft: () => null,
                        headerRight: undefined,
                        presentation: 'modal'
                    }}
                />


                <Tab.Screen
                    name={HomeStackScreens.Subscribe}
                    component={Subscribe}
                    options={{
                        headerTitle: '',
                        headerTransparent: true,
                        headerLeft: () => null,
                        headerRight: undefined,
                        gestureEnabled: false
                    }}
                />

                <Tab.Screen name={HomeStackScreens.WorkoutHeader} component={WorkoutHeader}
                    options={{
                        headerTitle: '',
                        headerRight: undefined,
                        headerTransparent: true,
                    }}
                />

                <Tab.Screen name={HomeStackScreens.ExerciseAnalytics} component={ExerciseAnalytics}
                    options={{
                        headerTitle: '',
                        headerRight: undefined,
                        headerTransparent: true,
                        headerTintColor: BaseColors.white
                    }}
                />

                <Tab.Screen name={HomeStackScreens.DataOverview} component={DataOverview}
                    options={{
                        headerTitle: 'Overview',
                        headerRight: undefined,
                    }}
                />

                <Tab.Screen name={HomeStackScreens.Workout} component={View}
                    options={{
                        headerRight: undefined,
                        headerTintColor: BaseColors.black,
                        gestureEnabled: false
                    }}
                />

                <Tab.Screen name={HomeStackScreens.SearchExercises} component={SearchExercises}
                    options={{
                        headerTitle: '',
                        headerRight: undefined,
                        headerTransparent: true,
                        headerTintColor: BaseColors.black
                    }}
                />


                <Tab.Screen name={HomeStackScreens.EditExerciseDetails} component={EditExerciseDetails}
                    options={{
                        headerTitle: '',
                        headerRight: undefined,
                        headerTransparent: true
                    }}
                />


                <Tab.Screen name={HomeStackScreens.UploadExerciseVideo} component={UploadExerciseVideo}
                    options={{
                        headerTitle: '',
                        headerRight: undefined,
                        headerTransparent: true
                    }}
                />


                <Tab.Screen name={HomeStackScreens.Exercise} component={Exercise}
                    options={{
                        headerTitle: '',
                        headerRight: undefined,
                        headerTransparent: true,
                        headerTintColor: BaseColors.black
                    }}
                />


                <Tab.Screen name={HomeStackScreens.ReorderWorkoutExercises} component={WorkoutExerciseRestructure}
                    options={{
                        headerTitle: '',
                        headerRight: undefined,
                        headerTransparent: true,
                        headerLeft: () => null
                    }}
                />

                <Tab.Screen name={HomeStackScreens.EditExercise} component={EditExercise}
                    options={{
                        headerTitle: '',
                        headerRight: undefined,
                        headerTintColor: BaseColors.black,
                        headerTransparent: true
                    }} />

            </Tab.Group>

            <Tab.Group screenOptions={{ presentation: 'transparentModal' }}>
                <Tab.Screen name={HomeStackScreens.WorkoutModal} component={WorkoutModal}
                    options={{
                        title: '',
                        headerRight: undefined,
                        headerTransparent: true,
                        headerLeft: () => null
                    }}
                />
                <Tab.Screen name={HomeStackScreens.GoOnlineModal} component={GoOnlineModal}
                    options={{
                        title: '',
                        headerRight: undefined,
                        headerTransparent: true,
                        headerLeft: () => null,
                        presentation: 'modal',
                        gestureEnabled: false
                    }}
                />

                <Tab.Screen name={HomeStackScreens.OverviewModal} component={OverviewModal}
                    options={{
                        title: '',
                        headerRight: undefined,
                        headerTransparent: true,
                        presentation: 'modal',
                        headerLeft: () => null
                    }}
                />
            </Tab.Group>
        </Tab.Navigator>
    );
}

export default HomeStack;