# 长大教务小程序

## 介绍

这是一款为长江大学大学生提供查询服务的小程序，长江大学目前还没有提供类似服务的ios应用，长大puls小程序可以填补这方面的空白

## 软件截图

> 部分页面，截止于2019.4.17

![image](https://github.com/xuhong1998/img-folder/blob/master/changda/haoksnmjk.jpg)
## 功能介绍

- [x] 成绩查询/绩点计算器
- [x] 图书搜索/图书收藏(书本详细信息来自豆瓣)
- [x] 课表查询
- [x] 学校校历（基础的日历功能，自定义倒计时待开发）
- [x] 考表
- [x] 学校新闻(信息来自长江大学官网)
- [x] 房贷计算

## 目录结构

```
    .
    ─plus
    │  app.js
    │  app.json
    │  app.wxss
    │  README.md
    │  sitemap.json
    ├─css	   				//样式资源  
    ├─images   				//图片资源
    ├─pages					//页面
    │  ├─about		
    │  │  ├─about    		
    │  │  ├─article         //新闻详情
    │  │  ├─card   			//新闻详情
    │  │  ├─home    		//关于页面
    │  │  ├─house    		//房贷计算
    │  │  ├─houseText		//房贷详情
    │  │  └─log				//版本日志
    │  ├─grade
    │  │  ├─exam			//考试安排
    │  │  ├─gpa   			//绩点页面
    │  │  ├─landing 		//登陆页面
    │  │  └─show    		//成绩页面
    │  ├─incident
    │  │  ├─calendar		//校历页面
    │  │  ├─course			//图书课表	
    │  │  └─news			//新闻页面
    │  ├─index				//首页
    │  └─library
    │      ├─collect		//图书搜索	
    │      ├─detail			//图书详情
    │      └─listbox		//图书搜索
    ├─utils
    │      code.js 			//pomrise
    │      time.js      	//日期接口
    └─wxParse  				//html解析接口
```
