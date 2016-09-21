'use strict';
import React, { Component } from 'react';
var NetWorking = require('./NetWorking');
var MyCustomCell = require('./MyCustomCell.js');

// import ViewPager from 'react-native-viewpager';
 var ViewPager = require('react-native-viewpager');


 // import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
var PullRefreshScrollView = require('./PullRefreshScrollView');

import {
  AppRegistry,
  StyleSheet,
  ListView,
  Dimensions,
  Text,
  TouchableHighlight,
  View,
  Image,
  Navigator,
} from 'react-native';

var WINDOW_HEIGHT = Dimensions.get('window').height;
var WINDOW_WIDTH = Dimensions.get('window').width;
var beforeDate;
var dataSourceArray = [];



var MyjsView = React.createClass({

renderRow(rowData:Object,sectionId:number | string,rowId:number|string,heightLightFuc:(sectionID: ?number | string,rowID: ?number | string)=>void)
{
  var arr = rowData.images;
  var imageStr = arr[0];

    return(
      <MyCustomCell onSelect = {this.onPressAction}  imageStr = {imageStr} rowData = {rowData} />
    );
},

onPressAction:function(rowData:Object){
   
 var vcd = require('react-native').NativeModules.ViewController;
      vcd.pushNext(JSON.stringify(rowData));
},
headerPress:function(rowData:Object){

   var vcd = require('react-native').NativeModules.ViewController;
   vcd.pushNext(JSON.stringify(rowData));
},

getInitialState:function(){
 var dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1!==row2,});
 var headerDataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
 return{
 	dataS:dataSource,
  headerDataS: headerDataSource,
  dataArr:null,
 }
},

componentDidMount:function(){

var net = new NetWorking();
 net._getGuessList().then(
  (dataObj)=>{
     dataSourceArray = dataSourceArray.concat(dataSourceArray,dataObj.stories);

   this.setState({
    dataS:this.state.dataS.cloneWithRows(dataObj.stories),
    headerDataS:this.state.headerDataS.cloneWithPages(dataObj.stories),
    dataArr:dataObj.stories,

   });
    beforeDate = dataObj.date;

  }
  ).done();
},

 onRefresh:function(PullRefresh){

  var net = new NetWorking();
  net._getGuessList().then(
  (dataObj)=>{
     PullRefresh.onRefreshEnd();
    this.setState({
          dataS:this.state.dataS.cloneWithRows(dataObj.stories),
      });
          

  }
  ).done();
       

  },

  _renderPage:function(pageData:Object,pageID: number | string,){

   var imageUrlArr = pageData.images;
   var imageUrl = imageUrlArr[0];
    return(
     <TouchableHighlight style={{flex:1}} onPress ={()=>{this.headerPress(pageData)}}  >  
      <Image source={{uri:imageUrl}} style={styles.headerItem}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}
              numberOfLines={2}>
              {pageData.title}
            </Text>
        </View>
      </Image>
     </TouchableHighlight>
      );
  },

  renderSectionHeader:function(sectionData:Object,sectionID:number|string){

     return (
        <Text style={styles.sectionHeader}>日期</Text>
      );
  },
  _onEndReached:function(){

      var net = new NetWorking();
      net.newsList(beforeDate).then((responseData)=>{
         dataSourceArray = dataSourceArray.concat(dataSourceArray,responseData.stories);

         this.setState({
           dataS:this.state.dataS.cloneWithRows(dataSourceArray),
         });
         beforeDate = responseData.date;

      }).done();


  },

  _renderHeader:function(){
    return (
     <View style= {{height:200}}>
      <ViewPager dataSource = {this.state.headerDataS} renderPage={this._renderPage} isLoop={true}
            autoPlay={true}/>
     </View>
      );
  },

  render (){
      if(this.state.dataArr){

		return (
      <View style = {styles.view}>
            <ListView ref='listViewRef'  dataSource={this.state.dataS} renderRow={this.renderRow} style={styles.listView}  automaticallyAdjustContentInsets={false} keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} refreshedText='释放立即刷新'  {...props} />}
        showsVerticalScrollIndicator={false}   renderHeader = {this._renderHeader} onEndReached={this._onEndReached} ></ListView>
         </View>
		);
  }else{
    return (
    <View/>
      );
  }
	}
});


var styles = StyleSheet.create({
 view:{
   // flex:1,
   marginTop:64,
   backgroundColor:'#48bbec',
   width:WINDOW_WIDTH,
   height:WINDOW_HEIGHT - 64,

 },

  headerItem: {
    flex: 1,
    height: 200,
    flexDirection: 'row',
  },
  headerTitleContainer:{
    flex: 1,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  sectionHeader: {
    fontSize: 14,
    color: '#888888',
    margin: 10,
    marginLeft: 16,
  },
   headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
  },
 listView:{
   flex:1,
  backgroundColor:'#f0f0f0',
 }
});

AppRegistry.registerComponent('MyjsView', () => MyjsView);
