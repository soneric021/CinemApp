export  interface Orden{
    pedido:Pedido,
    cantidad:number,
    bought:boolean
  }
  
export interface Pedido{
    id:number,
    name:string,
    price:number
  }
  export interface Ticket{
    id:number,
    displayName:string,
    name:string,
    price:number,
    time:string,
    cantidad:number,
    bought:boolean
  }
  export interface User{
    name:string,
    email:string,
    password:string
  }
export const bebidas = [{

  id:1,
  name:'refresco',
  price: 20
},
{
  id:2,
  name:'agua',
  price: 20
},
{
  id:3,
  name:'jugo',
  price: 20
}];
export const comidas = [{
  id:4,
  name:'hot-dogs',
  price: 250
}, {
  id:5,
  name:'palomitas',
  price: 300
},
{
  id:6,
  name:'nachos con queso',
  price: 550
}]