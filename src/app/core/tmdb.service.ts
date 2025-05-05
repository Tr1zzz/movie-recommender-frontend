import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPopularMovies(page: number = 1): Observable<any[]> {
    return this.http.get<{ results: any[] }>(`${this.base}/movies/popular?page=${page}`)
      .pipe(map(res => res.results));
  }

  getPopularSeries(page: number = 1): Observable<any[]> {
    return this.http.get<{ results: any[] }>(`${this.base}/series/popular?page=${page}`)
      .pipe(map(res => res.results));
  }

  search(query: string, page: number = 1): Observable<any[]> {
    return this.http.get<{ results: any[] }>(`${this.base}/search`, { params: { query, page: page.toString() } })
      .pipe(map(res => res.results));
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/movie/${id}`);
  }

  getSeriesDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/series/${id}`);
  }

  // Заглушка для будущих рекомендаций
  getRecommendations(userId: string): Observable<any[]> {
    return this.http.get<{ results: any[] }>(`${this.base}/recommendations/user/${userId}`)
      .pipe(map(res => res.results));
  }
}
