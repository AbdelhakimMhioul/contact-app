import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['authentification']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'liste-contacts',
    loadChildren: () =>
      import('./liste-contacts/liste-contacts.module').then(
        (m) => m.ListeContactsPageModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'ajouter-contact',
    loadChildren: () =>
      import('./ajouter-contact/ajouter-contact.module').then(
        (m) => m.AjouterContactPageModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'detail-contact',
    loadChildren: () =>
      import('./detail-contact/detail-contact.module').then(
        (m) => m.DetailContactPageModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'authentification',
    loadChildren: () =>
      import('./authentification/authentification.module').then(
        (m) => m.AuthentificationPageModule
      ),
  },
  {
    path: 'deconnexion',
    loadChildren: () =>
      import('./deconnexion/deconnexion.module').then(
        (m) => m.DeconnexionPageModule
      ),
  },
  {
    path: 'inscription',
    loadChildren: () =>
      import('./inscription/inscription.module').then(
        (m) => m.InscriptionPageModule
      ),
  },
  {
    path: 'loader',
    loadChildren: () =>
      import('./loader/loader.module').then((m) => m.LoaderPageModule),
  },
  {
    path: 'recommandations',
    loadChildren: () => import('./recommandations/recommandations.module').then( m => m.RecommandationsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
