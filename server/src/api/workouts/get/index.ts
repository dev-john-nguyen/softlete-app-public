const router = require('express').Router();
import exerciseData from './exercise/data';
import getWorkout from './workout';
import healthData from './health-data';

router.use('/exercise/data', exerciseData);
router.use('/health-data', healthData)
router.use('/', getWorkout);


export default router;