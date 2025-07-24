import { Component, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() videoUrl: string | null = null;

  /** динамический компонент, который надо отрисовать */
  dynamicComp: Type<any> | null = null;

  isVisible = false;
  private sub!: Subscription;

  constructor(private modal: ModalService) {}

  ngOnInit(): void {
    this.sub = this.modal.component$.subscribe(cmp => {
      this.dynamicComp = cmp;
      this.isVisible   = !!cmp || !!this.videoUrl;
    });
  }

  /* старый вызов для трейлеров – ничего не ломаем */
  openModal(url: string): void {
    this.videoUrl = url;
    this.isVisible = true;
  }

  closeModal(): void {
    this.modal.close();
    this.videoUrl = null;
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
