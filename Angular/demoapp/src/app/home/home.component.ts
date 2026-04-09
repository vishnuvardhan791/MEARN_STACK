import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
      title="Vishnu's Website";
      king="https://tse3.mm.bing.net/th/id/OIP.HJaVcS0O5FaZdLvOd4xcmQHaHa?pid=Api&P=0&h=180";
      imgurl:any;
      disImg(){
        this.imgurl="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1T0eYt.img?w=960&h=600&m=4&q=76";
      }
}
