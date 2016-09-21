'use strict';
import React, { Component } from 'react';
import {
Image,
Text,
View,
Animated,
Dimensions,
StyleSheet,

} from 'react-native';

var CountView = require('./CountView');

var   WINDOW_WIDTH = Dimensions.get('window').with;
var   WINDOW_HEIGHT = Dimensions.get('window').height;


var NetWorking = require('./NetWorking');


var Splash = React.createClass({

   getInitialState:function(){
     return {
     	coverData:null,
      bounceValue:new Animated.Value(1),
     };
   },

   componentDidMount:function(){
    
    var net = new NetWorking();
    net._getCover().then((responseData)=>{
      this.setState({
        coverData:responseData,
      });
    }).done();

    Animated.timing(this.state.bounceValue,{toValue:1.3,duration:3000}).start();
   },

  

   render:function(){
  
    var img,text;
    if(this.state.coverData===null){
       img = {uri:'http://img0.imgtn.bdimg.com/it/u=726278301,2143262223&fm=11&gp=0.jpg'};
        // img = require('./ios/MyJsProgram/Images.xcassets/splash.imageset/default-736h@3x.png');
       text = '北京众乐多屏';

    }else{
       img = {uri:this.state.coverData.img};
       text = this.state.coverData.text;
    }
 
    return (
      <View style = {styles.container}>
       
    
         <Animated.Image source={img} style={{flex:1,width:WINDOW_WIDTH,height:1,transform:[{scale:this.state.bounceValue},]}}/>
          <CountView style = {styles.count} />

         <Text style={styles.text}>
            {text}
         </Text>
      </View>
    	);

   }

});

var styles=StyleSheet.create({
container:{
  flex:1,
  flexDirection:'column',
},
cover: {
    flex: 1,
    width: 200,
    height: 1,
  },
  logo: {
    resizeMode: 'contain',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
    height: 54,
    backgroundColor: 'transparent',
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    backgroundColor: 'transparent',
  },

  count:{
    bottom:WINDOW_HEIGHT - 50,
    position: 'absolute',
    width :60,
    height :30,
    marginLeft:300,
    backgroundColor:'transparent',

  }

});


module.exports = Splash;
