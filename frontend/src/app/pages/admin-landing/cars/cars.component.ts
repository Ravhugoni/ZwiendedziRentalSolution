import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Car } from 'src/app/model/car';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { ThisReceiver } from '@angular/compiler';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};


// import {
//   ChartComponent,
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexTitleSubtitle,
//   ApexStroke,
//   ApexGrid,
//   ApexPlotOptions,
//   ApexResponsive,
//   ApexLegend,
//   ApexFill
// } from "ng-apexcharts";

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   plotOptions: ApexPlotOptions;
//   xaxis: ApexXAxis;
//   title: ApexTitleSubtitle;
//   dataLabels: ApexDataLabels;
//   grid: ApexGrid;
//   stroke: ApexStroke;
//   responsive: ApexResponsive[];
//   legend: ApexLegend;
//   fill: ApexFill;
// };
//import * as ApexCharts from 'apexcharts';

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

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private ProductsService:ProductsService) { }

  cars: any[];
  // usersByReg: Car[] = [];
  carsByCat1: Car[] = [];
  carsByCat2: Car[] = [];
  carsByCat3: Car[] = [];
  carsByCat4: Car[] = [];
  mydata = [];
  temp:any;
  mydata2 = [];
  temp2:any;
  mydata3 = [];
  mydata4= [];
  temp3:any;
  temp4:any;
  cat: any;

  ngOnInit(): void {

    this.GetCarByCat();

    this.ProductsService.GetNumCars().subscribe((res:any) =>{
      this.cars = res;
       console.log(this.cars);
    });
  }

  // GetCarByCat(){

  //   this.ProductsService.GetAllByCat().subscribe((res:any) =>{
  //       this.carsByCat = res;
  //       console.log(this.carsByCat)

  //   });

  // }

  async GetCarByCat()
  {
    this.ProductsService.GetAllByCat().subscribe((res:any) =>{
      let result = res;
    
      this.carsByCat1 = result.filter(ress => (ress.category).toLowerCase() === ("SUV").toLowerCase())
      this.carsByCat2 = result.filter(ress => (ress.category).toLowerCase() === ("HATCHBACK").toLowerCase())
      this.carsByCat3 = result.filter(ress => (ress.category).toLowerCase() === ("SEDAN").toLowerCase())
      this.carsByCat4 = result;

      console.log('SUV',this.carsByCat1)
      console.log('Hatchback',this.carsByCat2)
      console.log('Seden',this.carsByCat3)

      this.carsByCat1.forEach(element => {
           let temp = parseInt(element.count)
          //  let temp3 = String(element.to_char)
           this.mydata.push(temp)
     });

     this.carsByCat2.forEach(element => {
        let temp1 = parseInt(element.count)
        // let temp3 = String(element.to_char)
        this.mydata2.push(temp1)
      });

      this.carsByCat3.forEach(element => {
        let temp2 = parseInt(element.count)
        // let temp3 = String(element.to_char)
        this.mydata3.push(temp2)
      });

      //for the date
      this.carsByCat4.forEach(element => {
        let temp4 = String(element.to_char)
        
        // if (element.to_char === element.to_char){
        //   this.mydata4.push(temp4)
        // }
        this.mydata4.push(temp4)
      });
      
    // console.log(this.mydata);
    // console.log(this.mydata2);
    // console.log(this.mydata3);
    console.log(this.mydata4);
      
    });

      this.temp = this.mydata
      this.temp2 = this.mydata2
      this.temp2 = this.mydata3
      this.temp4 = this.mydata4

      console.log('temp ', this.temp);
      console.log('2nd ',this.mydata);
      console.log('temp2 ', this.temp2);
      console.log('3rd ',this.mydata2);
      console.log('temp4', this.temp4);
      console.log('4th ',this.mydata4);
    await this.mychart();
  }

  mychart()
  {
    this.chartOptions = {
      series: [
        {
          name: "SUV",
          data: this.mydata
        },
        {
          name: "HATCHBACK",
          data: this.mydata2
        },
        {
          name: "SEDEN",
          data: this.mydata3
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%"
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: this.mydata4
      },
      yaxis: {
        title: {
          text: "Cars"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + " cars";
          }
        }
      }
    };

  }

  // mychart()
  // {

    // this.chartOptions = {
    //   series: [{
    //   name: 'Number Of Cars',
    //   data: this.mydata
    // }, {
    //   name: 'category',
    //   data: this.mydata2
    // } ],
    //   chart: {
    //   type: 'bar',
    //   height: 350,
    //   stacked: true,
    //   toolbar: {
    //     show: true
    //   },
    //   zoom: {
    //     enabled: true
    //   }
    // },
    // responsive: [{
    //   breakpoint: 480,
    //   options: {
    //     legend: {
    //       position: 'bottom',
    //       offsetX: -10,
    //       offsetY: 0
    //     }
    //   }
    // }],
    // plotOptions: {
    //   bar: {
    //     horizontal: false,
    //     borderRadius: 10,
    //     dataLabels: {
    //       total: {
    //         enabled: true,
    //         style: {
    //           fontSize: '13px',
    //           fontWeight: 900
    //         }
    //       }
    //     }
    //   },
    // },
    // xaxis: {
    //   type: 'datetime',
    //   categories: this.mydata3,
    // },
    // legend: {
    //   position: 'right',
    //   offsetY: 40
    // },
    // fill: {
    //   opacity: 1
    // }
    // };


  


    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "My-series",
    //       data: this.mydata
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "bar"
    //   },
    //   title: {
    //     text: "My First Angular Chart"
    //   },
    //   xaxis: {
    //     categories: this.mydata3
    //   }
    // };
    
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Desktops",
    //       data: this.mydata
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "line",
    //     zoom: {
    //       enabled: false
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     curve: "straight"
    //   },
    //   title: {
    //     text: "User Registered per Month",
    //     align: "left"
    //   },
    //   grid: {
    //     row: {
    //       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
    //       opacity: 0.5
    //     }
    //   },
    //   xaxis: {
    //     categories: this.mydata2
    //     // categories: [
    //     //   "Jan",
    //     //   "Feb",
    //     //   "Mar",
    //     //   "Apr",
    //     //   "May",
    //     //   "Jun",
    //     //   "Jul",
    //     //   "Aug",
    //     //   "Sep"
    //     // ]
    //   }
    // };
  // }

  // var options = {
  //   series: [{
  //   name: 'Net Profit',
  //   data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  // }, {
  //   name: 'Revenue',
  //   data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  // }, {
  //   name: 'Free Cash Flow',
  //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  // }],
  //   chart: {
  //   type: 'bar',
  //   height: 350
  // },
  // plotOptions: {
  //   bar: {
  //     horizontal: false,
  //     columnWidth: '55%',
  //     endingShape: 'rounded'
  //   },
  // },
  // dataLabels: {
  //   enabled: false
  // },
  // stroke: {
  //   show: true,
  //   width: 2,
  //   colors: ['transparent']
  // },
  // xaxis: {
  //   categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  // },
  // yaxis: {
  //   title: {
  //     text: '$ (thousands)'
  //   }
  // },
  // fill: {
  //   opacity: 1
  // },
  // tooltip: {
  //   y: {
  //     formatter: function (val) {
  //       return "$ " + val + " thousands"
  //     }
  //   }
  // }
  // };

  // var chart = new ApexCharts(document.querySelector("#chart"), options);
  // chart.render();


}
