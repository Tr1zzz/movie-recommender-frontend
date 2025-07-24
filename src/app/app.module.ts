import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider }              from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* pipes */
import { RuntimePipe } from './components/global/pipe/runtime.pipe';
import { ArrayToListPipe } from './components/global/pipe/array-to-list.pipe';
import { CharacterWithCommasPipe } from './components/global/pipe/character-with-commas.pipe';
import { DateFormatPipe } from './components/global/pipe/date.pipe';
import { FullDatePipe } from './components/global/pipe/full-date.pipe';
import { NumberWithCommasPipe } from './components/global/pipe/number-with-commas.pipe';
import { NumberWithDoubleDigitsPipe } from './components/global/pipe/number-with-double-digits.pipe';
import { RatingPipe } from './components/global/pipe/rating.pipe';
import { TimePipe } from './components/global/pipe/time.pipe';
import { TruncatePipe } from './components/global/pipe/elipsis.pipe';
import { SortByReleaseDatePipe } from './components/global/pipe/sortbydate.pipe';
import { SortByYearPipe } from './components/global/pipe/sort-by-year.pipe';
import { LanguageNamePipe } from './components/global/pipe/language-name.pipe';
import { SafeUrlPipe } from './components/global/pipe/safe-url.pipe';

/* global components */
import { NavbarComponent } from './components/global/navbar/navbar.component';
import { SliderComponent } from './components/global/slider/slider.component';
import { FooterComponent } from './components/global/footer/footer.component';
import { CarouselComponent } from './components/global/carousel/carousel.component';
import { HeroComponent } from './components/global/hero/hero.component';
import { MediaComponent } from './components/global/media/media.component';
import { VideosComponent } from './components/global/videos/videos.component';
import { ImagesComponent } from './components/global/images/images.component';
import { ListingComponent } from './components/global/listing/listing.component';
import { EpisodesComponent } from './components/global/episodes/episodes.component';
import { ModalComponent } from './components/global/modal/modal.component';

/* feature components */
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvComponent } from './components/tv/tv.component';
import { MoviesInfoComponent } from './components/movies-info/movies-info.component';
import { TvInfoComponent } from './components/tv-info/tv-info.component';
import { PersonComponent } from './components/person/person.component';
import { MovieCategoryComponent } from './components/movie-category/movie-category.component';
import { TvCategoryComponent } from './components/tv-category/tv-category.component';
import { GenreComponent } from './components/genre/genre.component';
import { SearchComponent } from './components/global/search/search.component';

/* auth */
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { ProfileComponent } from './components/auth/profile/profile.component';

/* services */
import { ApiService } from './api/api.service';
import { AuthService } from './api/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    /* pipes */
    RuntimePipe,
    ArrayToListPipe,
    CharacterWithCommasPipe,
    DateFormatPipe,
    FullDatePipe,
    NumberWithCommasPipe,
    NumberWithDoubleDigitsPipe,
    RatingPipe,
    TimePipe,
    TruncatePipe,
    SortByReleaseDatePipe,
    SortByYearPipe,
    LanguageNamePipe,
    SafeUrlPipe,
    /* global */
    NavbarComponent,
    SliderComponent,
    FooterComponent,
    CarouselComponent,
    HeroComponent,
    MediaComponent,
    VideosComponent,
    ImagesComponent,
    ListingComponent,
    EpisodesComponent,
    ModalComponent,
    /* features */
    HomeComponent,
    MoviesComponent,
    TvComponent,
    MoviesInfoComponent,
    TvInfoComponent,
    PersonComponent,
    MovieCategoryComponent,
    TvCategoryComponent,
    GenreComponent,
    SearchComponent,
    /* auth */
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SocialLoginModule
  ],
  providers: [
    ApiService,
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '43948168528-smprs8qavl1381351sp9j6j7s18oj68u.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}