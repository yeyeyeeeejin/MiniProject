import React,{useState,useEffect,useContext} from 'react'
import { View, Text ,Image,FlatList,StyleSheet,TouchableOpacity} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import {FAB} from 'react-native-paper'
import { AuthContext } from '../utils/AuthProvider'
import {
    Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    UserName,
    PostTime,
    MessageText,
    TextSection,
  } from '../../styles/MessageStyles';
const MessagesScreen = ({navigation}) => {
     console.log(user)
    const [users,setUsers] = useState(null)
    const {user, logout} = useContext(AuthContext);
    const getUsers = async ()=>{
             const querySanp = await firestore().collection('users').where('uid','!=', user.uid).get()
             const allusers = querySanp.docs.map(docSnap=>docSnap.data())
            //  console.log(allusers)
            setUsers(allusers)
    }

    useEffect(()=>{
        getUsers()
    },[])

    const RenderCard = ({item})=>{
          return (
              <TouchableOpacity onPress={()=>navigation.navigate('CHAT',{name:item.name,uid:item.uid,
                
            })}>
              <View style={styles.mycard}>
                  <Image source={{uri:item.userImg}} style={styles.img}/>
                  <View>
                      <Text style={styles.text}>
                          {item.name}
                      </Text>
                      <Text style={styles.text}>
                          {item.email}
                      </Text>
                  </View>
              </View>
              </TouchableOpacity>
          )
    }
    return (
     
            <Container>
            <FlatList 
              data={users}
              keyExtractor={item=>item.uid}
              renderItem={({item}) => (
                <Card onPress={() => navigation.navigate('CHAT', {name:item.name,uid:item.uid})}>
                  <UserInfo>
                    <UserImgWrapper>
                      <UserImg source={{uri:item.userImg}} />
                    </UserImgWrapper>
                    <TextSection>
                      <UserInfoText>
                        <UserName>{item.name}</UserName>
                        <PostTime>last time</PostTime>
                      </UserInfoText>
                      <MessageText>last message</MessageText>
                    </TextSection>
                  </UserInfo>
                </Card>
              )}
            />
          </Container>
        );
    };
    
    export default MessagesScreen;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
      },
    });