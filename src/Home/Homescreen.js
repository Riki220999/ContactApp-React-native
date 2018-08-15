import React, {Component} from 'react';
import {Alert,Platform, StyleSheet, View, StatusBar} from 'react-native';
import {
  Content, 
  Fab, 
  Button, 
  Icon, 
  Spinner, 
  ListItem, 
  Left, 
  Body, 
  Right, 
  Thumbnail, 
  Text } from "native-base"
  import axios from "axios";

  import ListItems from "./component/ListItems"

  const logo    = require("../../Asset/gambar/android.png");
  const logoadd = require("../../Asset/gambar/logoadd.png");

  export default class Homescreen extends Component {
    constructor(props){
      super(props);

      this.state = {
        data : [],
        perpage : 5,
        page : 1,
        sort:1,
        loading: false
      }
    }

// Mengambil data User
makeRemoteRequest = () => {
  const {page,perpage,sort} = this.state
  this.setState({loading:true})
  setTimeout(() => {
    axios.get(`http://192.168.0.8:1999/kontak/?page=${page}&perpage=${perpage}&sort=${sort}`)
    .then(res => {
      const newData = this.state.data.concat(res.data);
      this.setState({
        loading:false,
        data : newData
      })
    })
    .catch(err => {
      throw err;
    });
  }, 3000)
}

componentDidMount(){
  this.makeRemoteRequest()
} 

// Menambah Atau Post Data User
handlePostClick = (nama, email, nomor) => {
  axios.post('http://192.168.0.8:1999/kontak', {
    nama,email,nomor
  })
  .then((response) => {
    const newData = this.state.data.concat(response.data);
    this.setState({
      data : newData
    })
    this.props.navigation.popToTop()
  })
  .catch((error) => {
    throw error
  });
}

// Menghapus Data User
handleDelete = (id, index) => {
  axios.delete(`http://192.168.0.8:1999/kontak/${id}`)
  .then(res => {
    const newData = this.state.data.concat();
    newData.splice(index, 1);

    this.setState({
      data : newData
    })
  })
  .catch(err => {
    throw err;
  });
}

// Mengedit Data User
handleEdit = (nama,email,nomor,id) => {
  axios.put(`http://192.168.0.8:1999/kontak/edit/${id}`, {
    nama,email,nomor
  })
  .then((response) => {
    this.setState({
      data : response.data,
    })
    this.props.navigation.popToTop()
  })
  .catch((error) => {
    throw error
  });
}

handleLoadMore = () => {
  this.setState({
    page : this.state.page + 1
  }, () => {
    this.makeRemoteRequest()
  })
}

// spiner
renderFooter = () => {
  if(this.state.loading === false) return null;

  return (
    <View>
    <Spinner color='#b30059' />
    </View>
    )
  }

  renderList = (item,index) => {
    return(
    <ListItem 
    style={{marginRight:20}}
    avatar 
    key={index}
    onPress = {
      () => this.props.navigation.navigate("Edit", {
        id : item._id,
        handleEdit : this.handleEdit
      }
      )
    } 

    onLongPress={() => Alert.alert(
      'Apakah Anda Yakin?',
      'Anda Akan Menghapus Kontak ?',
      
      [

      {text: 'Cancel', onPress: () => null},
      {text: 'OK', onPress: () => this.handleDelete(item._id, index)},
      
      ],

      { cancelable: false }
      )}>
      <Left>
      <Thumbnail style={{backgroundColor:"black" }} source={logo} />
      </Left>
      <Body>
      <Text style={{fontFamily:"sans-serif-medium", fontSize: 17}}>{item.nama}</Text>
      <Text style={{fontFamily:"sans-serif", fontSize: 13}}>{item.nomor}</Text>
      <Text note>{item.email.toLowerCase()}</Text>
      </Body>
      </ListItem>
      )
    }

    render() {
      const {nama, email,nomor} = this.state
      return (
      <View style={styles.container}>
      <StatusBar 
      backgroundColor="#b30059"
      barStyle="light-content"
      />

      <View style={{flex: 1}}>
      <ListItems 
      {...this.props}
      data={this.state.data}
      handleDelete={this.handleDelete}
      handleEdit={this.handleEdit}
      handleLoadMore={this.handleLoadMore}
      renderFooter={this.renderFooter}
      renderList = {this.renderList}
      />
      </View>

      <Fab
      style={{ backgroundColor: '#b30059' }}
      position="bottomRight"
      onPress={() => this.props.navigation.navigate("Add", {
        handlePostClick:this.handlePostClick
      })}>
      <Thumbnail source={logoadd} style={{backgroundColor:"black"}} />
      </Fab>
      </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    }
  });
