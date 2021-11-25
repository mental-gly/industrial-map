# industrial-map

使用virtualenv进行python环境管理，防止各电脑环境下python版本混乱造成的问题；

框架搭建参考：

1. https://www.jianshu.com/p/b348926fa628
2. https://www.cnblogs.com/sikongji-yeshan/p/12188076.html
3. https://blog.csdn.net/huayunhualuo/article/details/100080092



## 使用环境

1. 首先安装react, node.js, npm, python3, pip3；

   react, node.js, npm安装参考：https://blog.csdn.net/weixin_36732046/article/details/95884577

   python3, pip3：官网安装，搭框架时用的版本是3.9

2. 在github下载industrial-map项目文件夹；

3. 安装 virtualenv控制Python环境；

   `pip3 install virtualenv`

4. 创建纯净的python环境；

   `virtualenv imap`

   将下载的industrial-map项目文件夹中的所有内容挪到imap文件夹中；

5. 使用虚拟环境；

   `cd imap/Scripts`

   激活：`activate`  

   关闭：`deactivate`

   激活后命令行前会出现`(env)`标志；

6. 在激活状态下下载flask包；

   `pip3 install flask`

## 文件架构
```sh
├── backend
│   ├── static
│   │   └── build
│   ├── templates
│   │   └── index.html
│   └── app.py
├── frontend
│   ├── public
│   ├── source
│   └── ...
├── Lib
│   └── site-packages
├── Scripts
│   └── ...
├── pyvenv.cfg
└── .gitignore
```

## 运行步骤

1. 前端页面写在frontend/src中，目前只有一个index.js文件；后端逻辑写在backend中，目前只有一个app.py文件；

2. 运行代码时，若前端内容有修改，需要先进入frontend文件夹中执行：

   `npm run build`  该指令本身会在frontend目录下创建一个build目录，然后将react程序用到的资源以及打包压缩过的js、css文件放入其中；

   在此基础上我修改了package.json，使得执行这个指令时，build中的文件index.html会移动到backend的templates目录下，而其他的js、css、图片等则移动到backend中的static目录下方便外部访问；

3. 最后运行backend中的app.py文件，http://localhost:5000/页面会显示网页内容。
