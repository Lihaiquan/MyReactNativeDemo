//
//  ThemsViewController.m
//  MyJSProgram
//
//  Created by 李海权 on 16/9/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ThemsViewController.h"

@interface ThemsViewController ()

@end

@implementation ThemsViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
  button.frame = CGRectMake(20, 26, 45, 35);
  [button setTitle:@"返回" forState:UIControlStateNormal];
  [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
  [button addTarget:self action:@selector(backAction) forControlEvents:UIControlEventTouchUpInside];
  UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithCustomView:button];
  self.navigationItem.leftBarButtonItem = item;
  self.navigationController.interactivePopGestureRecognizer.enabled = YES;
  self.navigationController.interactivePopGestureRecognizer.delegate = (id)self;
  self.automaticallyAdjustsScrollViewInsets = NO;
  
    // Do any additional setup after loading the view from its nib.
}

- (void)viewWillAppear:(BOOL)animated
{
  [super viewWillAppear:animated];
  self.navigationController.navigationBar.hidden = NO;
}

- (void)backAction{
  [self.navigationController popViewControllerAnimated:YES];
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
