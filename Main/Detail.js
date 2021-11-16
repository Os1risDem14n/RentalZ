import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView} from 'react-native'

import RzButton from '../Components/button'
import { dbConnect } from '../Components/dbConnect'

const db = dbConnect.connect()

const Detail = ({route, navigation}) => {
    const {item} = route.params

    const deleteItem = () => {
        try {
          db.transaction((tx) => {
            tx.executeSql(
              "DELETE FROM table_house_rental WHERE ID = ?",
              [item.ID],
              (tx, result) => {
                alert("Already deleted");
              }
            )
          })
        } catch (error) {
         
        }
        navigation.navigate("Index")
      }

      const updateItem = (id, propertyItem, bedroomsItem, datetimeItem, monthlypriceitem, furnitureItem, notesItem, namereporterItem) => {
        navigation.navigate('Update', {
          ID: id,
          PropertyType: propertyItem,
          Bedrooms: bedroomsItem,
          DateTime: datetimeItem,
          MonthlyPrice: monthlypriceitem,
          FurnitureType: furnitureItem,
          Notes: notesItem,
          NameReporter: namereporterItem
        })
      }

    return (
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.listItem}>
        <Text style={styles.textHeader}>Number </Text>
          <Text style={styles.textBottom}>{item.ID}</Text>

          <Text style={styles.textHeader}>Property Type</Text>
          <Text style={styles.textBottom}>{item.PropertyType}</Text>

          <Text style={styles.textHeader}>Bedrooms</Text>
          <Text style={styles.textBottom}>{item.Bedrooms}</Text>

          <Text style={styles.textHeader}>Date Booking</Text>
          <Text style={styles.textBottom}>{item.DateTime}</Text>

          <Text style={styles.textHeader}>Monthly Rent Price</Text>
          <Text style={styles.textBottom}>{item.MonthlyPrice}</Text>

          <Text style={styles.textHeader}>Furniture</Text>
          <Text style={styles.textBottom}>{item.FurnitureType}</Text>

          <Text style={styles.textHeader}>Notes</Text>
          <Text style={styles.textBottom}>{item.Notes}</Text>

          <Text style={styles.textHeader}>Name of the reporter</Text>
          <Text style={styles.textBottom}>{item.NameReporter}</Text>

          <RzButton title="Delete" handlePress={deleteItem}/>
          <RzButton title="Update" handlePress={() => updateItem(item.ID,item.PropertyType, item.Bedrooms, item.DateTime, item.MonthlyPrice, item.FurnitureType, item.Notes, item.NameReporter)}/>
        </View>
        </ScrollView>
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

export default Detail