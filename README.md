# word-card
一个简单的背单词程序

## word-api文件夹
使用Koa2提供后端API

### 功能
单词列表
新增单词

## wordcard文件夹
使用Vite搭建Vue3前端页面

### 功能
单词展示   
  点选显示音标及词义   
单词分页   
新增单词   

## 表结构
数据库
```
  CREATE DATABASE word-card   
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

数据表
```
  CREATE TABLE words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    phonetic TEXT,
    meaning TEXT,
    status TINYINT DEFAULT 0
  );
```

# 有时间更新
