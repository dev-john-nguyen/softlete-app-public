import { ExercisesAnalyticsProps, AnalyticsProps, PinExerciseProps } from "./types";
import { WorkoutExerciseProps, WorkoutExerciseDataProps } from "../workout/types";
import _ from "lodash";

export function insertOrUpdateAnalytics(stateFetchAnalytics: AnalyticsProps[], fetchedAnalytics: AnalyticsProps[]) {
    if (!fetchedAnalytics || fetchedAnalytics.length < 1) return stateFetchAnalytics;

    fetchedAnalytics.forEach(a => {
        const foundIndex = stateFetchAnalytics.findIndex(state => state.exerciseUid === a.exerciseUid);
        if (foundIndex > -1) {
            stateFetchAnalytics[foundIndex] = { ...a }
        } else {
            stateFetchAnalytics.push({ ...a })
        }
    })

    return [...stateFetchAnalytics]
}

export function calcAnalytics(exercises: WorkoutExerciseProps[]): ExercisesAnalyticsProps {
    let performVals: number[] = [];

    exercises.forEach(e => {
        e.data.forEach(({ performVal, warmup }) => {
            if (performVal && !warmup) {
                performVals.push(performVal)
            }
        })
    })

    return calcAnalyticsInfo(performVals)
}

export function calcAnalyticsData(data: AnalyticsProps['data']) {
    let performVals: number[] = [];

    data.forEach(d => {
        d.data.forEach(({ performVal, warmup }) => {
            if (performVal && !warmup) {
                performVals.push(performVal)
            }
        })
    })

    return calcAnalyticsInfo(performVals)
}

export function calcAnalyticsInfo(performVals: number[]) {
    let min = _.min(performVals)
    let max = _.max(performVals)
    let avg = _.mean(performVals)
    let sum = _.sumBy(performVals)

    return {
        min: min ? _.round(min, 2) : 0,
        max: max ? _.round(max, 2) : 0,
        avg: avg ? _.round(avg, 2) : 0,
        sum: sum ? _.round(sum, 2) : 0,
        total: performVals.length
    }
}

export function findPinAnalytics(stateFetchAnalytics: AnalyticsProps[], pinExercises: PinExerciseProps[]) {
    return _.intersectionBy(stateFetchAnalytics, pinExercises, 'exerciseUid')
}

interface ExerciseObjProps {
    [exerciseUid: string]: WorkoutExerciseProps[]
}

export function reduceExercises(exercises: WorkoutExerciseProps[]): ExerciseObjProps {

    return _.reduce(exercises, (result: any, value) => {
        const key = value.exerciseUid as string;
        if (result[key]) {
            result[key].push(value)
        } else {
            result[key] = [value]
        }
        return result
    }, {})
}

export function recalcAverage(avg: number, n: number, val: number) {
    return avg * (n - 1) / n + val / n
}