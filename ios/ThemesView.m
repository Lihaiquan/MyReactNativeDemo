//
//  ThemesView.m
//  MyJSProgram
//
//  Created by 李海权 on 16/9/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ThemesView.h"
#import "RCTRootView.h"
#import "RCTBundleURLProvider.h"

@implementation ThemesView

-(void)awakeFromNib{
  
//  NSURL * url = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"ThemesView" fallbackResource:nil];
 NSURL * url  = [[NSBundle mainBundle] URLForResource:@"ThemesView" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:url
                                                      moduleName:@"ThemesView"
                                               initialProperties:nil
                                                   launchOptions:nil];
  NSLog(@"themesView = %@",url);
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
