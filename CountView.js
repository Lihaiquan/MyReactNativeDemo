'use strict';
import React,{Component} from 'react';
import{
	View,
	Text,
	StyleSheet,
} from 'react-native';

import Timer from 'react-timer-mixin';

var CountView = React.createClass({

mixins:[Timer],

getInitialState:function(){

var counter = 3;
  return {
  	count:counter,
  };
},

componentWillUpdate:function(){
  this.setTimeout(()=>{
   var counter = this.state.count -1 ;
   if(counter == 0){

   }else{
     this.setState({
   	  count:counter,
     });
  } 
  },1000);
},


 render(){
 	return(
     <View style={this.props.style}>
      <Text style = {styles.tex}>{this.state.count}</Text>
     </View>
 	);
 }
});

var styles = StyleSheet.create({
  tex:{
     flex:1,
     color:'#ffffff',
     fontSize: 16,
     textAlign:'center',
     backgroundColor:'transparent',
  }
});
module.exports = CountView;
