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
  temp1: any;
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
    });
  }

  async GetCarByCat()
  {
    this.ProductsService.GetAllByCat().subscribe((res:any) =>{
      let result = res;
    
      this.carsByCat1 = result.filter(ress => (ress.category).toLowerCase() === ("SUV").toLowerCase())
      this.carsByCat2 = result.filter(ress => (ress.category).toLowerCase() === ("HATCHBACK").toLowerCase())
      this.carsByCat3 = result.filter(ress => (ress.category).toLowerCase() === ("SEDAN").toLowerCase())
      this.carsByCat4 = result;
      
        //COUNTING THE SUVs
      this.carsByCat1.forEach(element => {
           let temp = parseInt(element.count)
           this.mydata.push(temp)
           
     });
      //COUNTING THE HATCHBACKs
     this.carsByCat2.forEach(element => {
        let temp1 = parseInt(element.count)
        this.mydata2.push(temp1)
      });
      //COUNTING THE SEDANs
      this.carsByCat3.forEach(element => {
        let temp2 = parseInt(element.count)
        this.mydata3.push(temp2)
      });

      //the date the cars were posted
      this.carsByCat4.forEach(element => {
        let temp4 = String(element.to_char)

        this.mydata4.push(temp4)
      });
      
      
    });

      this.temp = this.mydata
      this.temp1 = this.mydata2
      this.temp2 = this.mydata3
      this.temp4 = this.mydata4

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
          name: "SEDAN",
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
