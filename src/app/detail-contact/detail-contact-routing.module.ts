import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailContactPage } from './detail-contact.page';

const routes: Routes = [
  {
    path: '',
    component: DetailContactPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailContactPageRoutingModule {}
