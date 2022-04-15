import React,{useState,useContext,useEffect} from 'react'
import { View, Text, StyleSheet,Button, ActivityIndicator } from 'react-native'
import { colors, sizes } from '../constants'
import api from '../services/api'
import { Context as appContext } from '../context/appContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [user,setUser] = useState({});
  const [isLoading,setisLoading] = useState(true);
  const { updateToken } = useContext(appContext);

  const logout =async()=>{
    
    try {
      await AsyncStorage.removeItem('@auth_token');
    } catch (error) {
      console.log(error);
    }

    updateToken('');
  }
  const loadUser = async()=>{
    const token = await AsyncStorage.getItem('@auth_token');
    api.defaults.headers.common['auth-token'] = token;
    await api.get('/auth/user').then((res)=>{
      setUser(res.data);
      setisLoading(false);
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    loadUser();
  },[0])
  return (
      <View style={style.container}>
        {isLoading?(<>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <ActivityIndicator size="large" color='midnightblue' />
          </View>
        </>):(<>
        <View style={style.boxView}>
          <View style={{
            ...style.userBox,
            ...style.shadow
          }}>
            <Text style={style.userBoxTxtn}>Mahmudul Hasan</Text>
            <Text style={style.userBoxTxte}>bingomahmud@gmail.com</Text>
          </View>
        </View>
        <Button 
        onPress={()=>logout()}
        title='logout'
        color={colors.red}
        />
      </>)}


      </View>
  )
}

const style = StyleSheet.create({
  container:{
    backgroundColor:colors.lightGray,
    flex:1
  },
  userBox:{
    backgroundColor: colors.white,
    width: sizes.width,
    padding:10,
  },
  userBoxTxtn:{
    fontSize: sizes.h2,
    color:'midnightblue',
    fontWeight:'bold'
  },
  userBoxTxte:{
    fontSize: sizes.h3
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 2,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
}
});