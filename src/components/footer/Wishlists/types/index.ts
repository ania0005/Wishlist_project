export interface Wishlist {
    id: number
    title: string
    description: string
    date: string
    user_id: number
  }
  
  export interface WishlistState {
    listWishlist: Wishlist[],
    selectedWishlist: Wishlist | undefined
  }
  
  export interface WishlistDTO {
    id: number
    title: string
    description: string
    date: string
    user_id: number
  }