import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Contact from 'src/interfaces/Contact';
import { ContactAccessService } from '../services/contact-access.service';

@Component({
  selector: 'app-recommandations',
  templateUrl: './recommandations.page.html',
})
export class RecommandationsPage implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private contactAccessService: ContactAccessService,
    private router: Router
  ) {}

  async ngOnInit() {
    (await this.contactAccessService.getContacts()).subscribe(
      (contacts) => (this.contacts = contacts)
    );
    console.log(this.contacts);
  }

  detailsContact(contact: Contact) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: contact.id,
      },
    };

    this.router.navigate(['/detail-contact'], navigationExtras);
  }
}
