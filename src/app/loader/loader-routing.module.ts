import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoaderPage } from './loader.page';

const routes: Routes = [
  {
    path: '',
    component: LoaderPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoaderPageRoutingModule {}
