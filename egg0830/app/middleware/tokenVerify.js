const jwt = require('jsonwebtoken');

module.exports = options => {
  return async function tokenVerify(ctx, next) {
    
    const token=ctx.get('token');

    if(token){
        try {
            //解码客户端传输token有效性，并获得加密信息data
            const decoded=jwt.verify(token, 'abcd1234'); //s为单位

            const data=decoded.data;

            //重新生成新的token，并返回客户端
            const newToken=jwt.sign({
                data: data
            }, 'abcd1234', { expiresIn: 60*30 }); //s为单位

            ctx.set('token', newToken);
            await next();
            
        }catch(err){
            ctx.body = {
                success:false,
                status:401
            };
            ctx.status = 200;
        }
    }else{
        ctx.body = {
            success:false,
            status:401
        };
        ctx.status = 200;
    }
  };
};