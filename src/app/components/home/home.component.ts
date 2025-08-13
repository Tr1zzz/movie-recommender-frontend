import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  forYouSlider: any[] = [];
  moviesSlider: any[] = [];
  tvSlider: any[] = [];

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();

    // 1) получаем список tmdb_id
    this.apiService.getRecommendedMovies().pipe(
      // 2) если пусто — fallback на trending movies
      switchMap((ids: number[]) => {
        if (!ids || ids.length === 0) {
          return this.apiService.getTrending('movie', 1).pipe(
            map(res =>
              (res.results || []).slice(0, 10).map((m: any) => ({
                id: m.id,
                link: `/movie/${m.id}`,
                imgSrc: m.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${m.poster_path}` : null,
                title: m.title,
                vote: m.vote_average
              }))
            )
          );
        }
        // 3) иначе подтягиваем карточки по каждому id
        return forkJoin(
          ids.map(id =>
            this.apiService.getMovie(id).pipe(
              map((movie: any) => ({
                id: movie.id,
                link: `/movie/${movie.id}`,
                imgSrc: movie.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie.poster_path}` : null,
                title: movie.title,
                vote: movie.vote_average
              }))
            )
          )
        );
      }),
      catchError(_err => of([]))
    ).subscribe((items: any[]) => {
      this.forYouSlider = items || [];
      this.spinner.hide();
    });

    this.loadNowPlaying();
    this.loadTvHighlights();
  }

  private loadNowPlaying(): void {
    this.apiService.getNowPlaying('movie', 1).subscribe(res => {
      this.moviesSlider = (res.results || []).map((item: any) => ({
        id: item.id,
        link: `/movie/${item.id}`,
        imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
        title: item.title,
        vote: item.vote_average
      }));
    });
  }

  private loadTvHighlights(): void {
    this.apiService.getTrending('tv', 1).subscribe(res => {
      this.tvSlider = (res.results || []).map((item: any) => ({
        id: item.id,
        link: `/tv/${item.id}`,
        imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
        title: item.name,
        vote: item.vote_average
      }));
    });
  }
}
