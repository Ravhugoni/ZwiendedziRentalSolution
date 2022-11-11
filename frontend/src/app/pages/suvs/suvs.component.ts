import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-suvs',
  templateUrl: './suvs.component.html',
  styleUrls: ['./suvs.component.scss']
})
export class SuvsComponent implements OnInit {

  public cars!: any[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {

    let carCategory = {
      category: "MINIBUSES"
    }

    this.productsService.GetCarsByCategory(carCategory).subscribe(res => {
      // this.cars = res
      console.log(res)
    }, (err) => {
      // this.toast.warning({detail:'Warning',summary:'Email or Password is invalid', sticky:true,position:'tr'})
    });

    this.productsService.GetList().subscribe((res:any) => {
      console.log(res)
    });
  }

}
