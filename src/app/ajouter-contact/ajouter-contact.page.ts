import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import Contact from 'src/interfaces/Contact';
import { ContactAccessService } from './../services/contact-access.service';

@Component({
  selector: 'app-ajouter-contact',
  templateUrl: './ajouter-contact.page.html',
  styleUrls: ['./ajouter-contact.page.scss'],
})
export class AjouterContactPage implements OnInit {
  ajouterContactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private contactAccessService: ContactAccessService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.ajouterContactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      adresse: ['', [Validators.required, Validators.minLength(3)]],
      ville: ['', [Validators.required, Validators.minLength(3)]],
      service: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {}

  async nouveauContact() {
    // add contact for this compte
    const user = this.auth.currentUser;

    if (user) {
      await this.contactAccessService.addContact({
        nom: this.getNom(),
        prenom: this.getPrenom(),
        email: this.getEmail(),
        phone: this.getPhone(),
        adresse: this.getAdresse(),
        ville: this.getVille(),
        service: this.getService(),
        src: 'https://picsum.photos/200/300',
        compte_email: doc(this.firestore, 'comptes', user.uid),
        shared: false,
      } as Contact);
      this.navCtrl.navigateForward('/liste-contacts', { replaceUrl: true });
    } else {
      this.alertCtrl.create({
        header: 'Erreur',
        message: 'Vous devez être connecté pour ajouter un contact',
        buttons: ['OK'],
      });
    }
  }

  newPersonalContact() {
    return doc(this.firestore, 'comptes');
  }

  getNom() {
    return this.ajouterContactForm.get('nom')?.value;
  }

  getPrenom() {
    return this.ajouterContactForm.get('prenom')?.value;
  }

  getEmail() {
    return this.ajouterContactForm.get('email')?.value;
  }

  getPhone() {
    return this.ajouterContactForm.get('phone')?.value;
  }

  getAdresse() {
    return this.ajouterContactForm.get('adresse')?.value;
  }

  getVille() {
    return this.ajouterContactForm.get('ville')?.value;
  }

  getService() {
    return this.ajouterContactForm.get('service')?.value;
  }
}
