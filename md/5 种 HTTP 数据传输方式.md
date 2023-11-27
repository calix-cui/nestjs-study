<style>
html { background-color: #eee }
</style>

http 接口是前后端之间数据传输的主要方式之一，这种数据传输的方式主要有5种：

- url param
- query
- form-urlencoded
- form-data
- json

# url param

把参数写在url中

```
http://api.qjcx.cc/person/123
```

```js
`http://api.qjcx.cc/person/${id}`;
```

# query

将参数拼接在URL的问号后面，以键值对的形式出现。

```
http://api.qjcx.cc/person?name=cx&age=16
```

非英文字符和一些特殊字符要经过编码，可以使用 encodeURIComponent api 来编码。

一般 axios 这种请求库会自动进行编码。

# form-urlencoded

直接用 form 表单提交数据就是这种格式，和 query 的区别只是放在了 body 里，然后指定 content-type 是 `application/x-www-form-urlencoded`。

# form-data

不再通过 & 分隔数据，而是用 ------ + 一串数字作为 boundary 分隔符。

form-data 指定 content type 为 `multipart/form-data`，然后指定 boundary 就是分割线。

这种方式适合传输文件，请求体积会增大。

# json

指定content type 为 `application/json`。
