import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
import {TouchableOpacity} from "react-native"

const Headers = ({navigation, handlePostClick}) => (
  <Header style={{backgroundColor:"#b30059"}} androidStatusBarColor="#b30059">
    <Left>
      <Button transparent onPress={() => navigation.pop()}>
        <Icon name='arrow-back' />
      </Button>
    </Left>
    <Body style={{left : 60 }}>
      <Title style={{fontWeight:'bold', fontFamily:'sans-serif', fontSize:18}}>Tambah Kontak</Title>
    </Body>
    <Right>
      <TouchableOpacity onPress={() => handlePostClick()}>
        <Text style={{color: "#fff", top : 1, marginRight:10, fontWeight:"bold"}}>OK</Text>
      </TouchableOpacity>
    </Right>
  </Header>
);

export default Headers