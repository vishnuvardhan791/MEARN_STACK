import { Component } from '@angular/core';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {

  constructor(private movieService:MovieService){}
  searchText:String='';

  addToFav(movie:any){
    this.movieService.addToFavorites(movie);
    alert('Added to Favorites')
  }

  isFav(movie:any){
      return this.movieService.isFavorite(movie);
  }
  movies = [
  {
    title: 'Pushpa',
    image: 'https://mxp-media.ilnmedia.com/media/content/2025/Jan/1---credit---Mythri-Movie-Makers_67987d2396bdd.jpeg?w=780&h=1046&cc=1',
    rating: 8.2
  },
  {
    title: 'RRR',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/RRR_Poster.jpg/250px-RRR_Poster.jpg',
    rating: 9.0
  },
  {
    title: 'KGF',
    image: 'https://stat5.bollywoodhungama.in/wp-content/uploads/2019/03/K.G.F-Chapter-2-1-306x393.jpg',
    rating: 8.8
  },
  {
    title: 'Bahubali',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Baahubali_The_Beginning_poster.jpg/250px-Baahubali_The_Beginning_poster.jpg',
    rating: 9.2
  }
];
}
