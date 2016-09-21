//
//  ViewController.m
//  MyJSProgram
//
//  Created by 李海权 on 16/8/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ViewController.h"
#import "MyJsViewController.h"
#import "JSDetailViewController.h"
#import "ThemsViewController.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"


@interface ViewController ()
@property (nonatomic,copy)RCTResponseSenderBlock block;
@property (nonatomic,copy)RCTResponseSenderBlock temeBlock;
@end

@implementation ViewController


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(pushNextPage){

  
  dispatch_async(dispatch_get_main_queue(), ^{
//
  MyJsViewController *vc = [[MyJsViewController alloc] init];
    vc.title = @"今日更新";
//    [self.navigationController pushViewController:vc animated:YES];
    [(UINavigationController *)[UIApplication sharedApplication].delegate.window.rootViewController  pushViewController:vc animated:YES];
    
//    UINavigationController *nav = (UINavigationController *)[UIApplication sharedApplication].delegate.window.rootViewController;
//    NSLog(@"nav1 = %@",nav.viewControllers);  //有值
//    NSLog(@"nav2 = %@",self.navigationController);//无值
//    NSLog(@"self = %@",self); //有值
    
    
    

//    UIView *vew = [[UIView alloc] initWithFrame:CGRectMake(10, 10, 320, 300)];
//    vew.backgroundColor = [UIColor redColor];
//    self.view  = vew;
//    [self.view addSubview:vew];
  });
}

RCT_EXPORT_METHOD(pushNext:(NSString *)jsonObj){
  
  DataSaver *save = [DataSaver shareDataSever];
  save. jsonObj = jsonObj;
    dispatch_async(dispatch_get_main_queue(), ^{
    JSDetailViewController *vc = [[JSDetailViewController alloc] init];
     vc.navigationController.navigationBar.hidden = YES;
//     vc.title = titleStr;
      UINavigationController *nav = (UINavigationController *)[UIApplication sharedApplication].delegate.window.rootViewController;
      nav.navigationBar.hidden = YES;
     [nav  pushViewController:vc animated:YES];
  });
}

RCT_EXPORT_METHOD(popToViewController){
  dispatch_async(dispatch_get_main_queue(), ^{
  UINavigationController *nav = (UINavigationController *)[UIApplication sharedApplication].delegate.window.rootViewController;
  nav.navigationBar.hidden = YES;
  [nav popViewControllerAnimated:YES];
   });
}

RCT_EXPORT_METHOD(showNavigation){
  dispatch_async(dispatch_get_main_queue(), ^{
  UINavigationController *nav = (UINavigationController *)[UIApplication sharedApplication].delegate.window.rootViewController;
  nav.navigationBar.hidden = NO;
  });

}

RCT_EXPORT_METHOD( getThemeJsobj:(RCTResponseSenderBlock)block){
DataSaver *save = [DataSaver shareDataSever];
NSArray *arr = @[save.themObj];
_temeBlock = [block copy];
_temeBlock(arr);
  NSLog(@"获取数据=%@",save.themObj);
}

RCT_EXPORT_METHOD( getJsobj:(RCTResponseSenderBlock)block){
   DataSaver *save = [DataSaver shareDataSever];
 NSArray *arr = @[save.jsonObj];
//  NSArray *arr = @[@"{}"];
  _block = [block copy];
  _block(arr);
}
//themObj:(NSString *)themeStr
RCT_EXPORT_METHOD(pushThemesVC:(NSString *)titleStr jsonObj:(NSString *)jsonObjStr ){
  DataSaver *save = [DataSaver shareDataSever];
  save.themObj = jsonObjStr;
  NSLog(@"jsonStr = %@",jsonObjStr);
   dispatch_async(dispatch_get_main_queue(), ^{
  ThemsViewController *themesVC = [[ThemsViewController alloc] init];
     themesVC.title = titleStr;
   UINavigationController *nav = (UINavigationController *)[UIApplication sharedApplication].delegate.window.rootViewController;
     
  [nav pushViewController:themesVC animated:YES];
  });
}




//js渲染时并不走ViewDidLoad方法
- (void)viewDidLoad {
    [super viewDidLoad];
  self.automaticallyAdjustsScrollViewInsets = NO;
  NSURL *jsCodeLocation;
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings]
//                    jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
   jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"index.ios" withExtension:@"jsbundle"];
  NSLog(@"jsurl = %@",jsCodeLocation);
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"MyJSProgram"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  rootView.frame = [UIScreen mainScreen].bounds;
  [self.view addSubview:rootView];

  
  NSLog(@"nav3 = %@",self.navigationController);
    // Do any additional setup after loading the view.
}


- (void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
 }

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end

@implementation DataSaver
static DataSaver *save;
+ (id)shareDataSever{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    save = [[DataSaver alloc] init];
  });
  return save;
}

@end

