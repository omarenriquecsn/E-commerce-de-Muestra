export  type Guitar = {
    id : number
    name : string
    image : string
    description : string
    price : number
  }

  export type CartItems = Guitar & {
    quantity : number
  }
