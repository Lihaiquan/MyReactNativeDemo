'use strict';
import React, { Component } from 'react';

import {
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  Dimensions,
  View,
} from 'react-native';

var WINDOW_WIDTH = Dimensions.get('window').width;

var MyCustomCell = React.createClass({

onPressAction:function(){
	this.props.onSelect(this.props.rowData);
},

 render(){
	return(
       <TouchableHighlight style={styles.cell} onPress={this.onPressAction}>
        <View style={styles.cellView} >
         <View style={styles.viewImage}>
          <Image style={styles.imagecell} source={{uri:this.props.imageStr}} />
         </View>
         <View style={styles.texView}>
          <Text style={styles.texts} numberOfLines={3}>{this.props.rowData.title}</Text>
         </View>
        </View>
      </TouchableHighlight> 
	);},
});

var styles = StyleSheet.create({
 view:{
   flex:1,
   marginTop:64,
   backgroundColor:'#48bbec',
 },

  imagecell:{
  	height:80,
    width:80,
  },

 viewImage:{
  height:80,
  width:80,
  marginLeft:6,
  backgroundColor:'#000000',
 },

  cell:{
  	flex:1,
  	padding:2,
  	backgroundColor:'#f0f0f0',
  	flexDirection:'row',
  },
  
  cellView:{
    flex:1,
    backgroundColor:'#ffffff',
    marginBottom:12,
    flexDirection:'row',

  },
  
   texView:{
    padding:3,
    height:80,
    width:WINDOW_WIDTH - 80,
    backgroundColor:'#ffffff',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // 
  },

 texts:{
   flex:1,
   height:60,
   backgroundColor:'#ffffff',
   // fontFamily:'Cochin',
   textAlign:'left', 
   marginRight:2,  
   fontSize:17,  
 },

});

module.exports = MyCustomCell;