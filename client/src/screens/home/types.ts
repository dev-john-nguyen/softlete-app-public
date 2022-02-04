import { ExerciseProps } from "../../services/exercises/types";

export type HomeStackParamsList = {
    Workout: undefined;
    WorkoutTemplate: undefined;
    WorkoutHeader: undefined;
    EditWorkout: undefined;
    AddExercise: undefined;
    SearchExercises: undefined;
    CreateExercise: undefined;
    UploadExerciseVideo: undefined;
    Exercise: {
        exercise: ExerciseProps,
        athlete?: boolean
    };
    EditExercise: undefined;
    EditExerciseDetails: undefined;
    ReorderWorkoutExercises: undefined;
    Calendar: undefined;
    ExerciseAnalytics: undefined;
    WorkoutModal: undefined;
    GoOnlineModal: undefined;
    OverviewModal: undefined;
    DataOverview: undefined;
    Home: undefined;
    Subscribe: undefined;
}


export enum HomeStackScreens {
    SearchExercises = 'SearchExercises',
    Workout = 'Workout',
    WorkoutHeader = 'WorkoutHeader',
    ReorderWorkoutExercises = 'ReorderWorkoutExercises',
    Calendar = 'Calendar',
    ExerciseAnalytics = 'ExerciseAnalytics',
    Exercise = 'Exercise',
    EditExercise = 'EditExercise',
    WorkoutModal = 'WorkoutModal',
    GoOnlineModal = 'GoOnlineModal',
    OverviewModal = 'OverviewModal',
    UploadExerciseVideo = 'UploadExerciseVideo',
    DataOverview = 'DataOverview',
    EditExerciseDetails = 'EditExerciseDetails',
    Home = 'Home',
    Subscribe = 'Subscribe'
}

export enum HomeStackScreenTitle {
    SearchExercises = 'Search',
    Workout = 'Workout',
    WorkoutHeader = 'Details',
    ReorderWorkoutExercises = 'Restructure',
    Calendar = 'Home',
    Exercise = 'Exercise',
    EditExercise = 'Details'
}
