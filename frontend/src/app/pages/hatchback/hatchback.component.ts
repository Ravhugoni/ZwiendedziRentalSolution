import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-hatchback',
  templateUrl: './hatchback.component.html',
  styleUrls: ['./hatchback.component.scss']
})
export class HatchbackComponent implements OnInit {

  public cars!: any[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.GetList().subscribe((res:any) => {
      let result = res;
      this.cars = result.filter(ress => (ress.category).toLowerCase() === ("HATCHBACK").toLowerCase())
      console.log(this.cars)
    });
  }

}
