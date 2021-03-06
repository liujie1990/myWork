# WebSocket入门

## 目录

WebSocket是一种先进的技术，它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此API，我们可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。
## 为什么需要WebSocket
初次接触WebSocket 的人，都会问同样的问题：我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？

答案很简单，因为HTTP协议有一个缺陷：通信只能由客户端发起。

举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。

### 参考文档
1. [websocket教程](http://websocketbook.rails365.net/467125)