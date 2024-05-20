
export interface Wishlist {
    id: string;
    title: string;
    comment: string;
    eventDate: string;
    gifts: Gift[];
  }
  
export interface Gift {
    title: string;
    url: string;
    imageUrl: string; 
  }
