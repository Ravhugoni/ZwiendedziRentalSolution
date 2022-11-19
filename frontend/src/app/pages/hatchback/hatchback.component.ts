import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-hatchback',
  templateUrl: './hatchback.component.html',
  styleUrls: ['./hatchback.component.scss']
})
export class HatchbackComponent implements OnInit {

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    let carCategory = {
      category: "HATCHBACK"
    }

    this.productsService.GetCarsByCategory(carCategory).subscribe(res => {
      // this.cars = res
      console.log(res)
    }, (err) => {
      // this.toast.warning({detail:'Warning',summary:'Email or Password is invalid', sticky:true,position:'tr'})
    });

  }

}
