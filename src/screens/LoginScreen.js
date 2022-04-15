import React,{useState, useContext} from 'react'
import { 
  SafeAreaView,
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Button,
  ActivityIndicator,
  Alert
 } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors,sizes } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';
import { Context as appContext } from '../context/appContext';
export default function LoginScreen({navigation}) {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isError,setisError] = useState(false);
  const [isLoading,setisLoading] = useState(false);

  const { updateToken } = useContext(appContext);
  const saveToken = async(token)=>{
    try {
      await AsyncStorage.setItem('@auth_token',token);
    } catch (error) {
      Alert.alert(
        "Connection Faild!",
        "We are sorry to Authenticate now! Try Again Later",
        [
          { text: "OK" }
        ]
      );
    }
    updateToken(token);
    setisLoading(false);

  }


  const loginAccount = async()=>{

    if(!email || !password){
      setisError(true);
    }else{
      setisLoading(true);

      await api.post('/auth/user/login',{
        email,
        password
      }).then((res)=>{
        if(res.data.error){
          setisLoading(false);
          Alert.alert(
            "Authentication Faild!",
            res.data.error,
            [
              { text: "OK" }
            ]
          );

        }else{
          saveToken(res.data.token);
        }
      }).catch((err)=>{
        Alert.alert(
          "Faild!",
          "Please check connection!",
          [
            { text: "OK" }
          ]
        );
      })

    }

  }



  return (
    <SafeAreaView style={style.container}>
       <View style={style.signupBox}>
         <View style={{alignItems:'center',paddingBottom:10}}>
           <Text style={style.baseText}>Login Account</Text>
         </View>
         {isError?(
         <View style={{paddingTop:5,paddingBottom:5}}>
         <Text style={{color:colors.red,alignSelf:'center'}}>Email and Password Required!</Text>
         </View>
         ):(
           <></>
         )}
         <View style={{paddingBottom:10}}>
          <Text style={style.labelText}>Email:</Text>
           <TextInput
             style={style.inputStyle}
             placeholder='Enter Email'
             onChangeText={(text)=>setEmail(text)}
             defaultValue={email}
             onFocus={()=>setisError(false)}

           />
         </View>
         <View style={{paddingBottom:10}}>
          <Text style={style.labelText}>Password:</Text>
           <TextInput
             secureTextEntry={true}
             style={style.inputStyle}
             placeholder='Enter Password'
             onChangeText={(text)=>setPassword(text)}
             defaultValue={password}
             onFocus={()=>setisError(false)}

           />
         </View>
         {isLoading?(<>
          <ActivityIndicator size="large" color={colors.darkBlue} />
         </>):(<>
        <View style={{marginTop:10}}>
         <Button
          onPress={()=>loginAccount()}
          title="Login"
          color={colors.darkBlue}
         />
        </View>
         </>)}
         

         <View style={{marginTop:10}}>
           <Text style={{fontSize:sizes.h3}}>Don't have an account?</Text>
           <TouchableOpacity
           onPress={()=>navigation.push('signup')}
           >
             <Text style={{color:colors.darkBlue,fontSize:sizes.h3}}>Signup here</Text>
           </TouchableOpacity>
         </View>
 
       </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({

  container:{
    backgroundColor: colors.lightGray,
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  signupBox:{
   width:sizes.width,
   paddingLeft:20,
   paddingRight:20
  },
  inputStyle:{
    padding:8,
    borderWidth:1,
    borderColor: colors.gray,
    borderRadius:5

  },
  baseText:{
    fontSize: sizes.h1,
    fontWeight: 'bold'
  },
  labelText:{
    fontSize:sizes.h3,
    color:colors.black,
    paddingBottom:5
  }

})