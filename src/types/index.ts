export default interface User {
    id: number
    firstName: string
    lastName: string
    email: string
  }

export interface Gift {
    id: number
    title: string
    price: number
    description: string
    url: string
    imageUrl: string 
    currency: string
    isReserved: boolean
  }
export interface Wishlist {
    id: number
    title: string
    description: string
    date: string
    user_id: number
  }
  
  export interface WishlistState {
    listWishlist: Wishlist[]
    selectedWishlist: Wishlist | undefined
  }
  
  export interface WishlistDTO {
    id: number
    title: string
    description: string
    date: string
    user_id: number
  }
