import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import SearchSvg from '../../assets/SearchSvg';
import BaseColors, { rgba } from '../../utils/BaseColors';
import Input from './Input';
import { normalize } from '../../utils/tools';
import StyleConstants from '../tools/StyleConstants';

interface Props {
    onSearch?: (txt: string) => Promise<void>;
    onChange?: (txt: string) => Promise<void>;
    placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder, onChange }: Props) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const onChangeText = (txt: string) => {
        if (onChange) {
            onChange(txt)
        }
        setText(txt)
    }

    const onSubmitEditing = async () => {
        if (!onSearch) return;
        setLoading(true)
        await onSearch(text).catch((err) => console.log(err))
        setLoading(false)
    };


    return (
        <View style={styles.container}>
            <View style={styles.searchIcon}>
                <View style={styles.searchSvgBg} />
                <View style={styles.searchSvg}>
                    <SearchSvg strokeColor={BaseColors.black} />
                </View>
            </View>
            {loading ?
                <ActivityIndicator size='small' color={BaseColors.primary} style={styles.loading} /> :
                <Input
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    value={text}
                    placeholder={placeholder}
                    styles={styles.input}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BaseColors.white,
        borderRadius: 100
    },
    loading: {
        margin: normalize.width(45)
    },
    input: {
        width: '100%',
        backgroundColor: BaseColors.white,
        padding: StyleConstants.smallPadding,
        paddingLeft: '12%',
        borderRadius: 100,
        fontSize: StyleConstants.smallFont,
        textTransform: 'lowercase',
    },
    searchIcon: {
        position: 'absolute',
        width: "15%",
        height: '100%',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchSvg: {
        width: "100%",
        height: "35%",
        position: 'absolute',
        zIndex: 100
    },
    searchSvgBg: {
        width: '100%',
        height: '100%',
    }
})
export default SearchBar;