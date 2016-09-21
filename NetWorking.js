'use strict';
var React = require('react-native');
var DES3 = require('./DESHelper.js');

var {
	AsyncStorage,
} = React;

var API_LIST_DATA = 'http://news-at.zhihu.com/api/4/news/latest';
var API_HOME_URL = 'http://news.at.zhihu.com/api/4/news/before/';
var API_THEME_URL = 'http://news-at.zhihu.com/api/4/theme/';
var API_SPLASH_VIEW = 'http://news-at.zhihu.com/api/4/start-image/1080*1776';
var API_THEMES_URL = 'http://news-at.zhihu.com/api/4/themes';
var API_DETAIL_URL ='http://news.at.zhihu.com/api/4/news/';



var KEY_COVER = 'KEY_COVER';
var KEY_THEM = 'KEY_THEM';
var KEY_TODY_NEWS = 'KEY_TODY_NEWS';


// var REF_HEADER = 'header';
// var PIXELRATIO = PixelRatio.get();
// var HEADER_SIZE = 200;


var objc = {
	'appVersion': 2.4,
    'deviceId' : 'F264FD59-7265-4C3E-9E23-E1EBC038FA83',
    'deviceType' : 1,
    'deviceVersion':9.30,
    'pageState' :'',
    'programType' :1,
    'serviceVersion':2,
    'sessionId':'',
    'userId':'',
};
var P_STRING = 'c51128505013b56b7fddf0aab8c4d5ed9a068f891a57bbda6f2a9022d1ddc0f6923c843196c885c724714dc6192cd32cca72514939d908f9e95d039045b83d27d004956bc81fa4e29a71b0a7dc5001888257c69f01e8d0f0d552eaa846646c302909d428add03425951e6f3988ea5fb38bff84d707d62b45823bbfdf8862452aa8f4925306ae92dd7b8b8df1f2aa6098d004956bc81fa4e250ec98d604c8811be6c28fc795974d043f874e3266062d0f483af729bf60b086255923974909d9bb08db5baafb664734d66e3a506354beaddd35150ac71a7f88aa21bcfc375973275350e9713866914b8775530674a5b7ee52b196a6db3e5b69e21b6288d4fab07f2b72bc27ee7adea8c566ec97184d7918f68207c94d5ba680157d8d6fd6a754f57450cbd0eb90bdd7ea42f3816dd65e79';
var API_GUESS_URL = 'http://app.zhongledp.tv/fruittv/guess/programTypeGuessList';
var API_KEY = '94fccf96613b3afdecadcc87ce23db4f';



//声明一个对象，原型对象，实例指向此原型对象
function NetWorking(){
   if(typeof NetWorking.instance === 'object'){
      return NetWorking.instance;
   }
  NetWorking.instance = this;   
}

NetWorking.prototype._getGuessList = function(){
  return new Promise((resolve,reject)=>{
 
 var string = JSON.stringify(objc);
   var urlString = API_LIST_DATA;//API_GUESS_URL + '/?q='+ P_STRING;
   fetch(urlString, {
    method: 'GET'
  }) 
  .then((response)=>response.json())
    .then((responseData)=>{
         AsyncStorage.setItem(KEY_TODY_NEWS, JSON.stringify(responseData));
         resolve(responseData);  
    }).catch((error)=>{
      AsyncStorage.getItem(KEY_TODY_NEWS,(error,result)=>{
        if (error) {
         // resolve({});
      }else{
        if(result){
          resolve(JSON.parse(result))
        }else{
          // resolve(null);
        }
      }
     });
    });
  });


};

NetWorking.prototype._getDetailInfoWithId = function(obiID:string){

 return new Promise((resolve,reject)=>{
   var urlString = API_DETAIL_URL + obiID;
    fetch(urlString).then((response)=>
    response.json())
  .then((responseData)=>{
    resolve(responseData);
  })
  .catch((error)=>{
     alert(error);
  });

 });
};

NetWorking.prototype._getCacheCover = function(){
  
   return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(KEY_COVER,(error,result)=>{
      if (error) {
         resolve(null);
      }else{
        resolve(JSON.parse(result))
      }

      });
   }); 
};



NetWorking.prototype._getCover = function(){

 fetch(API_SPLASH_VIEW)
       .then((response)=>response.json())
       .then((responseData)=>{
         AsyncStorage.setItem(KEY_COVER, JSON.stringify(responseData));
       }).catch((error)=>{
       }).done();


  return new Promise((resolve,reject)=>{
    this._getCacheCover().then((responseData)=>{

     if(responseData){
       resolve(responseData);

     }else{
       fetch(API_SPLASH_VIEW)
       .then((response)=>response.json())
       .then((responseData)=>{
         AsyncStorage.setItem(KEY_COVER, JSON.stringify(responseData));
         resolve(responseData);

       }).catch((error)=>{

         resolve(null);
        
       }).done();
    
    
     }
    });
  });
};


NetWorking.prototype.getThemsList = function(){
  return new Promise((resolve,reject)=>{
    fetch(API_THEMES_URL)
    .then((response)=>response.json())
    .then((responseData) =>{
         AsyncStorage.setItem(KEY_THEM, JSON.stringify(responseData));
      resolve(responseData);
    }).catch((error)=>{
        AsyncStorage.getItem(KEY_THEM,(error,result)=>{
      if (error) {
         // resolve(null);
      }else{
        if(result){
        resolve(JSON.parse(result))

        }else{
             // resolve(null);
        }
      }

      });
    }).done();
  });
};


NetWorking.prototype.themsList= function(thiemId,lastId){
   return new Promise((resolve,reject)=>{
     var urlString;
    if(lastId){
      urlString = API_THEME_URL + thiemId +'/before/'+ lastId; 
      console.log(urlString);
   }else{
      urlString = API_THEME_URL + thiemId; 
   }
    fetch(urlString)
    .then((response)=>response.json())
    .then((responseData) =>{
      resolve(responseData);
    }).catch((error)=>{
       // resolve(null);
    }).done();
  });
};

NetWorking.prototype.newsList= function(beforeDate){
   return new Promise((resolve,reject)=>{
     var urlString = API_HOME_URL + beforeDate;
    fetch(urlString)
    .then((response)=>response.json())
    .then((responseData) =>{
      resolve(responseData);
    }).catch((error)=>{
       // resolve(null);
    }).done();
  });
};

module.exports =  NetWorking;

