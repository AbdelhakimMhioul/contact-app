import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterContactPageRoutingModule } from './ajouter-contact-routing.module';

import { AjouterContactPage } from './ajouter-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AjouterContactPageRoutingModule,
  ],
  declarations: [AjouterContactPage],
})
export class AjouterContactPageModule {}
