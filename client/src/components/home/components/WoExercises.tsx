import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { WorkoutExerciseProps } from '../../../services/workout/types';
import WoExerciseItem from './WoExerciseItem';


interface Props {
    exercises?: WorkoutExerciseProps[];
    onPress: () => void;
    color: string;
}


const WoExercises = ({ exercises, onPress, color }: Props) => {
    const [exs, setExs] = useState<WorkoutExerciseProps[]>([])


    useEffect(() => {
        if (!exercises) return setExs([])

        //order exercises based on groups
        const sorted = _.sortBy(exercises, (e) => [e.group, e.order]);
        setExs(sorted)
    }, [exercises])


    return (
        <>
            {exs.map((e, i) => (
                <WoExerciseItem
                    exercise={e}
                    key={e._id ? e._id : i}
                    onPress={onPress}
                    color={color}
                />
            ))}
        </>
    )
}

export default React.memo(WoExercises);