import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareaRoutingModule } from './tarea-routing.module';
import { TareaComponent } from './tarea.component';
import { TareaListComponent } from './tarea-list/tarea-list.component';
import { TareaItemComponent } from './tarea-item/tarea-item.component';
import { TareaService } from './shared/tarea.service';

@NgModule({
  imports: [
    CommonModule,
    TareaRoutingModule
  ],
  providers: [TareaService],
  declarations: [TareaComponent, TareaListComponent, TareaItemComponent]
})
export class TareaModule { }
