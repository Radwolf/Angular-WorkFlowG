import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareaRoutingModule } from './tarea-routing.module';
import { TareaComponent } from './tarea.component';
import { TareaListComponent } from './tarea-list/tarea-list.component';
import { TareaItemComponent } from './tarea-item/tarea-item.component';
import { TareaService } from './shared/tarea.service';
import { EstadoTareaPipe } from '../shared/pipes/estado-tarea.pipe';
import { SharedPipesModule } from '../shared/pipes/shared-pipes.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TareaRoutingModule,
    SharedPipesModule,
    FormsModule
  ],
  providers: [TareaService],
  declarations: [TareaComponent, TareaListComponent, TareaItemComponent]
})
export class TareaModule { }
