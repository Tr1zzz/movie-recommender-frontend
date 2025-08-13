import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movies-info',
  templateUrl: './movies-info.component.html',
  styleUrls: ['./movies-info.component.scss']
})
export class MoviesInfoComponent implements OnInit {
  id!: number;
  movie_data: any;
  external_data: any;
  activeTab: string = 'overview';
  videos: any[] = [];
  videoTypes: string[] = [];
  backdrops: any[] = [];
  posters: any[] = [];
  cast_data: any;
  recom_data: any[] = [];
  person_data: any;
  type: 'movie' = 'movie';

  // — Добавлено для звёздочек —
  userRating = 0;
  hoverRating = 0;

  constructor(
    private apiService: ApiService,
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.spinner.show();
      this.id = +params['id'];
      this.getMovieInfo(this.id);
      this.getMovieVideos(this.id);
      this.getMoviesBackdrop(this.id);
      this.getMovieCast(this.id);
      this.getMovieRecommended(this.id, 1);
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getMovieInfo(id: number) {
    this.apiService.getMovie(id).subscribe((result: any) => {
      this.movie_data = result;
      this.apiService.getYouTubeVideo(id, 'movie').subscribe(
        (videoRes: any) => {
          const video = videoRes.results.find((vid: any) =>
            vid.site === 'YouTube' && ['Trailer','Teaser','Clip'].includes(vid.type)
          );
          if (video) {
            this.movie_data.videoId = video.key;
          }
        }
      );
      this.getExternal(id);
    });
  }

  getExternal(id: number) {
    this.apiService.getExternalId(id, 'movie').subscribe((res: any) => {
      this.external_data = res;
    });
  }

  getMovieVideos(id: number) {
    this.apiService.getYouTubeVideo(id, 'movie').subscribe((res: any) => {
      this.videos = res.results;
    });
  }

  getMoviesBackdrop(id: number) {
    this.apiService.getBackdrops(id, 'movie').subscribe((res: any) => {
      this.backdrops = res.backdrops;
      this.posters = res.posters.map((p: any) => ({
        ...p,
        full_path: `https://image.tmdb.org/t/p/w342${p.file_path}`
      }));
    });
  }

  getMovieCast(id: number) {
    this.apiService.getCredits(id, 'movie').subscribe(
      (res: any) => {
        this.cast_data = res.cast.map((item: any) => ({
          link: `/person/${item.id}`,
          imgSrc: item.profile_path
            ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.profile_path}`
            : null,
          name: item.name,
          character: item.character,
          popularity: item.popularity,
        }));
      }
    );
  }

  getMovieRecommended(id: number, page: number) {
    this.apiService.getRecommended(id, page, 'movie').subscribe(
      (res: any) => {
        this.recom_data = res.results.map((item: any) => ({
          link: `/movie/${item.id}`,
          imgSrc: item.poster_path
            ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${item.poster_path}`
            : null,
          title: item.title,
          vote: item.vote_average,
          rating: item.vote_average * 10
        }));
      }
    );
  }

  // — Добавлено: отправка оценки и сохранение локально —
  onRate(stars: number) {
    this.apiService.rateMovie(this.id, stars * 2).subscribe(() => {
      this.userRating = stars;
    });
  }
}
