# word-card
单词卡-JS全栈项目

## wordcard文件夹
使用Vite搭建Vue3前端页面

## word-api文件夹
使用Koa2提供后端API接口

## 功能
单词卡   
单词管理      
复习计划      

## 表结构
数据库
```
  CREATE DATABASE word-card   
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

数据表   
单词表
  ```
    CREATE TABLE words (
      id INT AUTO_INCREMENT PRIMARY KEY,
      word VARCHAR(255) NOT NULL,
      phonetic TEXT,
      meaning TEXT,
      status TINYINT DEFAULT 0
    );
  ```
复习表   
```
待更新
```

## 组件封装
todo

## 持续更新ing