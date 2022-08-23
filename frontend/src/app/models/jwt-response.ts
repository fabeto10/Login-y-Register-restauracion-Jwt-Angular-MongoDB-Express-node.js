export interface JwtResponseI {
    dataUser:{
        id: number,
        name: string,
        email: string,
        accessToken: string,
        expireIn: string 
    }
}
