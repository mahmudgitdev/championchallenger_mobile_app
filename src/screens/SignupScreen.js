import { SafeAreaView ,View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React,{useState} from 'react'
import { colors,sizes } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function SignupScreen({navigation}) {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  return (
    <SafeAreaView style={style.container}>
       <View style={style.signupBox}>
         <View style={{alignItems:'center',paddingBottom:10}}>
           <Text style={style.baseText}>Create Account</Text>
         </View>
         <View style={{paddingBottom:10}}>
          <Text style={style.labelText}>Name:</Text>
           <TextInput
             style={style.inputStyle}
             placeholder='Enter Name'
             onChangeText={(text)=>setName(text)}
             defaultValue={name}

           />
         </View>
         <View style={{paddingBottom:10}}>
          <Text style={style.labelText}>Email:</Text>
           <TextInput
             style={style.inputStyle}
             placeholder='Enter Email'
             onChangeText={(text)=>setEmail(text)}
             defaultValue={email}

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

           />
         </View>
         <View style={{marginTop:10}}>
         <Button
            title="Signup"
            color={colors.darkBlue}
         />
         </View>

         <View style={{marginTop:10}}>
           <Text style={{fontSize:sizes.h3}}>Already have an account?</Text>
           <TouchableOpacity
           onPress={()=>navigation.push('login')}
           >
             <Text style={{color:colors.darkBlue,fontSize:sizes.h3}}>Login here</Text>
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