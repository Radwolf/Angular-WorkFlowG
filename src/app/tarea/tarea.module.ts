import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareaRoutingModule } from './tarea-routing.module';
import { TareaComponent } from './tarea.component';
import { TareaListComponent } from './tarea-list/tarea-list.component';
import { TareaItemComponent } from './tarea-item/tarea-item.component';

@NgModule({
  imports: [
    CommonModule,
    TareaRoutingModule
  ],
  declarations: [TareaComponent, TareaListComponent, TareaItemComponent]
})
export class TareaModule { }
