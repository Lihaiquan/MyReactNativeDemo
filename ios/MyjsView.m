//
//  MyjsView.m
//  MyJSProgram
//
//  Created by 李海权 on 16/8/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "MyjsView.h"
#import "RCTRootView.h"
#import "RCTBundleURLProvider.h"

@implementation MyjsView

-(void)awakeFromNib{
//  NSURL * url = [[RCTBundleURLProvider sharedSettings]
//    jsBundleURLForBundleRoot:@"MyjsView" fallbackResource:nil];
    NSURL * url  = [[NSBundle mainBundle] URLForResource:@"MyjsView" withExtension:@"jsbundle"];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:url
                                                      moduleName:@"MyjsView"
                                               initialProperties:nil
                                                   launchOptions:nil];
  NSLog(@"myJsView = %@",url);
  rootView.frame = self.bounds;
  [self addSubview:rootView];
}
/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
