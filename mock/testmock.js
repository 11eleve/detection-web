const Mock = require("mockjs");
let data = Mock.mock({
    "msg":"True",
})
Mock.mock('http://192.168.0.105:5000/weblogin','post', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
    return data
})
