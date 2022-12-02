import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import html2canvas from 'html2canvas';
import { ProductsService } from 'src/app/services/products.service';
import { Car } from 'src/app/model/car';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  cars: any[];
  carsByDate1: Car[] = [];
  carsByDate2: Car[] = [];
  mydata = [];
  temp:any;
  mydata2 = [];
  temp2:any;


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private prodService:ProductsService) { }



  ngOnInit(): void {

    this.GetCarByDate;
    this.prodService.GetAllByDate().subscribe((res:any) =>{
      let result = res;
      this.cars = result;
      console.log(res);
      this.dtTrigger.next(this.cars);
      this.carsByDate1 = result;
      this.carsByDate2 = result;
      //console.log(result);
      console.log(this.carsByDate1);

      this.carsByDate1.forEach(element => {
        let temp = parseInt(element.count)
       //  let temp3 = String(element.to_char)
        this.mydata.push(temp)
  });

  this.carsByDate2.forEach(element => {
    let temp1 = String(element.to_char)
    // let temp3 = String(element.to_char)
    this.mydata2.push(temp1)
  });
    
  console.log(this.mydata2);
      console.log(this.mydata);

      // getting the current month
    // let dt = new Date();
    // var currrentDate = dt.toISOString().slice(0, 7)
    // console.log(currrentDate);
  })

}

  GetCarByDate(){
    this.prodService.GetAllByDate().subscribe((res:any) =>{
      let result = res;
      this.carsByDate1 = result;
      console.log(result);
      console.log(this.carsByDate1);

      this.carsByDate1.forEach(element => {
        let temp = parseInt(element.count)
       //  let temp3 = String(element.to_char)
        this.mydata.push(temp)
  });

  this.carsByDate2.forEach(element => {
     let temp1 = String(element.to_char)
     // let temp3 = String(element.to_char)
     this.mydata2.push(temp1)
   });

   console.log(this.mydata);
    console.log(this.mydata2);
    });

    this.temp = this.mydata
      this.temp2 = this.mydata2

      console.log('temp ', this.temp);
      console.log('2nd ',this.mydata);
      console.log('temp2 ', this.temp2);
      console.log('3rd ',this.mydata2);
  }



  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];

  openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}
