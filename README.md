# Todo  List

**小组成员：周志豪、牛犇野、许启贤、朱迪**

## 功能

- 返回所有Todo任务
- 创建一个新的Todo任务
- 修改一个Todo任务
- 删除一个Todo任务

## 代码结构
    Web-dzy
       |
       |-- backend  // 使用express构建RESTful API
       |
       |-- frontend  // 使用ReactJs构建前端组件
       |
       |-- e2e // 使用Puppeteer进行页面控制，实现端到端测试
       |
       |-- data // 用来存放Task数据

## Task文件格式

{

​	"id":1,

​	"task":"Restful API homework"

}

## 使用

1. 启动API服务

   ```
   $ cd backend
   $ npm start
   ```

2. 打开`fontend`文件夹下的main.html页面
