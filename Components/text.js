import React from 'react'
import {View, Text, StyleSheet } from 'react-native'

const RzText = (props) => {
    return (
        <Text style={styles.text}>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 50,
        marginBottom: 30,
        color: "#1F51FF",
        fontSize: 50,
        fontWeight: "bold",
    },
    textBar:{
        textAlign: 'left',
        fontSize:20,
        fontStyle: 'italic',
        color: "#1F51FF",
    }
})

export default RzText