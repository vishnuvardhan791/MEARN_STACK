import { Component } from '@angular/core';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  favorites: any[]=[];

  searchText:String='';
  
  constructor(private movieService:MovieService){}
  ngOnInit(){
    this.favorites=this.movieService.getFavorites();
  }

  remove(movie:any){
    this.movieService.removeFromFav(movie);
    this.favorites=this.movieService.getFavorites();
  }
}
