//
//  DetailView.m
//  MyJSProgram
//
//  Created by 李海权 on 16/8/25.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "DetailView.h"
#import "RCTRootView.h"
#import "RCTBundleURLProvider.h"

@implementation DetailView

-(void)awakeFromNib{
//  NSURL * url = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"DetailView" fallbackResource:nil];
 NSURL * url  = [[NSBundle mainBundle] URLForResource:@"DetailView" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:url
                                                      moduleName:@"DetailView"
                                               initialProperties:nil
                                                   launchOptions:nil];
  NSLog(@"detailView = %@",url);
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
