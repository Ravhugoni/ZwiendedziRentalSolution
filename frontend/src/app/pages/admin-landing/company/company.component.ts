import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { CompanyDashboard } from 'src/app/model/companyDashboard';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  company:any;
  companyByReg: CompanyDashboard[] = [];
  mydata = [];
  temp:any;
  mydata2 = [];
  temp2:any;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    
    this.getCompanyByReg();

    this.companyService.GetTotalCompany().subscribe((res:any) =>{
      this.company = res;
    });
    
    
  }

  async getCompanyByReg()
  {
    this.companyService.GetCompanyByReg().subscribe((res:any) =>{
      this.companyByReg = res;
      // console.log(this.companyByReg)

      this.companyByReg.forEach(element => {

           let temp = parseInt(element.numcompany)
           let temp2 = String(element.created_at)
           this.mydata.push(temp)
           this.mydata2.push(temp2)
       
     });
      
    });

      this.temp = this.mydata
      this.temp2 = this.mydata2
    await this.mychart();
  }


  mychart()
  {
    
    this.chartOptions = {
      series: [
        {
          name: "Companies",
          data: this.mydata
        }
      ],
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Company Brancies Opened",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.mydata2
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

}
