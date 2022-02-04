import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ReducerProps } from '../../services';
import { connect } from 'react-redux';


interface Props {

}


const CustomUtils = ({ }: Props) => {
    return (
        <View style={styles.container}>
            <Text>Utils</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

const mapStateToProps = (state: ReducerProps) => ({
    user: state.user
})

export default connect(mapStateToProps, {})(CustomUtils);