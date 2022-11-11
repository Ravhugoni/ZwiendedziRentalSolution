import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-seden',
  templateUrl: './seden.component.html',
  styleUrls: ['./seden.component.scss']
})
export class SedenComponent implements OnInit {

  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    let carCategory = {
      category: "SEDEN"
    }

    this.productsService.GetCarsByCategory(carCategory).subscribe(res => {
      // this.cars = res
      console.log(res)
    }, (err) => {
      // this.toast.warning({detail:'Warning',summary:'Email or Password is invalid', sticky:true,position:'tr'})
    });

  }
}
