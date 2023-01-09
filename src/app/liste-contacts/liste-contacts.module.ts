import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeContactsPageRoutingModule } from './liste-contacts-routing.module';

import { ListeContactsPage } from './liste-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeContactsPageRoutingModule,
  ],
  declarations: [ListeContactsPage],
})
export class ListeContactsPageModule {}
