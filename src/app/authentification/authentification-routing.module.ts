import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthentificationPage } from './authentification.page';

const routes: Routes = [
  {
    path: '',
    component: AuthentificationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthentificationPageRoutingModule {}
