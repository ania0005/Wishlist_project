
  
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
  export interface Wishlist {
    id: string;
    title: string;
    comment: string;
    eventDate: string;
    gifts: Gift[];
  }
  
  export interface Gift {
    id: string;
    title: string;
    url: string;
    imageUrl: string; 
    description: string;
    price: number;
  }