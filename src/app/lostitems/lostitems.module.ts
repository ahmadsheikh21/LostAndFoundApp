import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { LostitemsPageRoutingModule } from './lostitems-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LostitemsPage } from './lostitems.page';
import {AddnewlostitemsComponent} from '../addnewlostitems/addnewlostitems.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostitemsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LostitemsPage, AddnewlostitemsComponent],
  entryComponents: [AddnewlostitemsComponent]
})
export class LostitemsPageModule {}
