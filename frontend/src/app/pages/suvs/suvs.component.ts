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
    this.productsService.GetList().subscribe((res:any) => {
      let result = res;
      this.cars = result.filter(ress => (ress.category).toLowerCase() === ("SUV").toLowerCase())
      console.log(this.cars)
    });
  }

}
