import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDashboard } from 'src/app/model/userDashboard';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private userService: UserService) { 
  }

  users: any[];
  usersByReg: UserDashboard[] = [];
  mydata = [];
  temp:any;
  mydata2 = [];
  temp2:any;


  ngOnInit(): void {

    this.getUserByReg();

    this.userService.GetNumUsers().subscribe((res:any) =>{
      this.users = res;
       //console.log(this.users);
    });
    
  }

  async getUserByReg()
  {
    this.userService.GetNumUsersByReg().subscribe((res:any) =>{
      this.usersByReg = res;
      //console.log(this.usersByReg)
      // console.log(this.usersByReg.numuser)

      // this.usersByReg.forEach(function (value) 
      // {
      //   console.log('value ', value.numuser) 
      //   this.mydata.push(value.numuser)
      //   console.log('data ',this.mydata);
        
      //  // console.log(value.created_at) 
      // }); 
     
      this.usersByReg.forEach(element => {
           //console.log('value ', ) 
           let temp = parseInt(element.numuser)
           let temp2 = String(element.created_at)
           this.mydata.push(temp)
           this.mydata2.push(temp2)
       
     });
   // console.log(this.mydata);
    //console.log(this.mydata2);
      
    });

      this.temp = this.mydata
      this.temp2 = this.mydata2
      //console.log('temp ', this.temp);
     // console.log('2nd ',this.mydata);
      //console.log('temp2 ', this.temp2);
      //console.log('3nd ',this.mydata2);
    await this.mychart();
  }

  mychart()
  {
    
    this.chartOptions = {
      series: [
        {
          name: "Users",
          data: this.mydata
        }
      ],
      chart: {
        height: 350,
        type: "line",
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
        text: "User Registered per Month",
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
       
      }
    };
  }

}
