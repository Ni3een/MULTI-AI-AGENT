import proxy from "express-http-proxy"

export const proxyWithHeader=(serviceUrl)=>{
    return proxy(serviceUrl,{
        proxyReqPathResolver:(proxyReqOpts,srcReq)=>{
            if(srcReq.user){
            proxyReqOpts.headers["x-user-id"]=srcReq.user.userId
            }
            return srcReq.url   
        }
    }) 
}   