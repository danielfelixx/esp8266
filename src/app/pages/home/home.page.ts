import { Component } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import pdf from 'cordova-pdf-generator/www/pdf';
import { DatePipe } from '@angular/common';
import { PrintService } from 'src/app/services/print/print.service';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public lstObj=[];

  constructor(
    public restProvider: RestService,
    public datepipe: DatePipe,
    public print:PrintService,
    
  ) {
    
  }


  ionViewDidLoad(){
  
  }
  get() {
    this.restProvider.get("https://thingspeak.com/channels/1097218/field/2.json").then((result: any) => {
      if(result !== null){
      let lstDbm = result.feeds;
      console.log(result);
      this.restProvider.get("https://thingspeak.com/channels/1097218/field/1.json").then((result: any) => {
        console.log(result);
        
        this.lstObj = [];

        let totalDbm = 0;
        let totalTem=0;

        for (let index = 0; index < result.feeds.length; index++) {

          this.lstObj.push({
            horario: this.datepipe.transform(lstDbm[index].created_at, "dd/MM/yyyy HH:MM:ss"),
            dbm:lstDbm[index].field2,
            temperatura:result.feeds[index].field1
          });
          

          totalDbm = totalDbm + parseFloat(lstDbm[index].field2);
          totalTem = totalTem + parseFloat(result.feeds[index].field1);

          
        }
        console.log(totalTem,totalDbm);
        let mediaDbm = totalDbm/lstDbm.length;
        let mediaTemp = totalTem / lstDbm.length
        this.print.print(this.lstObj, mediaDbm, mediaTemp);

      }).catch((err)=>console.log(err))


      }


    }).catch((err) => console.log(err));

  }

}

  



