import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalPagePage } from './modal-page/modal-page.page';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent, ModalPagePage],
  entryComponents: [ModalPagePage],
  imports: [BrowserModule,  IonicModule.forRoot(), AppRoutingModule,   AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,AngularFireDatabaseModule, IonicStorageModule.forRoot({
      name: 'cinemappdb',
driverOrder: ['indexeddb', 'sqlite', 'websql']
    })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
