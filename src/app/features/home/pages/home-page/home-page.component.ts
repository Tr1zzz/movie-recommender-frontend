import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../../core/tmdb.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  popularMovies: any[] = [];
  popularSeries: any[] = [];

  constructor(private tmdb: TmdbService) {}

  ngOnInit(): void {
    this.tmdb.getPopularMovies().subscribe(data => this.popularMovies = data);
    this.tmdb.getPopularSeries().subscribe(data => this.popularSeries = data);
  }
}