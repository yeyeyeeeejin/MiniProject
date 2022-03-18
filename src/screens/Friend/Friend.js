import { View, Text,StyleSheet,  FlatList,
  SafeAreaView,  TextInput,Button} from 'react-native';
import React,{useState,useEffect} from 'react';
import { Image } from 'react-native-elements';

const Friend = () => {
  const[filterdData,setfilterdData] = useState([]);
  const[masterData,setmasterData] = useState([]);
  const[search,setsearch]=useState('');
  useEffect(() =>{
    fectchPosts();
    return () => {
      
    }
  },[])

  const fectchPosts  = () =>{
    const apiURL ='https://jsonplaceholder.typicode.com/users';//무료온라인 api. 가짜 데이터 생성
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) =>{
      setfilterdData(responseJson);
      setmasterData(responseJson);
  }).catch((error) => {
    console.error(error);
  })
  }
  const searchFilter =(text)=>{
    if (text) {
      const newData =masterData.filter((item)=>{
        const itemData=item.name ? 
        item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData)>-1;
      });
      setfilterdData(newData);
      setsearch(text);
    }else {
      setfilterdData(masterData);
      setsearch(text);
    }
  }
  const ItemView = ({item})=> {
    return (
      <Text style ={styles.itemStyle}>
        {item.name.toUpperCase()}
      </Text>
    )
  }


  const ItemSeparatorView =() => {
    return (
      <View style={{height:0.5,width:'100%',backgoroundColor:'#c8c8c8'}}
      />
    )
  }

  return (    

    <SafeAreaView style ={{flex:1}}>

      <View style={styles.containter}>
        <View style={styles.title}>     
          <Text style={styles.titleText}>친구 목록</Text>
        </View>
        <TextInput style={styles.textInputStyle}
        value={search} 
        placeholder="search Here"
        underlineColorAndroid="transparent"
        onChangeText={(text) =>searchFilter(text)}></TextInput>
        <FlatList  
        data={filterdData}
        keyExtractor={(item,index) => index.toString()}
        ItemseparatorComponent = {ItemSeparatorView}
        renderItem ={ItemView}
        />
      </View>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  containter:{
    backgroundColor:'white',
    alignContent:'center',
  },
  itemStyle:{
    padding:15,
    color: '#000',

  },
  title:{ 
    height:50,
    backgroundColor: 'orange',
    justifyContent: "center",
    flexDirection: 'row',
    alignItems: "center",
  },
  titleText:{
    color:'white',
    marginTop:10,
    height:40,
    fontSize:20,
    textAlign:'center'
    },

  textInputStyle:{
    height:50,
    borderWidth:1,
    paddingLeft:20,
    borderBottomColor:'orange',
    borderColor:'white',
    backgroundColor:'#f5f5f4'

  }
});

export default Friend;
