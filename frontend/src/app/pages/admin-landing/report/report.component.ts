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
      "Cars": this.mydata,
      "current Month": this.mydata2
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
