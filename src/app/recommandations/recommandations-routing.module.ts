import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommandationsPage } from './recommandations.page';

const routes: Routes = [
  {
    path: '',
    component: RecommandationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommandationsPageRoutingModule {}
