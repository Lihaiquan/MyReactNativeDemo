//
//  ViewController.h
//  MyJSProgram
//
//  Created by 李海权 on 16/8/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"
//#import "RCTLog.h"
//#import "RCTBridge.h"
//#import "RCTEventDispatcher.h"

//#import "RCTBridgeModule.h"
@interface ViewController : UIViewController<RCTBridgeModule>

@end

@interface DataSaver : NSObject
@property (nonatomic,copy)NSString *jsonObj;
@property (nonatomic,copy)NSString *themObj;
+ (id)shareDataSever;
@end
