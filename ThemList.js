'use strict';
import React,{Component} from 'react';
import {
	ListView,
	View,
	Text,
	Image,
	StyleSheet,
  Dimensions,

} from 'react-native';
var WINDOW_HEIGHT = Dimensions.get('window').height;
var WINDOW_WIDTH = Dimensions.get('window').width;
var NetWorking = require('./NetWorking');
var ThemsListCell = require('./ThemsListCell');

var ThemList = React.createClass({

   getInitialState:function(){
   	var dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1 !== row2});
     return{
       dataSource:dataSource,
       dataArr:null,
     };
   },
    action: function*(){  //js的生成器
     yield this.getThems(); 
   },

   
   getThems:function(){
     var net = new NetWorking();
      net.getThemsList().then((responseData)=>{

            this.setState({
              dataSource:this.state.dataSource.cloneWithRows(responseData.others),
              dataArr:responseData.others,
            });
       
      }).done();
   },

   componentDidMount:function(){

    var gen = this.action();
     gen.next();
   },
    
    pressCell:function(rowData){
       this.props.onPress(rowData);
    },
   
   renderRow:function(rowData:Object,sectionId:number|string,heightLightFuc:(sectionID: ?number | string,rowID: ?number | string)=>void){
    return (
      <ThemsListCell onSelect = {this.pressCell} rowData = {rowData} thumbnail = {rowData.thumbnail} />
    );
   },

   _renderHeader:function(){
   if(this.state.dataArr){
    
     var len = this.state.dataArr.length; 
     var myDate = new Date();
     var day = myDate.getDate()
     var index = day%len;
     var obj = this.state.dataArr[index];

    return (
       <ThemsListCell onSelect = {this.pressCell} rowData={{'news':'isFirstNews','description':'今日最新尽在众乐','name':'今日最新'}} thumbnail ={obj.thumbnail} />
    );
  }else{

    return (
       <View/>
    );
  }
   },

	render(){
		return (
      <View >
		     <ListView dataSource={this.state.dataSource}  style = {styles.listViewStyle}  renderRow={this.renderRow} automaticallyAdjustContentInsets={false}
         showsVerticalScrollIndicator={false} renderHeader = {this._renderHeader} />
    </View>
		 );
	}
});

var styles = StyleSheet.create({
  view:{
    flex:1,

  },
  listViewStyle:{
    // flex:1,
    marginTop:64,
    width:WINDOW_WIDTH,
    height: WINDOW_HEIGHT - 64,
  },
});

module.exports = ThemList;