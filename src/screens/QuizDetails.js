import { 
    View, 
    Text, 
    Button, 
    StyleSheet, 
    Image, 
    ActivityIndicator, 
    ScrollView,
    Modal,
    Pressable,
    Switch
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{ useState, useEffect } from 'react'
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, sizes } from '../constants';
import DatePicker from 'react-native-date-picker';
import { format } from "date-fns";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function QuizDetails({route,navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [quiz,setQuiz] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [isTimer,setisTimer] = useState(true);
    const [isRandom,setisRandom] = useState(false);
    const [isNickname,setisNickname] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    const {id} = route.params;

    const toggleSwitchtimer = () => setisTimer(previousState => !previousState);
    const toggleSwitchrandom = () => setisRandom(previousState => !previousState);
    const toggleSwitchnickname = () => setisNickname(previousState => !previousState);
    
    const setpickedDate =(date)=>{
        console.log(date);
    }
    const loadQuiz = async()=>{
        const token = await AsyncStorage.getItem('@auth_token');
        api.defaults.headers.common['auth-token'] = token;
        await api.post('/get/quiz',{
            id
        }).then((res)=>{
            setQuiz(res.data);
            setIsLoading(false);
        }).catch((error)=>{
            console.log(error);
        })

    }

    const start = ()=>{

    }

    const assign = ()=>{
        console.log("assign")
        setModalVisible(true)
    }

  useEffect(()=>{
    loadQuiz();
  },[0]);
  return (
    <SafeAreaView style={style.container}>
        {isLoading?(<>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
             <ActivityIndicator size="large" color='midnightblue' />
          </View>
        </>):(<>

        <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            }}
            onCancel={() => {
            setOpen(false)
            }}
        />

        <Modal 
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
           
        }}
        >
        
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Create an Assignment</Text>

            <View
            style={{
                width:250
            }}
            >
                <Text style={{fontSize:sizes.h3,fontWeight:'bold',color:'black'}}>Players should complete it before:</Text>
                <View style={{
                    marginTop:10,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <Text>{format(new Date(date), "MMMM do, yyyy hh:mm aaaaa'm'")}</Text>
                    <MaterialCommunityIcons onPress={() => setOpen(true)} color='midnightblue' name='timetable' size={28} />
                </View>
            </View>
            <View style={{
                paddingTop:10
            }}>
            <View style={{
                width: 250,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
            <Text>Question Timer</Text>
            <Switch
                trackColor={{ false: "gray", true: colors.darkgreen }}
                thumbColor={isTimer ? colors.darkgreen : 'midnightblue'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchtimer}
                value={isTimer}
            />
            </View>

            <View style={{
                width:250,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
            <Text>Randomize Answer Order</Text>
            <Switch
                trackColor={{ false: "gray", true: colors.darkgreen }}
                thumbColor={isRandom ? colors.darkgreen : 'midnightblue'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchrandom}
                value={isRandom}
            />
            </View>

            <View style={{
                width:250,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between'
            }}>
            <Text>Nickname Generator</Text>
            <Switch
                trackColor={{ false: "gray", true: colors.darkgreen }}
                thumbColor={isNickname ? colors.darkgreen : 'midnightblue'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitchnickname}
                value={isNickname}
            />
            </View>
            </View>





        <View style={{
            marginTop:20,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
        }}>
        <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={style.textStyle}>Close</Text>
        </Pressable>

        <Pressable
              style={[style.button, style.buttonCreate]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={style.textStyle}>Create</Text>
        </Pressable>
        </View>
          </View>
        </View>

        </Modal>

        <ScrollView>
            <View style={{
                backgroundColor: colors.white,
                width: sizes.width-10,
                padding:20,
                alignSelf:'center'
            }}>
            <Image
                style={style.imageThumbnail}
                source={{ uri: "https://v1.tailwindcss.com/img/card-top.jpg" }}
            />

            <Text style={{
                paddingTop:8,
                fontSize: sizes.h2,
                fontWeight:'bold',
                color:'midnightblue'
            }}>{quiz.title}</Text>
            <View style={{
                flexDirection: 'row',
                paddingTop:8
            }}>
                <View>
                <Button 
                onPress={()=>start()}
                title=' Start '
                color='midnightblue'
                />
                </View>
                <View style={{
                    marginLeft:10
                }}>
                <Button 
                onPress={()=>assign()}
                title=' Assign '
                color='midnightblue'
                />
                </View>
            </View>
            </View>

            <View style={{
                backgroundColor: colors.white,
                width: sizes.width-10,
                marginTop:10,
                padding:20,
                alignSelf:'center'
            }}>
            <View>
                <Text style={{fontSize:sizes.h3,fontWeight:'bold',color:'midnightblue'}}>Questions ( {quiz.questions.length} )</Text>
            </View>
            {quiz.questions.map((item, i)=>{
                return <View
                style={{
                    backgroundColor:colors.white,
                    paddingVertical:5,
                    paddingHorizontal:5,
                    ...style.shadow,
                    marginTop:7,
                    borderRadius:5
                }}
                key={item.id}>
                <View style={{
                    flexDirection:'row',
                }}>
                <Text style={style.qTxt}>{i+1}-Quiz: </Text>
                <Text style={style.qTxt}>{item.question}</Text>
                </View>
                <View style={{
                    flexDirection:'column',
                }}>
                    <Text style={style.option}>{item.option1}</Text>
                    <Text style={style.option}>{item.option2}</Text>
                    <Text style={style.option}>{item.option3}</Text>
                    <Text style={style.option}>{item.option4}</Text>
                </View>
            </View>
            })}





            </View>

        </ScrollView>
        </>)}
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1
    },
    imageThumbnail:{
        justifyContent: 'center',
        alignItems: 'center',
        height:180,
        borderRadius:6
    },
    qTxt:{
      fontSize:sizes.h3,
      fontWeight:'bold',
      color:'midnightblue'
    },
    option:{
        fontSize:sizes.h4,
        fontWeight:'800',
        color:colors.black
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 7,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: colors.red,
      },
      buttonCreate:{
        backgroundColor:colors.darkgreen,
        marginLeft:10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        fontSize:sizes.h2,
        fontWeight:'bold',
        color:'midnightblue',
        marginBottom: 15,
      }
})