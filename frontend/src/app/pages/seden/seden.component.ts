import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/cars/cars';
import { ProductsService } from 'src/app/services/products.service';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-seden',
  templateUrl: './seden.component.html',
  styleUrls: ['./seden.component.scss']
})
export class SedenComponent implements OnInit {

  public cars!: any[];
  car: Cars = {
    carImage: '',
    model: '',
    numberPlate: '',
    make: '',
    price: 0,
    companyID: 0,
    category: '',
    status: '',
    fuelType: '',
    horsePower: 0,
    speedPerSec: 0,
    topSpeed: 0
  };
  

  constructor(private productsService: ProductsService, private carService:CarsService) { }

  ngOnInit(): void {
    this.productsService.GetList().subscribe((res:any) => {
      let result = res;
      this.cars = result.filter(ress => ress.category === "SEDEN")
      console.log(this.cars)
    });

  }
  deleteCar(id:number){
    this.carService.deleteCar(id).subscribe(res => {
         this.car = this.car['filter'](item => item.id !== id);
    })
  }
}
