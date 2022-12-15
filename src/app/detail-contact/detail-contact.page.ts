import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import Contact from 'src/interfaces/Contact';
import { ContactAccessService } from './../services/contact-access.service';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
  providers: [NavParams],
})
export class DetailContactPage implements OnInit {
  contact: Contact = {
    id: '',
    nom: '',
    prenom: '',
    phone: '',
    email: '',
    src: '',
    service: ' ',
    adresse: '',
    ville: '',
    compte_email: '',
  };

  constructor(
    private router: Router,
    private contactAccessService: ContactAccessService
  ) {}

  ionViewWillEnter() {}

  async ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    if (routerState) {
      const contactId = routerState['id'];

      // query the contact by id from firebase
      (await this.contactAccessService.getContactById(contactId)).subscribe(
        (contact) => {
          this.contact = contact;
        }
      );
    }
  }

  modifierContact() {
    console.log('Modifier le contact');
  }

  supprimerContact() {
    console.log('Supprimer le contact');
  }

  partagerContact() {
    console.log('Partager le contact');
  }
}
