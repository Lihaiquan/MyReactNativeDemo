'use strict';

import React, { Component } from 'react';

import {
	View,
	Image,
  NavigatorIOS,
  AppRegistry,
	Text,
	StyleSheet,
  Dimensions,

} from 'react-native';


var WINDOW_WIDTH = Dimensions.get('window').width;
var MyScene = require('./MyScene');
var DetailView = React.createClass({

  getInitialState:function(){
    return {
      obj:null,
    }
  },
 
  backAction:function(){
    var viewController = require('react-native').NativeModules.ViewController;
    viewController.popToViewController();
  },
  
componentWillMount:function(){
   
},

  componentDidMount:function(){

     var viewController = require('react-native').NativeModules.ViewController;
      viewController.getJsobj((string)=>{

         var objc = JSON.parse(string);
        this.setState({
          obj:objc,
        });
      });
    
  },
  
   render(){

if (this.state.obj ===null){
   	  return(
    <View/>
       );
  }else{
    return(
       <NavigatorIOS  style = {styles.container} initialRoute={{
          component: MyScene,
          title:this.state.obj.title ,
          leftButtonTitle: '返回',
           onLeftButtonPress: ()=>{
           this.backAction();
         },
          passProps: { myProp: this.state.obj},
        }} 
        
          tintColor="#008888"/>
    );
  }
   }
});

var styles = StyleSheet.create({

    container: {
    flex:1,
    width:WINDOW_WIDTH,
  },
});

AppRegistry.registerComponent('DetailView', () => DetailView);


//            React-native的 NavigatorIOS 组件的使用
 // {
 //           component: function, // 加载的视图组件
 //           title: string, // 当前视图的标题
 //           passProps: object, // 传递的数据
 //           backButtonIcon: Image.propTypes.source, // 后退按钮图标
 //           backButttonTitle: string, // 后退按钮标题
 //           leftButtonIcon: Image.propTypes.source, // 左边按钮图标
 //           leftButtonIcon: string, // 左边按钮标题
 //           onLeftButtonPress: function, // 左边按钮点击事件
 //           rightButtonIcon: Image.Types.source. // 右边按钮图标
 //           rightButtonTitle: string, // 右边按钮图标
 //           onRightButtonPress: function, // 右边按钮点击事件
 //           wrapperStyle: [object Object] // 包裹样式
 //        }

