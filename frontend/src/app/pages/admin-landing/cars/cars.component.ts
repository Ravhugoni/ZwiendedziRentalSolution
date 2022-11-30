import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Car } from 'src/app/model/car';

// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexTitleSubtitle,
//   ApexStroke,
//   ApexGrid
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   dataLabels: ApexDataLabels;
//   grid: ApexGrid;
//   stroke: ApexStroke;
//   title: ApexTitleSubtitle;
// };

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  // @ViewChild("chart") chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;

  constructor(private ProductsService:ProductsService) { }

  cars: any[];
  // usersByReg: Car[] = [];
  carsByCat: Car[] = [];
  mydata = [];
  temp:any;
  mydata2 = [];
  temp2:any;
  cat: any;

  ngOnInit(): void {

    //this.GetAllByCat();

    this.ProductsService.GetNumCars().subscribe((res:any) =>{
      this.cars = res;
       console.log(this.cars);
    });
  }

  // async GetAllByCat()
  // {
  //   this.ProductsService.GetAllByCat(this.carsByCat.).subscribe((res:any) =>{
  //     this.carsByCat = res;
  //     console.log(this.carsByCat)
     
  //     this.carsByCat.forEach(element => {
  //          console.log('value ', ) 
  //          let temp = parseInt(element.numuser)
  //          let temp2 = String(element.created_at)
  //          this.mydata.push(temp)
  //          this.mydata2.push(temp2)
       
  //    });
  //   console.log(this.mydata);
  //   console.log(this.mydata2);
      
  //   });

  //     this.temp = this.mydata
  //     this.temp2 = this.mydata2
  //     console.log('temp ', this.temp);
  //     console.log('2nd ',this.mydata);
  //     console.log('temp2 ', this.temp2);
  //     console.log('3nd ',this.mydata2);
  //   await this.mychart();
  // }

  // mychart()
  // {
    
  //   this.chartOptions = {
  //     series: [
  //       {
  //         name: "Desktops",
  //         data: this.mydata
  //       }
  //     ],
  //     chart: {
  //       height: 350,
  //       type: "line",
  //       zoom: {
  //         enabled: false
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       curve: "straight"
  //     },
  //     title: {
  //       text: "User Registered per Month",
  //       align: "left"
  //     },
  //     grid: {
  //       row: {
  //         colors: ["#f3f3f3", "transparent"], 
  //         opacity: 0.5
  //       }
  //     },
  //     xaxis: {
  //       categories: this.mydata2
       
  //     }
  //   };
  // }


}
