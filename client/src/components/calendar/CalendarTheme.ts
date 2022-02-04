import { Theme } from "react-native-calendars/src/types";
import BaseColors, { rgba } from "../../utils/BaseColors";
import Fonts from "../../utils/Fonts";
import { normalize } from "../../utils/tools";
import StyleConstants from "../tools/StyleConstants";

export default {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textSectionTitleColor: BaseColors.primary,
    textSectionTitleDisabledColor: BaseColors.lightGrey,
    selectedDayBackgroundColor: BaseColors.white,
    selectedDayTextColor: BaseColors.white,
    todayTextColor: BaseColors.primary,
    dayTextColor: BaseColors.black,
    textDisabledColor: BaseColors.lightGrey,
    dotColor: BaseColors.primary,
    selectedDotColor: BaseColors.primary,
    arrowColor: BaseColors.primary,
    disabledArrowColor: BaseColors.secondary,
    monthTextColor: BaseColors.primary,
    indicatorColor: BaseColors.primary,
    textDayFontFamily: Fonts.secondaryBold,
    textMonthFontFamily: Fonts.primary,
    textDayHeaderFontFamily: Fonts.secondaryBold,
    textDayFontSize: 16,
    textMonthFontSize: StyleConstants.mediumFont,
    textDayHeaderFontSize: 14,
    "stylesheet.calendar.header": {
        header: {
            marginBottom: 10,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    },
    "stylesheet.day.basic": {
        base: {
            width: normalize.width(12),
            height: normalize.width(11),
            alignItems: 'center',
            backgroundColor: "#f3f3f3",
            borderRadius: 10
        },
        today: {
            width: normalize.width(12),
            height: normalize.width(11),
            alignItems: 'center',
            borderColor: BaseColors.primary,
            backgroundColor: BaseColors.white,
            borderWidth: .5,
            borderRadius: 10
        },
        selected: {
            borderRadius: 10
        },
    },
} as Theme