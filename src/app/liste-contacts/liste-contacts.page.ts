import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
    private navCtrl: NavController,
    private router: Router
  ) {}

  async ngOnInit() {
    const data = await this.contactAccessService.getContacts();
    data.subscribe((contacts) => (this.contacts = contacts));
  }

  detailsContact(contact: Contact) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: contact.id,
      },
    };

    this.router.navigate(['/detail-contact'], navigationExtras);
  }

  modifierContact(contact: Contact) {
    console.log('Modifier le contactt', contact);
  }

  ajouterContact() {
    this.navCtrl.navigateForward('/ajouter-contact', { replaceUrl: true });
  }
}
