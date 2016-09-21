//
//  JSDetailViewController.m
//  MyJSProgram
//
//  Created by 李海权 on 16/8/25.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "JSDetailViewController.h"

@interface JSDetailViewController ()

@end

@implementation JSDetailViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
  [self.navigationController.interactivePopGestureRecognizer addTarget:self action:@selector(handleGesture:)];//让自定义的navigation支持边沿手势，并监听收拾方法
  [self.navigationController.navigationBar setTintColor:[UIColor clearColor]]; //改变系统回退按钮颜色


    // Do any additional setup after loading the view from its nib.
}

- (void)viewDidAppear:(BOOL)animated
{
  [super viewDidAppear:animated];
}

- (void) viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
  self.navigationController.navigationBar.hidden = YES;

}


- (void)handleGesture:(UIScreenEdgePanGestureRecognizer *)gues
{
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
