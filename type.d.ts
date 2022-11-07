export interface Category{
    name:string,
    posts:{
        nodes:{
            slug:string
            title:string
            date:string
            featuredImage:{
                node:{
                    link:string
                }
            }
        }[]
    }
}
export interface Views{
    views:{
        slug:string
        view:number
    }[]
}