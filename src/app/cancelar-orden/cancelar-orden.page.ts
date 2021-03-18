import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Orden } from '../models/Interfaces';

@Component({
  selector: 'app-cancelar-orden',
  templateUrl: './cancelar-orden.page.html',
  styleUrls: ['./cancelar-orden.page.scss'],
})
export class CancelarOrdenPage implements OnInit {
  data:Orden[] = [];
  total;
  cantidad;
  uid;
  constructor(public storage:Storage, private navCtrl:NavController, private firedatabase:AngularFireDatabase, private fireauth:AngularFireAuth) { }

  ngOnInit() {
    this.fireauth.currentUser.then(user => {
        if(user){
          this.uid = user.uid;
          this.firedatabase.database.ref('users/' + user.uid)
          .on('value', val => {
            console.log(val.val());
            if(val.exists()){
              this.data = val.val().orden.filter(x => x.bought == true)
              this.data.push(  {
                pedido:val.val().ticket,
                cantidad:val.val().ticket.cantidad,
                bought:val.val().ticket.bought,
                paymentType:val.val().ticket.paymentType
              });
              this.cantidad = val.val().ticket.cantidad;
              this.total = this.data.map(x => x.pedido.price * x.cantidad).reduce((a,b) => a+b);
            }
          })
        }
      })
 
  }
  cancelarTickets(){
    this.firedatabase.database.ref('users/' + this.uid).child('ticket').set({});
    this.firedatabase.database.ref('users/' + this.uid).child('orden').set([]);
    this.navCtrl.navigateBack('tabs/tab2');
  }

}
