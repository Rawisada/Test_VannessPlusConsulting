export const authenticate=(response,next)=>{
    if(window !== "undefined"){
        //เก็ยขอมูลลง sesion storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("email",JSON.stringify(response.data.email))
    }
    next()
}

//ดึง token
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

export const getEmail=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("email")){
            return JSON.parse(sessionStorage.getItem("email"))
        }else{
            return false
        }
    }

}

export const logout=(next)=>{
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("email")
    }
    next()
}