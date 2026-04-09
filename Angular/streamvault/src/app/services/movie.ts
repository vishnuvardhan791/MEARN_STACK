import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  favorites:any[]=[];

  addToFavorites(movie:any){
    const exists=this.favorites.find(m=>m.title===movie.title);

    if(!exists){
      this.favorites.push(movie);
    }
      
  }
  getFavorites(){
    return this.favorites;
  }

  isFavorite(movie:any){
    return this.favorites.some(m=>m.title=== movie.title);
  }

  removeFromFav(movie:any){
    this.favorites = this.favorites.filter(m=>m.title!==movie.title);
  }
}
