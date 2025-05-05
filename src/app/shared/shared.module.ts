import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Здесь — ваши общие компоненты / директивы / пайпы
// import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    // ButtonComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    // ButtonComponent
  ]
})
export class SharedModule {}