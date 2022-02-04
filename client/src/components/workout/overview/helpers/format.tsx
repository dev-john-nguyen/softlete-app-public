import _ from "lodash";

export const renderTime = (date: string) => {
    const d = new Date(date);
    if (!d) return;
    return d.getHours() + ':' + d.getMinutes()
}

export const renderCalories = (cal: number) => Math.round(cal) + ' kcal';

export const renderDistance = (distance: number) => Math.round(distance * 100) / 100;

export const renderHeartRateAvg = (heartRates?: number[]) => {
    if (heartRates && heartRates.length > 0) {
        const mean = _.mean(heartRates)
        return _.floor(mean)
    }
    return 0
}

export const convertMsToTime = (msec: number) => {
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    let mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    let ss = Math.floor(msec / 1000)
    msec -= ss * 1000;

    if (hh > 0) {
        return hh + '.' + mm + ' hrs';
    } else if (mm > 0) {
        return mm + ' mins'
    } else {
        return ss + ' secs'
    }
}