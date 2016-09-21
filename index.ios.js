/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';



import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

 import TimerMixin from 'react-timer-mixin';
 var ThemList = require('./ThemList');

  var Splash = require('./Splash');

 var  MyJSProgram = React.createClass({

   mixins:[TimerMixin],

   onPressAction:function(rowData){
     var vcd = require('react-native').NativeModules.ViewController;
    if(rowData.news){ //如果有值，此时的值是构造的值
     
      vcd.pushNextPage();

    }else{
      vcd.pushThemesVC(rowData.name,JSON.stringify(rowData));
    }
   },

  componentDidMount:function(){
   this.setTimeout(()=>{

    this.setState({
      isSplash:false,
    });
   var vc = require('react-native').NativeModules.ViewController;
   vc.showNavigation();
   },3000);

  },

  getInitialState:function(){
    return {
      isSplash:true,
    };
  },
 

   render() {

  if(this.state.isSplash == true){

    return (
       <Splash style={styles.container} />
      // <View style={styles.container} />
    );

  }else{
    return (
        <ThemList onPress = {this.onPressAction} />
    );
   }
  }

 });



const styles = StyleSheet.create({
 
  touchStyle:{
   height:40,
   // flex:0.5,
   // flexDirection:'row',
   backgroundColor:'#48bbec',
   borderWidth:1,
   borderRadius:8,
   justifyContent:'center',


  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyJSProgram', () => MyJSProgram);
