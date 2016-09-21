'use strict';
import React,{Component} from 'react';
import {
	ListView,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableHighlight,
    Dimensions,

} from 'react-native';
var WINDOW_HEIGHT = Dimensions.get('window').height;
var WINDOW_WIDTH = Dimensions.get('window').width;
var NetWorking = require('./NetWorking');
var ThemsListCell = React.createClass({

   select:function(){
     this.props.onSelect(this.props.rowData);
   },

	render(){
	return (
		 <TouchableHighlight onPress={this.select}  style = {styles.cell} >
		   <View style = {styles.contenter}>
		    <View style={styles.contenter}>
		     <Image style={styles.contenter} source={{uri:this.props.thumbnail}} /> 
		    </View>
		     <View>
		        <Text style={styles.des}>{this.props.rowData.description}</Text>
		     </View>
		    <View>
             <Text style={styles.txt}>{this.props.rowData.name}</Text>
            </View>
            </View>
		  </TouchableHighlight>
	);
	}
});

var styles= StyleSheet.create({
 contenter:{
  	flex:1,
  },
 cell:{
  	flex:1,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#f0f0f0',
    height:200,
  },

  txt:{
  	bottom:10,
  	textAlign:'center',
  	color:'#ffffff',
  	position: 'absolute',
  	backgroundColor:'transparent',
  	width:WINDOW_WIDTH,
  	height:30,
  	fontSize:20,
  },
  des:{
  	bottom:80,
  	textAlign:'center',
  	color:'#ffffff',
  	position: 'absolute',
  	backgroundColor:'transparent',
  	width:WINDOW_WIDTH,
  	height:100,
  	fontSize:14,
  },

});

module.exports = ThemsListCell;