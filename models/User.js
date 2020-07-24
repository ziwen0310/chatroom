var mongoose = require('mongoose'), Schema = mongoose.Schema;

// User:
// id, password, token, roomIds,
var UserSchema = new mongoose.Schema({

})

登录验证的过程：
1 id password
2 password加密，对比数据库的 password
3 创建 token，记录到用户的
4 每次请求，通过token，验证用户是否登录
