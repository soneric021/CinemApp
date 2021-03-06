import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../api/user.service';
import { Orden, Pedido, Ticket } from '../models/Interfaces';

@Component({
  selector: 'app-confirmar-orden-page',
  templateUrl: './confirmar-orden-page.page.html',
  styleUrls: ['./confirmar-orden-page.page.scss'],
})
export class ConfirmarOrdenPagePage implements OnInit {
  data:Orden[] = [];
  pedido:Orden[] = [];
  ticketOrden:Orden = null;
  mySelect;
  mySelect2;
  cantidad:number;
  ticket:Ticket = null;
  total:number;
  paymentType:number;
  uid;
  buttonmessage:string;
  isLogged:boolean = false;
  constructor(public navCtrl:NavController,  private fireauth: AngularFireAuth, private userService:UserService, private toastController:ToastController, private firedatabase:AngularFireDatabase) { }

  ngOnInit() {
    this.firedatabase.database.ref('orden').on('value', data =>{
      if(!data.exists()){
        this.data= [];
      }else{
        this.pedido = data.val(); 
        this.data = this.pedido.filter(x => x.bought ==false);
        this.total = this.data.map(x => x.pedido.price * x.cantidad).reduce((a,b) => a+b);
      }
    })
    
    this.firedatabase.database.ref('ticket').on('value', data =>{
      
      if(data.exists()){
      if(this.ticketOrden != null){
        this.data.pop();
      }
        this.ticket = data.val();
        this.ticketOrden = {
          pedido:data.val(),
          cantidad:data.val().cantidad,
          bought:data.val().bought,
          paymentType: data.val().paymentType
        }
        this.cantidad = data.val().cantidad;
        this.data.push(this.ticketOrden);
        this.total = this.data.map(x => x.pedido.price * x.cantidad).reduce((a,b) => a+b);
      }
    })
    this.fireauth.currentUser.then(data => {
      console.log(data);
      if(data){
        this.uid = data.uid;
        this.isLogged = true;
        this.buttonmessage = !this.isLogged? "Accede para confirmar tu orden" : "Realizar pago";
      }
    }).catch(error => console.log(error));
    this.buttonmessage = !this.isLogged? "Accede para confirmar tu orden" : "Realizar pago";
   
    
 
  }

  async goToLogin(){
    if(!this.isLogged){
      this.navCtrl.navigateRoot('login');
    }else{
      if(this.cantidad == undefined){
        this.presentToast("Debes elegir la cantidad de tickets que quieres");
      }else if(this.paymentType == undefined){
        this.presentToast("Debes elegir un metodo de pago");
      }else{
        this.ticket.bought = true;
        this.pedido.map(x => x.bought = true);
        this.firedatabase.database.ref('ticket').set({});
        this.firedatabase.database.ref('orden').set([]);
        this.firedatabase.database.ref('users/' + this.uid).child('ticket').set(this.ticket);
        this.firedatabase.database.ref('users/' + this.uid).child('orden').set(this.pedido);

        this.navCtrl.navigateRoot('tabs/tab2');
      }
    }
  }
  showSelectValue(mySelect){
    
    this.cantidad = mySelect;
    this.ticket = {
      id:1,
      displayName: 'Avengers End-Game',
      name:'Tickets para Avengers End-Game',
      price:500,
      time:'4:00 P.M. - 7:00 P.M.',
      cantidad:this.cantidad, 
      bought:false
    }
    this.firedatabase.database.ref('ticket').set(this.ticket);
    this.ticket = null;
    this.total = this.data.map(x => x.pedido.price * x.cantidad).reduce((a,b) => a+b);
   }
   showSelectValue2(mySelect2){
    console.log(mySelect2);
    this.paymentType = mySelect2;
   }
   
   async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
 
}
