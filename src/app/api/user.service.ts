import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { User } from '../models/Interfaces';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User;

  constructor(  private fireauth: AngularFireAuth, public toastController: ToastController, private navCtrl:NavController, private storage:Storage, private firedatabase:AngularFireDatabase) { }

  registrarUsuario(name:string, email:string, password:string){
   this.fireauth.createUserWithEmailAndPassword(email, password).then(userInfo => {
     userInfo.user.updateProfile({
       displayName: name
     }).then(res => this.presentToast("Usuario registrado satisfactoriamente"))
     .catch(error => console.log(error));
   }).catch(error => console.log(error));
  }
  writeUserData(userId, name, email) {
   this.firedatabase.database.ref('users/' + userId).set({
      username: name,
      email: email
    });
  }
  login(email:string, password:string){
    return this.fireauth.signInWithEmailAndPassword(email, password);  
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  async isLoggedIn() {
  
  
  }
  async logOut(){
    return this.fireauth.currentUser;
  }
 
}
