import React, {useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'

import RzButton from '../Components/button'
import RzText from '../Components/text'
import RzTextInput from '../Components/textInput'
import { dbConnect } from '../Components/dbConnect'

const db = dbConnect.connect()

const Search = ({navigation}) => {
    const [searchType, setSearchTpye] = useState("")
    const [TypeData, setTypeData] = useState([])

    const searchtype = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM table_house_rental where PropertyType = ?",
                [searchType],
                (tx, results) => {
                    var len = results.rows.length
                    if(len > 0) {
                        setTypeData(results.rows.item(0))
                    }
                }
            )
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center'}}>

                <RzText 
                text="Search "
                />

                <RzTextInput
                placeholder="Enter your property type !"
                style={{padding: 10}}
                onChangeText={(searchType) => setSearchTpye(searchType)}
                />

                <RzButton title="Search" handlePress={searchtype}/>
            
            <TouchableOpacity onPress={() => navigation.navigate("SearchResult",{ TypeData })}>
            <View style={styles.listItem}>
            <Text style={styles.textHeader}>Property Type</Text>
          <Text style={styles.textBottom}>{TypeData.PropertyType}</Text>

          <Text style={styles.textHeader}>Bedrooms</Text>
          <Text style={styles.textBottom}>{TypeData.Bedrooms}</Text>

          <Text style={styles.textHeader}>Datetime</Text>
          <Text style={styles.textBottom}>{TypeData.DateTime}</Text>

          <Text style={styles.textHeader}>Monthly rent price</Text>
          <Text style={styles.textBottom}>{TypeData.MonthlyPrice}</Text>

          <Text style={styles.textHeader}>Furniture</Text>
          <Text style={styles.textBottom}>{TypeData.FurnitureType}</Text>

          <Text style={styles.textHeader}>Notes</Text>
          <Text style={styles.textBottom}>{TypeData.Notes}</Text>

          <Text style={styles.textHeader}>Name of the reporter</Text>
          <Text style={styles.textBottom}>{TypeData.NameReporter}</Text>
            </View>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    listItem: {
        padding: 25,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#EEE',
    },
    textHeader: {
        color: '#111',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textBottom: {
        color: '#111',
        fontSize: 16,
    }
})

export default Search;