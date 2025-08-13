import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'd6b35962e1df3e1ebaec5f41064e2d2c';
  private language = 'en-US';
  private backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getNowPlaying(mediaType: string, page: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${mediaType}/now_playing`, {
        params: this.buildParams({ page: page.toString() })
      })
      .pipe(catchError(this.handleError));
  }

  getCategory(category: string, page: number, mediaType: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${mediaType}/${category}`, {
        params: this.buildParams({ page: page.toString() })
      })
      .pipe(catchError(this.handleError));
  }

  getMovie(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movie/${id}`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getExternalId(id: number, mediaType: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${mediaType}/${id}/external_ids`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getRecommended(id: number, page: number, mediaType: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${mediaType}/${id}/recommendations`, {
        params: this.buildParams({})
      });
  }

  getBackdrops(id: number, mediaType: string): Observable<any> {
    const url = `${this.apiUrl}/${mediaType}/${id}/images?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getYouTubeVideo(id: number, mediaType: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${mediaType}/${id}/videos`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getTrending(media: string, page: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/trending/${media}/week`, {
        params: this.buildParams({ page: page.toString() })
      })
      .pipe(catchError(this.handleError));
  }

  getTvDiscover(page: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/discover/tv`, {
        params: this.buildParams({ page: page.toString() })
      })
      .pipe(catchError(this.handleError));
  }

  getPersonExternalId(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/person/${id}/external_ids`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getTvShow(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/tv/${id}`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getTvShowEpisodes(id: number, season: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/tv/${id}/season/${season}`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getMediaByGenre(media: string, genreId: number, page: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/discover/${media}`, {
        params: this.buildParams({
          page: page.toString(),
          with_genres: genreId.toString()
        })
      })
      .pipe(catchError(this.handleError));
  }

  getGenreList(media: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/genre/${media}/list`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getByGenre(id: number, type: string, page: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/genre/${id}/${type}`, {
        params: this.buildParams({ page: page.toString() })
      })
      .pipe(catchError(this.handleError));
  }

  getCredits(id: number, type: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/${type}/${id}/credits`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getPerson(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/person/${id}`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getPersonImages(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/person/${id}/images`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  getPersonCredit(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/person/${id}/movie_credits`, {
        params: this.buildParams({})
      })
      .pipe(catchError(this.handleError));
  }

  search(query: string, page: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/search/multi`, {
        params: this.buildParams({ query, page: page.toString() })
      })
      .pipe(catchError(this.handleError));
  }

  // ——— Новые методы для рекомендаций и рейтинга ———

  getRecommendedMovies(): Observable<number[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<number[]>(
      `${this.backendUrl}/recommendations/for-you`,
      { headers }
    );
  }

  rateMovie(tmdbId: number, rating: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    const body = {
      tmdb_movie_id: tmdbId,
      action_type: 'rating',
      rating
    };
    return this.http.post(
      `${this.backendUrl}/user/actions`,
      body,
      { headers }
    );
  }

  private buildParams(params: any): HttpParams {
    let p = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', this.language);
    Object.keys(params).forEach(k => p = p.set(k, params[k]));
    return p;
  }

  private handleError(error: any): Observable<never> {
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
