'use strict';
import React,{Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	WebView,
	Dimensions,
} from 'react-native';
var NetWorking = require('./NetWorking');
var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;



var MyScene = React.createClass({
    
   getInitialState:function(){
   	return{
   		isHaveData:false,
   		detail:null,
   	};
   },

   componentDidMount:function(){
    var net = new NetWorking();
    net._getDetailInfoWithId(this.props.myProp.id).then((data)=>{
   
    	this.setState({
    		isHaveData:true,
    		detail:data,
    	});
    }).done();
      
   },

     onWebViewScroll: function(event) {
     },

	render(){
	   if(this.state.isHaveData ===false){
		return (
          <View style = {styles.view} >
           <Text style={styles.txt}>正在加载...</Text>
          </View>
		);
	}else{
      if(this.state.detail){
      var html = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="'
          + this.state.detail.css[0]
          + '" /></head><body>' + this.state.detail.body
          + '</body></html>';
       return (
          <WebView  style={styles.content} source={{html:html}} onScrollChange={this.onWebViewScroll}  />
		);
   }else{
   	  return (
          <View style = {styles.view} >
           <Text>加载失败...</Text>
          </View>
		);
   }
	}
	}
});

var styles = StyleSheet.create({
	view:{
	marginLeft:0,
  	backgroundColor:'#f0f0f0',
    marginTop:64,
    width:WINDOW_WIDTH,
    height:WINDOW_HEIGHT - 64  ,
    alignItems:'center',
    justifyContent:'center',
  },
  content: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top:64,
  },
  txt:{
    textAlign:'center',
    fontSize:20,
  },
	});

module.exports = MyScene;