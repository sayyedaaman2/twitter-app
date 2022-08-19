module.exports = {
    PORT : ()=>{
        if(process.env.NODE_ENV == 'production'){
            return process.env.PORT
        }else{
            return 8080
        }
    }
}