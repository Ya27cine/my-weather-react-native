import axios from 'axios';
import React, {useState} from 'react';
import { View,ScrollView,Image,Pressable, Text, TextInput, StyleSheet, Alert } from 'react-native'


const Home = () => {

    const [text, onChangeText] = useState('');
    const [errors, setErrors] = useState('')
    const [city, setCity] = useState({
        location: {
            name: '',
            country: '',
            region: '',
            localtime: ''
        },
        current: {
            last_updated_epoch: '',
            temp_c: '',
            condition: {
                text: "",
                icon: '',
            },
        },
    })
    const handleSearch    = value =>{  onChangeText(value) }
    const handleClick     = event =>{  if(text)fetchData();}

    const fetchData = async () => {
        await axios
            .get("http://api.weatherapi.com/v1/current.json?key=3ca6b69bfb5e48ea8ed195342223105&q="+text+"&aqi=no")
            .then( _data => {
                setErrors('')
                onChangeText('')
                setCity( _data.data )
            })
            .catch( (e) =>{
             console.log( e )
             setErrors('Not Found !') 
            });
    }

    return ( 
    <View style={style.container}>
        <Text style={style.title}>My Weather  </Text>
        <TextInput
            style={style.input}
            onChangeText={handleSearch}
            value={text}
            placeholder="Write your city ?"
        />

     <Pressable style={style.btSubmit} onPress={handleClick}>
        <Text style={style.btSubmitTxt}> Submit </Text>
    </Pressable>

    {
        (errors) ?   (<Text>{errors}</Text>) 
        : 
        (
            <ScrollView >
                <Text style={style.city}>
                      {city.location.name} ( {city.location.country} )
                    </Text>
                <View style={style.row}>

                    <Text style={style.degree}>
                    {city.current.temp_c + ( city.current.temp_c ?' °' : '')}
                    </Text>
                    <Image
                        style={style.logo}
                        source={{uri: "http://" +  city.current.condition.icon }}
                    />
                </View>
            </ScrollView>
        ) 
    }
    
    </View> 
 );
}


const style = StyleSheet.create({
    container: {
        paddingVertical: "7%",
        paddingHorizontal: "5%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        
      },
      title: {
        fontSize: 65,
        fontWeight: 'bold',
        paddingBottom: '11%'

      },
      input: {
        width: '100%',
        fontSize: 35,
        paddingVertical: 10,
        paddingHorizontal: 7,
        color: 'black',
        margin: 10,
        borderWidth: 2,
        borderRadius: 13
      },
      logo: {
        width: 90,
        height: 69,
      },
      btSubmit: {
        alignItems: 'center',
        backgroundColor: 'black',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        width: '100%',
        borderRadius: 17,
      },
      btSubmitTxt: {
        color: "#FFF",
        fontSize: 25,
      },
      row: {  
        flexDirection: "row",
        flexWrap: "wrap",
      },
      city: {
        fontSize: 39,
        color: 'blue'
      },
      degree: {
        fontSize: 65,
        color: 'red'
      }
})





export default Home;


