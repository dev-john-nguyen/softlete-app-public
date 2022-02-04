import AppleHealthKit from "react-native-health";

export const renderHealthActivityName = (type: string) => {
    if (!type) return ""
    switch (type) {
        case AppleHealthKit.Constants.Activities.TraditionalStrengthTraining:
            return 'Strength Training'
        case AppleHealthKit.Constants.Activities.Cycling:
            return AppleHealthKit.Constants.Activities.Cycling;
        case AppleHealthKit.Constants.Activities.Swimming:
            return AppleHealthKit.Constants.Activities.Swimming;
        case AppleHealthKit.Constants.Activities.Stairs:
        case AppleHealthKit.Constants.Activities.StairClimbing:
            return 'Stairs'
        case AppleHealthKit.Constants.Activities.Yoga:
            return AppleHealthKit.Constants.Activities.Yoga;
        case AppleHealthKit.Constants.Activities.Walking:
            return AppleHealthKit.Constants.Activities.Walking;
        case AppleHealthKit.Constants.Activities.Hiking:
            return AppleHealthKit.Constants.Activities.Hiking;
        case AppleHealthKit.Constants.Activities.Running:
            return AppleHealthKit.Constants.Activities.Running;
        default:
            return 'Activity'
    }
}