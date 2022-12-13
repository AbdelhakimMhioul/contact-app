import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import Contact from 'src/interfaces/Contact';
import { ContactAccessService } from './../services/contact-access.service';

@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.page.html',
  styleUrls: ['./liste-contacts.page.scss'],
})
export class ListeContactsPage implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactAccessService: ContactAccessService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    (await this.contactAccessService.getContacts()).subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  detailsContact(contact: Contact) {
    this.navCtrl.navigateForward('/detail-contact', {
      queryParams: { state: JSON.stringify(contact) },
    });
  }

  modifierContact(contact: Contact) {
    console.log('Modifier le contact', contact);
  }

  ajouterContact() {
    this.navCtrl.navigateForward('/ajouter-contact', { replaceUrl: true });
  }
}
