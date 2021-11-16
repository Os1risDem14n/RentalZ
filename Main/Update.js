import React, { useState, useEffect } from 'react'
import {View,Text, ScrollView} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import DatePicker from 'react-native-datepicker'

import RzButton from '../Components/button'
import RzText from '../Components/text'
import RzTextInput from '../Components/textInput'
import RzTextBar from '../Components/textBar'
import { dbConnect } from '../Components/dbConnect'
import { CurrencyFormat } from '../Components/currencyFormat'

const db = dbConnect.connect()


const Update = ({route, navigation }) => {
    const [ID, setID] = useState("")
    const [propertyType, setPropertyType] = useState("")
    const [bedRooms, setBedRooms] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [monthlyPrice, setMonthlyPrice] = useState("")
    const [furnitureType, setFurnitureType] = useState("")
    const [notes, setNotes] = useState("")
    const [nameReporter, setNameReporter] = useState("")

    useEffect(() => {
        setID(route.params.ID)
        setPropertyType(route.params.PropertyType)
        setBedRooms(route.params.Bedrooms)
        setDateTime(route.params.DateTime)
        setMonthlyPrice(route.params.MonthlyPrice)
        setFurnitureType(route.params.FurnitureType)
        setNotes(route.params.Notes)
        setNameReporter(route.params.NameReporter)
    }, []);

      const updates = () => {
        if(!propertyType) {
          Alert.alert("Please enter Property Type")
            return
        }
        if(!bedRooms) {
          Alert.alert("Please enter Bed Room")
            return
        }
        if(!dateTime) {
          Alert.alert("Please enter Date and Time")
            return
        }
        if(!monthlyPrice) {
          Alert.alert("Please enter Monthly Price")
            return
        }
        // if (!furnitureType){
        //     alert("Please enter Furniture Type")
        // }
        if(!nameReporter) {
          Alert.alert("Please enter Name of Reporter")
            return
      } else {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE table_house_rental SET PropertyType=?, Bedrooms=? , DateTime=?, MonthlyPrice=?, FurnitureType=?, Notes=?, NameReporter=? where ID = ?",
            [propertyType, bedRooms, dateTime, monthlyPrice, furnitureType, notes, nameReporter,ID],
            (tx, results) => {alert("Already updated")    
            }
          );
        });
        navigation.navigate("Index")
      };
    }

  return (
    <View style={{flex :1, backgroundColor: 'white'}}>
       <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <RzText text="Update"/>
            <RzTextBar textBar ="Property Type"/>  
            <RzTextInput
                value = {propertyType}
                style={{padding: 10}}
                onChangeText={(propertyType) => setPropertyType(propertyType)}
            />
<RzTextBar textBar ="Bedroom"/>  
            <Picker
                selectedValue={bedRooms}
                style={{ padding: 10, 
                        width: 280,
                        borderColor: 'black',
                         }}
                onValueChange={(itemValue, itemIndex) => setBedRooms(itemValue)}>

                <Picker.Item label="1 Bedroom" value="1" />
                <Picker.Item label="2 Bedrooms" value="2" />
                <Picker.Item label="3 Bedrooms" value="3" />
                <Picker.Item label="Studio" value="4" />
            </Picker>

            
            <RzTextBar textBar ="Date Time"/>  
        <DatePicker
          style={{backgroundColor: 'white',
                  width: "70%", padding:5,
                  borderWidth: 1,borderRadius: 10,
                  borderColor: "gray",
                  paddingBottom:5,}}
          date={dateTime} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Select Date, format DDMMYY"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(dateTime) => {
            setDateTime(dateTime);
          }}
      />
      <RzTextBar textBar ="Monthly Rent Price"/>  
            <RzTextInput
                value ={monthlyPrice}
                style={{padding: 10}}
                onChangeText={(monthlyPrice) => setMonthlyPrice(monthlyPrice)}
            />

            {/* <CurrencyFormat
                value = {monthlyPrice}
                style = {{padding: 10}}
                onChangeText = {(monthlyPrice) => setMonthlyPrice(monthlyPrice)}
            /> */}
<RzTextBar textBar ="Furtiture Type"/>  
            <Picker
                selectedValue={furnitureType}
                style={{ padding: 20, 
                        width: 280,
                        borderColor: 'black',
                        
                         }}
                onValueChange={(itemValue, itemIndex) => setFurnitureType(itemValue)}>

                 <Picker.Item label="Furnished" value="Furnished" />
                <Picker.Item label="Unfurnished" value="Unfurnished" />
                <Picker.Item label="Part Furnished" value="PartFurnished" />
            </Picker>
            <RzTextBar textBar ="Notes"/>  
            <RzTextInput
                value = {notes}
                style={{ padding: 20}}
                multiline={true}
                numberOfLines={5}
                onChangeText={(notes) => setNotes(notes)}
            />
            <RzTextBar textBar ="Name of the Reporter"/>  
            <RzTextInput
                value = {nameReporter}
                style={{padding: 20}}
                onChangeText={(nameReporter) => setNameReporter(nameReporter)}
            />
            <RzButton title="Update" handlePress={updates}/>
        </View>
        </ScrollView>
    </View>
  );
};

export default Update;