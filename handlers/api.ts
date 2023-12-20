const createURL = (path) => window.location.origin + path

export const SignIn = async ({phoneNumber, password}) => {

    try {
        const res = await fetch(new Request(createURL("/api/signin"), {
            method: "POST",
            body: JSON.stringify({
                phoneNumber,
                password
            })
        }))
    
        if(res.ok) {
            return res.json()
        }
        
    } catch (error) {
        throw new Error(error)
    }
}




export const SignUp = async ({phoneNumber,firstName,password}) => {

    try {
        const res = await fetch(new Request(createURL("/api/signup"), {
            method: "POST",
            body: JSON.stringify({
                phoneNumber,
                firstName,
                password
            })
        }))
    
        if(res.ok) {
            return res.json()
        }
        
    } catch (error) {
        throw new Error(error)
    }
}