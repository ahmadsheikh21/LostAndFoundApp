import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostitemsPage } from './lostitems.page';

const routes: Routes = [
  {
    path: '',
    component: LostitemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostitemsPageRoutingModule {}
