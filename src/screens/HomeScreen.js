import React,{useEffect, useState} from 'react'
import { 
  View, 
  Text,
  StatusBar,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
 } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, sizes } from '../constants'
import api from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function HomeScreen({navigation}) {

  const [mylibrary,setMylibrary] = useState([]);
  const [assignment,setAssignment] = useState([]);
  const [isLoading,setisLoading] = useState(true);


  const loadUserInfo = async()=>{
    const token = await AsyncStorage.getItem('@auth_token');
    api.defaults.headers.common['auth-token'] = token;
    await api.get('/my-library').then((res)=>{
      setMylibrary(res.data.mylibrary);
      setAssignment(res.data.myassignment);
      setisLoading(false);
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(()=>{
    loadUserInfo();
  },[0])

  const Item = ({ item }) => (
    <TouchableOpacity
    onPress={()=> navigation.navigate('quiz_details',{
      title: item.title,
      id:item._id
    })}
    >
    <View style={{
      ...style.itemStyle,
      ...style.shadow
      }}>
      <Image
        style={style.imageThumbnail}
        source={{ uri: "https://v1.tailwindcss.com/img/card-top.jpg" }}
      />
      <View style={{
        padding:5
      }}>
        <Text style={{
          fontSize:sizes.h3,
          color:'midnightblue',
          fontWeight:'bold'
        }}>{item.title}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  const renderItem = ({item})=>{
    return <Item item={item} />
     
  }



  return (
    <SafeAreaView 
    style={style.container}>
      <StatusBar 
      animated={true}
      translucent={false}
      backgroundColor='midnightblue' 
      barStyle='light-content' 
      />
      {isLoading?(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <ActivityIndicator size="large" color='midnightblue' />
      </View>
      ):(
      <>

        <View style={{
          width:sizes.width,
        }}
        >
          <View style={{
            ...style.assignmentBox,
            ...style.shadow
          }}>
            <View style={{paddingTop:5,paddingBottom:10}}>
              <Text style={{fontSize:sizes.h2,fontWeight:'bold',color:colors.black}}>Assignment ({assignment?assignment.length:0})</Text>
            </View>

            <View>
              {assignment?.slice(0, 3).map((item)=>{
                return <TouchableOpacity
                  key={item._id}
                  style={{
                      flexDirection:'row',
                      alignItems:'center',
                      paddingBottom:5
                      }}>
                  <MaterialCommunityIcons color='midnightblue' name='file-document' size={25} />
                    <View style={{
                      marginLeft:5,
                    }}>
                    <Text style={{fontSize:sizes.h4,fontWeight:'bold',color:'midnightblue'}}>Ends in 22 days</Text>
                    <Text style={{fontSize:sizes.h3,fontWeight:'bold',color:'black'}}>{item.title}</Text>
                    </View>
                  </TouchableOpacity>
              })}
            </View>
          </View>
        </View>

        <View style={{
          flex:1,
          backgroundColor: colors.white,
          width:sizes.width,
          marginTop:10,
          ...style.shadow,
        }}>
        <View style={{paddingTop:5,paddingBottom:10,paddingLeft:10}}>
          <Text style={{fontSize:sizes.h2,fontWeight:'bold',color:colors.black}}>My Library ({mylibrary?mylibrary.length:0})</Text>
        </View>


          <FlatList 
              data={mylibrary}
              renderItem={renderItem}
              numColumns={2}
              keyExtractor={item => item._id}
          />


        </View>

      </>
      )}

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.lightGray
  },
  assignmentBox:{
    backgroundColor: colors.white,
    width: sizes.width,
    padding:10
  },
  itemStyle:{
    width:sizes.width/2 - 16,
    backgroundColor: colors.white,
    marginVertical: 8,
    marginHorizontal: 8,

  },
  imageThumbnail:{
    justifyContent: 'center',
    alignItems: 'center',
    height:160
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