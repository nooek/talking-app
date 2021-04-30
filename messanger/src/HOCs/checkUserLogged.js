import React from "react"

const CheckUserLogged = ({ children }) => {
    const id = localStorage.getItem("id")
    const location = window.location.pathname
    console.log(location)

    if (location === "/login" || location === "/register"){
        return children
    }

    if (id){
        return(children)
    }else{
        return <a href="/login">Please LogIn</a>
    }
}

export default CheckUserLogged