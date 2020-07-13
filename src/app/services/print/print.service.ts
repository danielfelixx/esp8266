import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

declare var cordova;
@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(
    private fileOpener:FileOpener,
    public file:File
  ) { }


  print(obj, mediaDbm,mediaTemp){

          let html = '';

      html += `
      <!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=
    , initial-scale=1.0">
    <style>
    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    
    
    </style>
</head>

<body style="display: flex;justify-content: center; flex-direction: column;background: #fff;">
  <h1 style="text-align:center">
      Relatório de Atividade ESP8266
  </h1>

  <div>
  <h3>Temperatura Média: ${mediaTemp.toFixed(2)} °C</h3>
  </div>
  <table>
      <tr>
          <th>
              Horario
          </th>
          <th>
            Potencia do Wifi
        </th>
        <th>
        Temperatura
        </th>
      </tr>
      `
      obj.forEach(params=>{
        html+=`
        <tr>
        <th>${params.horario}</th>
        <th>${params.dbm} Dbm</th>
        <th>${params.temperatura} °C</th>
        </tr>
        `
      })
          
html+=`
      
  </table>


</body>

</html>
      
`


let options = {
  documentSize: 'A4',
  type: 'base64'
}

        cordova.plugins.pdf.fromData(html, options)
        .then((base64)=>{
        fetch('data:application/pdf;base64,' + base64).then(res => res.blob()).then(blob => {
            this.file.writeFile(this.file.externalApplicationStorageDirectory, 'Relatorio.pdf', blob, { replace: true }).then(file => {
              this.fileOpener.open(                
                file.toInternalURL(),
                'application/pdf'
              ).then((res) => {
                console.log(res);
              }).catch(err => {
                console.log(err)
              });
            }).catch(err => {
                  console.log(err)     
       });
          }).catch(err => {
                 console.log(err)
          });}).cath((err)=>'err');
          


  }
  
}
