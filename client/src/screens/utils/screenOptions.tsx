import React from 'react';
import Fonts from "../../utils/Fonts";
import BaseColors from "../../utils/BaseColors";
import HeaderMenu from "../../components/Menu";
import StyleConstants from '../../components/tools/StyleConstants';
import BackButton from '../../components/BackButton';

export default (parentProps: any, childProps: any) => ({
    headerBackTitleVisible: false,
    headerTitleStyle: {
        fontFamily: Fonts.primary,
        color: BaseColors.black,
        fontSize: StyleConstants.smallerFont
    },
    headerStyle: {
        backgroundColor: BaseColors.lightWhite
    },
    headerLeft: () => {
        return (
            childProps.navigation.canGoBack() && (
                <BackButton onPress={() => childProps.navigation.goBack()} />
            )
        )
    },
    headerRight: () => (
        <HeaderMenu onPress={() => parentProps.navigation.toggleDrawer()} style={{
            marginRight: StyleConstants.baseMargin,
            justifyContent: 'center',
            alignItems: 'center',
        }} />
    )
})