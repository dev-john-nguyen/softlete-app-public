import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import StyleConstants, { moderateScale } from '../../../tools/StyleConstants';
import BaseColors, { rgba } from '../../../../utils/BaseColors';
import { WorkoutStatus } from '../../../../services/workout/types';
import { MeasSubCats } from '../../../../services/exercises/types';
import { PrimaryText } from '@app/elements';
import Icon from '@app/icons';
import { FlexBox } from '@app/ui';

interface Props {
  status: WorkoutStatus;
  measSubCat: MeasSubCats;
  athlete?: boolean;
}

const ExerciseDataHeader = ({ status, measSubCat, athlete }: Props) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <FlexBox width="100%" marginBottom={5} paddingLeft={15} paddingRight={15}>
      <FlexBox flex={1}>
        <PrimaryText size="medium">Sets</PrimaryText>
      </FlexBox>
      <FlexBox flex={1}>
        <PrimaryText size="medium">Reps</PrimaryText>
      </FlexBox>
      <FlexBox flex={1}>
        <PrimaryText size="medium" textTransform="capitalize">
          {measSubCat ? measSubCat : 'Pounds'}
        </PrimaryText>
      </FlexBox>
      <FlexBox flex={1}>
        <PrimaryText size="medium" textTransform="capitalize">
          {status !== WorkoutStatus.inProgress ? 'Percent' : ''}
        </PrimaryText>
      </FlexBox>
    </FlexBox>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.4,
          alignItems: 'center',
          marginRight: StyleConstants.smallMargin,
        }}>
        <PrimaryText styles={styles.text}>Sets</PrimaryText>
      </View>
      <View
        style={{
          flex: 0.4,
          alignItems: 'center',
          marginRight: StyleConstants.smallMargin,
        }}>
        <PrimaryText styles={styles.text}>Reps</PrimaryText>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginRight: StyleConstants.smallMargin,
        }}>
        {athlete ? (
          <PrimaryText styles={[styles.text, { color: BaseColors.lightGrey }]}>
            Unknown
          </PrimaryText>
        ) : (
          <>
            <Pressable
              style={[
                styles.infoContainer,
                {
                  backgroundColor: showInfo
                    ? rgba(BaseColors.lightWhiteRgb, 0.9)
                    : 'transparent',
                },
              ]}
              onPress={() => setShowInfo(s => (s ? false : true))}
              hitSlop={5}>
              <Icon
                icon="info"
                color={
                  showInfo
                    ? rgba(BaseColors.primaryRgb, 1)
                    : rgba(BaseColors.lightWhiteRgb, 0.5)
                }
                size={15}
              />
              {showInfo && (
                <PrimaryText>
                  To change measurement, visit the exercise edit form.
                </PrimaryText>
              )}
            </Pressable>
            <PrimaryText
              styles={[
                styles.text,
                { color: rgba(BaseColors.lightWhiteRgb, 0.5) },
              ]}
              textTransform="capitalize">
              {measSubCat ? measSubCat : 'Pounds'}
            </PrimaryText>
          </>
        )}
      </View>
      <View style={{ flex: 0.5, alignItems: 'center' }}>
        <PrimaryText styles={styles.text}>
          {status !== WorkoutStatus.inProgress ? 'Pct' : ''}
        </PrimaryText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: StyleConstants.smallMargin,
    zIndex: 100,
    paddingLeft: StyleConstants.baseMargin,
    paddingRight: StyleConstants.baseMargin,
  },
  text: {
    color: rgba(BaseColors.lightWhiteRgb, 0.5),
    fontSize: StyleConstants.extraSmallFont,
    textTransform: 'capitalize',
  },
  infoSvg: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    padding: 5,
    top: -5,
    borderRadius: 10,
  },
  infoText: {
    color: BaseColors.primary,
    fontSize: StyleConstants.smallerFont,
    paddingTop: 5,
    textAlign: 'center',
  },
});
export default ExerciseDataHeader;
