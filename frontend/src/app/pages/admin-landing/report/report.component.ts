import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import html2canvas from 'html2canvas';
import { ProductsService } from 'src/app/services/products.service';
import { Car } from 'src/app/model/car';
import { UserService } from 'src/app/services/user.service';
import { UserDashboard } from 'src/app/model/userDashboard';
import { Total } from 'src/app/model/total';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  cars: any[];
  carsByDate1: Car[] = [];
  carsByDate2: Car[] = [];
  carsByDate3: Total[] = [];
  mydata = [];
  temp:any;
  mydata2 = [];
  temp2:any;
  mydata3 = [];
  temp3:any;
  mydata4 = [];
  temp4:any;
  mydata5 = [];
  temp5:any;

  users: any[];
  usersByReg: UserDashboard[] = [];


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private prodService:ProductsService, private userService: UserService) { }



  ngOnInit(): void {

    this.getUserByReg();
    this.GetCarByDate;
    this.GetNumCars();

    this.prodService.GetAllByDate().subscribe((res:any) =>{
      let result = res;
      this.cars = result;
      //console.log(res);
      this.dtTrigger.next(this.cars);
      this.carsByDate1 = result;
      this.carsByDate2 = result;
      //console.log(result);
      //console.log(this.carsByDate1);

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
    
      //console.log(this.mydata2);
        // console.log(this.mydata);

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



  CARS = [
    {
      "Cars": this.mydata,
      "current Month": this.mydata2
    }
  ];

  getUserByReg()
  {
    this.userService.GetNumUsersByReg().subscribe((res:any) =>{
      let result = res;
      let currentdt = new Date()

      this.usersByReg = result.filter(ress => ress.created_at === currentdt.toISOString().slice(0, 7))
     
      this.usersByReg.forEach(element => {
           let temp3 = parseInt(element.numuser)
           let temp4 = String(element.created_at)
           this.mydata3.push(temp3)
           this.mydata4.push(temp4)
       
     });
      
    });

      this.temp3 = this.mydata3
      this.temp4 = this.mydata4
   
  }

  USERS = [
    {
      "Users": this.mydata3,
      "Users Per Month": this.mydata4
    }
  ];

  GetNumCars(){

    this.prodService.GetNumCars().subscribe((res:any) =>{
      this.cars = res;
      this.carsByDate3 = this.cars;

       this.carsByDate3.forEach(element => {
        
        let temp5 = parseInt(element.numcars)
        
        this.mydata5.push(temp5)
        
    
       });
    });

  }
  

  TOTAL = [
    {
      "Total cars": this.carsByDate3
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
      PDF.save('report.pdf');
    });
  }
}
