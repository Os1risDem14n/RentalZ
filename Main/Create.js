import React, {useState} from 'react'
import { View, Alert, ScrollView,Text,StyleSheet } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import DatePicker from 'react-native-datepicker'

import RzButton from '../Components/button'
import RzText from '../Components/text'
import RzTextInput from '../Components/textInput'
import { dbConnect } from '../Components/dbConnect'
import RzTextBar from '../Components/textBar'

const db = dbConnect.connect()

const CreateHome = ({navigation}) => {
    const [propertyType, setPropertyType] = useState("")
    const [bedRooms, setBedRooms] = useState("")
    const [dateTime, setDateTime] = useState("")
    const [monthlyPrice, setMonthlyPrice] = useState("")
    const [furnitureType, setFurnitureType] = useState("")
    const [notes, setNotes] = useState("")
    const [nameReporter, setNameReporter] = useState("")

    const create = () => {
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
            db.transaction(function(tx){
                tx.executeSql(
                    "INSERT INTO table_house_rental (PropertyType, Bedrooms, DateTime, MonthlyPrice, FurnitureType, Notes, NameReporter) VALUES (?,?,?,?,?,?,?)", 
                    [propertyType, bedRooms, dateTime, monthlyPrice, furnitureType, notes, nameReporter],
                    (tx, results) => {
                        alert("Already created")
                    },
                    Alert.alert("Fail, Property Type must be unique")
                )
            })
            navigation.navigate("Index")
        }
    }

    return (
    <View style={{flex :1, backgroundColor: 'white'}}>
        <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            <RzText text="Create"/>
            <RzTextBar textBar ="Property Type"/>
            <RzTextInput
                placeholder="Property Type"
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

                <Picker.Item label="Select Bedrooms" value="" />
                <Picker.Item label="1 Bedroom" value="1" />
                <Picker.Item label="2 Bedrooms" value="2" />
                <Picker.Item label="3 Bedrooms" value="3" />
                <Picker.Item label="Studio" value="4" />
            </Picker>

            
            <RzTextBar textBar ="Date Booking"/>    
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
                placeholder="Monthly rent price"
                style={{padding: 10}}
                onChangeText={(monthlyPrice) => setMonthlyPrice(monthlyPrice)}
            />
<RzTextBar textBar ="Furniture Type"/>  
            <Picker
                selectedValue={furnitureType}
                style={{ padding: 20, 
                        width: 280,
                        borderColor: 'black',
                        
                         }}
                onValueChange={(itemValue, itemIndex) => setFurnitureType(itemValue)}>
                <Picker.Item label="Select Furniture Type" value = "" />    
                <Picker.Item label="Furnished" value="Furnished" />
                <Picker.Item label="Unfurnished" value="Unfurnished" />
                <Picker.Item label="Part Furnished" value="PartFurnished" />
            </Picker>
            <RzTextBar textBar ="Notes"/>  
            <RzTextInput
                placeholder="Enter notes here"
                style={{ padding: 20}}
                multiline={true}
                numberOfLines={5}
                onChangeText={(notes) => setNotes(notes)}
            />
            <RzTextBar textBar ="Name of the Reporter"/>  
            <RzTextInput
                placeholder="Name of the reporter"
                style={{padding: 20}}
                onChangeText={(nameReporter) => setNameReporter(nameReporter)}
            />
            <RzButton title="Create" handlePress={create}/>
        </View>
        </ScrollView>
    </View>
    )
}


export default CreateHome;