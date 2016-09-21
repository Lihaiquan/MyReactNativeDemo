'use strict';
import React,{Component} from 'react';
import {
	View,
	ListView,
	Image,
	Text,
	StyleSheet,
  Dimensions,
  TouchableOpacity,
	AppRegistry,
} from 'react-native';
var WINDOW_HEIGHT = Dimensions.get('window').height;
var WINDOW_WIDTH = Dimensions.get('window').width;
var NetWorking = require('./NetWorking'); 
var PullRefreshScrollView = require('./PullRefreshScrollView');


var lastId = 10000000000000;
var dataArr = [];
var theme;
var cachelastId;

var ThemesView = React.createClass({

   getInitialState:function(){
     
     var dataSource = new ListView.DataSource({rowHasChanged:(row1,row2)=>row1!==row2});
   	return {
      dataS:dataSource,
      isloading:true,

   	};
   },
 

 fetchThemes:function(themeId,lastid){
   var net = new NetWorking();
    net.themsList(themeId,lastid)
       .then((responseData)=>{
       dataArr = dataArr.concat(responseData.stories);

       this.setState({
        dataS:this.state.dataS.cloneWithRows(dataArr),
        isloading:false,
       });
    
    var length =  responseData.stories.length;
    cachelastId = lastId;
    if(lastid == null){
       
       for(var index=0;index<length;index ++){
        var obj = responseData.stories[index];
          if (parseInt(obj.id) < parseInt(lastId)) {
            lastId = obj.id;
          };
       }
    }else{
      var obj1 = responseData.stories[length - 1];
        lastId = obj1.id;
    }


     }).catch((error)=>{

       }).done();
   
 },

 componentDidMount:function(){
   
 var vcd = require('react-native').NativeModules.ViewController;
      vcd.getThemeJsobj((data)=>{
       theme =  JSON.parse(data);
       this.fetchThemes(theme.id,null);
      });
 },
  
pressCellAction:function(rowData){
   var vcd = require('react-native').NativeModules.ViewController;
      vcd.pushNext(JSON.stringify(rowData));
},

_renderRow:function(rowData:Object,sectionId:number | string,rowId:number|string,highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,){

 var image = null;
 if(rowData.images&&rowData.images[0]){
   image = <Image source = {{uri:rowData.images[0]}} style={styles.cellImage} />
 }

 return(
      <TouchableOpacity style={styles.cell} onPress={()=>this.pressCellAction(rowData)}>
       <View style={styles.row}>
         <Text style={styles.txt} >{rowData.title}</Text>
         {image}
       </View>
     </TouchableOpacity>
 	);

},

_onEndReached:function(){
  if(lastId != cachelastId){
    this.fetchThemes(theme.id,lastId);
  }


},

onRefresh:function(pullRefresh){
       pullRefresh.onRefreshEnd();
},

	render(){
    if(!this.state.isloading){
		return (
          <View style = {styles.contenter} >
             <ListView dataSource = {this.state.dataS} style={styles.listView} renderRow = {this._renderRow}   renderScrollComponent={(props) => <PullRefreshScrollView onRefresh={(pullRefresh)=>this.onRefresh(pullRefresh)} refreshedText='释放立即刷新'  {...props} />}
        showsVerticalScrollIndicator={false} onEndReached={this._onEndReached} />
          </View>
		);
  }else{
   return (
        <View style = {styles.loadView} >
        <Text style={styles.loading}>正在加载...</Text>
          </View>
   );
  }
}

});

var styles = StyleSheet.create({
  contenter:{
   marginTop:64,
   width:WINDOW_WIDTH,
   height:WINDOW_HEIGHT - 64,
   backgroundColor:'#f0f0f0',

  },
  cellImage:{
    backgroundColor: '#dddddd',
    height: 60,
    marginLeft: 10,
    width: 80,
  
  },
   row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 5,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
  },
  txt:{
    flex:1,
    fontSize: 18,
    color: '#333333',
  },

  listView:{
  	flex:1,
    backgroundColor:'#f0f0f0',
  },
  cell:{
    flex:1,
  	width:WINDOW_WIDTH,

  },
  loading:{
    flex:1,
    fontSize: 20,
    color: '#333333',
    textAlign:'center',

  
  },
  loadView:{
    flex:1,
    width:WINDOW_WIDTH,
    height:WINDOW_HEIGHT - 64,
    backgroundColor:'#f0f0f0',
 }
});

AppRegistry.registerComponent('ThemesView',()=>ThemesView);

