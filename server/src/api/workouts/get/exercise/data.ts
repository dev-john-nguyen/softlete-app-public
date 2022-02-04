const router = require('express').Router();
import WorkoutExercises from '../../../../collections/workout-exercises';
import DateTools from '../../../../utils/DateTools';
import mongoose from 'mongoose';
import errorCatch from '../../../../utils/error-catch';
import apicache from 'apicache';
import cacheOnlyNonOwner from '../../../../utils/cache-only-non-owner';
const cache = apicache.middleware;

//analytics
router.get('/:userUid?:fromDate?:toDate?:exerciseUids?', cache('5 minutes', cacheOnlyNonOwner), (req: any, res: any, next: any) => {

    const { userUid, fromDate, toDate, exerciseUids } = req.query;

    if (!userUid) return res.status(400).send('Request is empty.');

    if (!DateTools.isValidDateStr(fromDate) || !DateTools.isValidDateStr(toDate)) return res.status(401).send('Invalid dates')

    if (typeof exerciseUids === 'string') {
        if (!mongoose.Types.ObjectId.isValid(exerciseUids)) return res.status(401).send('Invalid exercise')
    } else if (exerciseUids instanceof Array) {
        for (let i = 0; i < exerciseUids.length; i++) {
            if (!mongoose.Types.ObjectId.isValid(exerciseUids[i])) return res.status(401).send('Invalid exercise');
        }
    } else {
        return res.send([]);
    }

    WorkoutExercises.find({
        userUid,
        date: {
            $gte: fromDate,
            $lte: toDate
        },
        exerciseUid: { $in: exerciseUids as string[] }
    }).select({ data: 1, date: 1, exerciseUid: 1 })
        .then((docs) => {

            const mapDocs = docs.map(doc => {
                const docObj = doc.toObject();
                return {
                    ...docObj,
                    data: docObj.data.map(d => ({
                        ...d,
                        predictVal: d.predictVal ? parseFloat(d.predictVal.toString()) : 0,
                        performVal: d.performVal ? parseFloat(d.performVal.toString()) : 0,
                    }))
                }
            })

            res.send(mapDocs)
        })
        .catch((err) => errorCatch(err, res, next))

})

export default router;