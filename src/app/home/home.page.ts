import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Contact from 'src/interfaces/Contact';
import { ContactAccessService } from './../services/contact-access.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private router: Router,
    private contactAccessService: ContactAccessService
  ) {}

  async ngOnInit() {
    const data = await this.contactAccessService.getContacts(true);
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
}
