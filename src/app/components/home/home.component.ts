import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { delay } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  forYouSlider: any[] = [];
  moviesSlider: any[] = [];
  tvSlider: any[] = [];
  movies_data: any[] = [];

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.getRecommendedMovies().subscribe(res => this.forYouSlider = res);
    this.fetchTrendingContent('movie', 1, 'movies');
    this.fetchTrendingContent('tv', 1, 'tvShows');
    this.getNowPlaying('movie', 1);
    setTimeout(() => this.spinner.hide(), 2000);
  }

  getNowPlaying(mediaType: 'movie', page: number): void {
    this.apiService.getNowPlaying(mediaType, page).pipe(delay(2000)).subscribe(res => {
      this.movies_data = res.results.map((item: any) => {
        const movieItem = { ...item, link: `/movie/${item.id}`, videoId: '' };
        this.apiService.getYouTubeVideo(item.id, 'movie').subscribe(videoRes => {
          const video = videoRes.results.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');
          if (video) movieItem.videoId = video.key;
        });
        return movieItem;
      });
    });
  }

  fetchTrendingContent(media: string, page: number, type: string): void {
    this.apiService.getTrending(media, page).subscribe(response => {
      if (type === 'movies') {
        this.moviesSlider = response.results.map((item: any) => ({
          link: `/movie/${item.id}`,
          imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
          title: item.title,
          rating: item.vote_average * 10,
          vote: item.vote_average
        }));
      } else {
        this.tvSlider = response.results.map((item: any) => ({
          link: `/tv/${item.id}`,
          imgSrc: item.poster_path ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}` : null,
          title: item.name,
          rating: item.vote_average * 10,
          vote: item.vote_average
        }));
      }
    });
  }
}
