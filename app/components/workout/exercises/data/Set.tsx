import { PrimaryText } from '@app/elements';
import { FlexBox } from '@app/ui';
import { Colors, normalize, rgba, StyleConstants } from '@app/utils';
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import {
  WorkoutExerciseDataProps,
  WorkoutStatus,
} from '../../../../services/workout/types';
import CircleCheck from '../../../elements/CircleCheck';
import Input from '../../../elements/Input';
import { DataKeys } from './types';

interface Props {
  showWarmUp: boolean;
  editable: boolean;
  onRemoveSet: (index: number) => void;
  onWarmUpPress: (index: number) => void;
  index: number;
  item: WorkoutExerciseDataProps;
  onChangeText: (
    item: WorkoutExerciseDataProps,
    index: number,
    key: DataKeys,
    val: string,
  ) => void;
  onChangePText: (
    item: WorkoutExerciseDataProps,
    index: number,
    key: DataKeys,
    val: string,
  ) => void;
  placeholder: string;
  value: string;
  athlete?: boolean;
  onCircleCheckPress: (item: WorkoutExerciseDataProps, index: number) => void;
  status: string;
  dataKey: DataKeys;
}

const SetData = ({
  showWarmUp,
  editable,
  onWarmUpPress,
  onRemoveSet,
  index,
  item,
  onChangeText,
  onChangePText,
  placeholder,
  value,
  athlete,
  onCircleCheckPress,
  status,
  dataKey,
}: Props) => {
  return (
    <FlexBox column width="100%" flex={1}>
      {showWarmUp && (
        <FlexBox
          width="100%"
          marginBottom={15}
          alignItems="center"
          justifyContent="space-between"
          opacity={0.5}>
          <FlexBox
            height={1}
            width="30%"
            borderRadius={100}
            backgroundColor={Colors.lightGrey}
          />
          <PrimaryText color={Colors.lightWhite} size="small">
            End Warm Up
          </PrimaryText>
          <FlexBox
            height={1}
            width="30%"
            borderRadius={100}
            backgroundColor={Colors.lightGrey}
          />
        </FlexBox>
      )}
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [
            styles.setsContainer,
            {
              backgroundColor: pressed
                ? rgba(Colors.lightWhiteRgb, 0.2)
                : 'transparent',
            },
          ]}
          onLongPress={() => editable && onRemoveSet(index)}
          onPress={() => editable && onWarmUpPress(index)}>
          <PrimaryText size="large" variant="secondary">
            {(index + 1).toString()}
          </PrimaryText>
        </Pressable>

        <FlexBox flex={1} alignItems="center" borderRadius={5} marginRight={5}>
          <Input
            value={item.reps.toString()}
            onChangeText={val => onChangeText(item, index, DataKeys.reps, val)}
            numbers={true}
            styles={[
              styles.input,
              {
                color: athlete ? Colors.black : Colors.lightWhite,
              },
            ]}
            keyboardType="numeric"
            editable={editable && !athlete}
          />
        </FlexBox>

        <FlexBox flex={1} alignItems="center" borderRadius={5} marginRight={5}>
          <Input
            value={value}
            onChangeText={val => onChangePText(item, index, dataKey, val)}
            numbers={true}
            styles={[
              styles.input,
              {
                color: athlete ? Colors.black : Colors.lightWhite,
              },
            ]}
            placeholder={placeholder}
            keyboardType="numeric"
            editable={editable && !athlete}
          />
        </FlexBox>

        <FlexBox flex={0.6} alignItems="center" justifyContent="center">
          {!athlete && status === WorkoutStatus.inProgress ? (
            <View style={styles.circleCheck}>
              <CircleCheck
                onPress={() => onCircleCheckPress(item, index)}
                checked={item.completed}
              />
            </View>
          ) : (
            <>
              <Input
                value={item.pct ? item.pct.toString() : '0'}
                onChangeText={val =>
                  onChangeText(item, index, DataKeys.pct, val)
                }
                numbers={true}
                styles={[
                  styles.input,
                  {
                    color: athlete ? Colors.black : Colors.lightWhite,
                  },
                ]}
                keyboardType="numeric"
                editable={editable && !athlete}
              />
              <PrimaryText styles={styles.percent}>%</PrimaryText>
            </>
          )}
        </FlexBox>
      </View>
    </FlexBox>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: StyleConstants.smallMargin,
  },
  input: {
    width: '100%',
    textAlign: 'center',
  },
  circleCheck: {
    width: normalize.width(10),
    height: normalize.width(10),
  },
  percent: {
    position: 'absolute',
    right: '0%',
    top: '0%',
    zIndex: 100000,
    color: Colors.lightWhite,
    fontSize: StyleConstants.smallMediumFont,
    opacity: 0.3,
  },
  setsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.4,
    borderRadius: StyleConstants.borderRadius,
    borderWidth: 1,
    borderColor: rgba(Colors.whiteRbg, 0.8),
    marginRight: 5,
  },
  sets: {
    fontSize: StyleConstants.numFont,
    color: Colors.lightWhite,
  },
});
export default SetData;
