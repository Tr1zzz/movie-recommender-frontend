import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private component$$ = new BehaviorSubject<Type<any> | null>(null);
  component$ = this.component$$.asObservable();

  open(c: Type<any>): void  { this.component$$.next(c); }
  close(): void             { this.component$$.next(null); }
}
