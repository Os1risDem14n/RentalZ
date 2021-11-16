import React, {useState, useEffect} from 'react'
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import { dbConnect } from '../Components/dbConnect'


const db = dbConnect.connect()

const Show = ({navigation}) => {
    const [listItem, setListItem] = useState([])

    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_house_rental'",
            [],
            function (tx, res) {
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_house_rental(ID INTEGER PRIMARY KEY AUTOINCREMENT, PropertyType TEXT Unique, Bedrooms INTEGER, DateTime INTEGER, MonthlyPrice TEXT, FurnitureType TEXT, Notes TEXT, NameReporter TEXT)',
                  []
                );
              }
            }
          );
        });
      }, []);

    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_house_rental',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setListItem(temp);
            }
          );
        });
      }, []);
    
      let listItemView = (item) => {
          return(
        <TouchableOpacity onPress={() => navigation.navigate("Detail", { item })} >
            <View key={item.ID} style={styles.listItem}>
          <Text style={styles.textHeader}>Property type</Text>
          <Text style={styles.textBottom}>{item.PropertyType}</Text>

          <Text style={styles.textHeader}>Bedrooms</Text>
          <Text style={styles.textBottom}>{item.Bedrooms}</Text>

          <Text style={styles.textHeader}>Date Booking</Text>
          <Text style={styles.textBottom}>{item.DateTime}</Text>

          <Text style={styles.textHeader}>Monthly Rent Price</Text>
          <Text style={styles.textBottom}>{item.MonthlyPrice}</Text>

          <Text style={styles.textHeader}>Furniture</Text>
          <Text style={styles.textBottom}>{item.FurnitureType}</Text>
            </View>
        </TouchableOpacity>
    )
}

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <FlatList
                    data={listItem}
                    keyExtractor={item => item.ID}
                    renderItem={({item}) => (listItemView(item))}
                    extraData = {listItem}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listItem: {
        padding: 25,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#EEE',
    },
    textHeader: {
        color: '#111',
        fontSize: 15,
        fontWeight: 'bold',
    },
    textBottom: {
        color: '#111',
        fontSize: 18,
    }
})

export default Show