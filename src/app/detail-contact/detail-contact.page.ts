import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import Contact from 'src/interfaces/Contact';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
  providers: [NavParams],
})
export class DetailContactPage implements OnInit {
  contact!: Contact;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((_p) => {
      const navParams = this.router.getCurrentNavigation()?.extras.state;
      if (navParams) this.contact = navParams['contact'];
    });
  }

  ngOnInit() {}

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
