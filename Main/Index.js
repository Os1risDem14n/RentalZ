import React from 'react'
import {View} from 'react-native'

import RzButton from '../Components/button'
import RzText from '../Components/text'

const Index = ({navigation}) => {
    
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1, alignItems: 'center'}}>

                <RzText 
                text="RentalZ"
                />

                <RzButton 
                title="Create" 
                handlePress={() => navigation.navigate('Create')}
                />

                <RzButton 
                title="Show" 
                handlePress={() => navigation.navigate('Show')}
                />

                <RzButton 
                title="Search" 
                handlePress={() => navigation.navigate('Search')}
                />

            </View>
        </View>
    )
}

export default Index