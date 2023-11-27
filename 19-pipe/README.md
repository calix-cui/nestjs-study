Pipe 是在参数传给 handler 之前做一些验证和转换的，有 9 个内置的 Pipe 可以直接用。

自己写一个 pipe 也很简单，就是实现 PipeTransform 接口的 transform 方法，它的返回值就是传给 handler 的值。

在 pipe 里可以拿到装饰器和 handler 参数的各种信息，基于这些来实现校验和转换就是很简单的事情了。

# ValidationPipe 与 Post

接收 post 请求的方式是声明一个 dto class，然后通过 @Body 来取请求体来注入值。

对它做验证要使用 ValidationPipe。

它的实现原理是基于 class-tranformer 把参数对象转换为 dto class 的对象，然后通过 class-validator 基于装饰器对这个对象做验证。

我们可以自己实现这样的 pipe，pipe 里可以注入依赖。

如果是全局 pipe 想注入依赖，需要通过 APP_PIPE 的 token 在 AppModule 里声明 provider。

class-validator 支持很多种验证规则，比如邮箱、域名、长度、值的范围等，而且错误消息也可以自定义。