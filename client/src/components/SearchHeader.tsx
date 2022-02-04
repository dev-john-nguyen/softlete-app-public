import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './elements/SearchBar';
import HeaderMenu from './Menu';
import BaseColors from '../utils/BaseColors';
import StyleConstants from './tools/StyleConstants';
import FilterSvg from '../assets/FilterSvg';
import { normalize } from '../utils/tools';


interface Props {
    onSearch: (txt: string) => Promise<void>;
    onChange?: (txt: string) => Promise<void>;
    onOpenDrawer?: () => void;
    onFilter?: () => void;
}


const SearchHeader = ({ onSearch, onOpenDrawer, onFilter, onChange }: Props) => {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={{ width: '4%' }} />
            <SearchBar onSearch={onSearch} placeholder='Search' onChange={onChange} />
            {
                onFilter && (
                    <View style={styles.filterContainer}>
                        <Pressable style={styles.filter} hitSlop={5} onPress={onFilter}>
                            <FilterSvg fillColor={BaseColors.black} />
                        </Pressable>
                    </View>
                )
            }
            {
                onOpenDrawer && (
                    <HeaderMenu
                        onPress={onOpenDrawer}
                        style={styles.menu}
                        menuColor={BaseColors.black}
                    />
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: StyleConstants.smallMargin,
        paddingLeft: StyleConstants.baseMargin,
        paddingRight: StyleConstants.baseMargin,
    },
    filterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        marginLeft: StyleConstants.smallMargin
    },
    menu: {
        marginLeft: StyleConstants.smallMargin,
        justifyContent: 'center', alignItems: 'center'
    },
    filter: {
        height: normalize.width(25),
        width: normalize.width(25)
    }
})
export default SearchHeader;