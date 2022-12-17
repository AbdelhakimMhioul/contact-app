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
    shared: false
  };

  constructor(
    private router: Router,
    private contactAccessService: ContactAccessService
  ) {}

  ionViewWillEnter() {}

  ngOnInit() {
    const routerState = this.router.getCurrentNavigation()?.extras.state;
    if (routerState) {
      const contactId = routerState['id'];
      this.contactAccessService
        .getContactById(contactId)
        .subscribe((contact) => (this.contact = contact));
    }
  }

  updateContact(contact: Contact) {
    this.contactAccessService
      .updateContactById(contact.id || '0', contact)
      .then(() =>
        this.router.navigate(['/liste-contacts'], { replaceUrl: true })
      )
      .catch((error) => console.log(error));
  }

  deleteContact(contact: Contact) {
    this.contactAccessService
      .deleteContactById(contact.id || '0')
      .then(() => {
        this.router.navigate(['/liste-contacts'], { replaceUrl: true });
      })
      .catch((error) => console.log(error));
  }

  shareContact(contact: Contact) {}
}
