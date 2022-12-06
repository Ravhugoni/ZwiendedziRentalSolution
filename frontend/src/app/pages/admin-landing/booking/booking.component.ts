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
import { BookingService } from 'src/app/services/booking.service';
import { BookingDashbourd } from 'src/app/model/bookingDashbourd';

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
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  booking:any;
  bookingByReg: BookingDashbourd[] = [];
  mydata = [];
  temp:any;
  mydata2 = [];
  temp2:any;

  constructor(private companyService: CompanyService, private bookingService: BookingService) { }

  ngOnInit(): void {
    
    this.getBookingByReg();

    this.bookingService.getTotalBookings().subscribe((res:any) =>{
      this.booking = res;
      // console.log(this.booking)
    });
    
    
  }

  async getBookingByReg()
  {
    this.bookingService.getTotalBookingsByReg().subscribe((res:any) =>{
      this.bookingByReg = res;
      // console.log(this.bookingByReg)

      this.bookingByReg.forEach(element => {

           let temp = parseInt(element.numbooking)
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
          name: "Bookings",
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
        text: "Booked Vehicles per month",
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
