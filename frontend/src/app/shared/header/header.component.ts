import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';

export interface car{
  
  carName:string;
  carImage:string;
  model:string;
  numberPlate:string;
  make:string;
  price:string;
  companyID:string;
  id:string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  carDetails : car[] =  [{carName:"",carImage:"",model:"",numberPlate:"",make:"",price:"",companyID:"",id:""}]

  constructor(private carServ:CarsService) { }

  ngOnInit(): void {

    this.carServ.GetCarsByCategory(this.carDetails).subscribe((result)=>{
      if(result.error) throw result.message
      else
      this.carDetails = result.data
    })
  }

}
