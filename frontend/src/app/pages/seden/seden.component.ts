import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-seden',
  templateUrl: './seden.component.html',
  styleUrls: ['./seden.component.scss']
})
export class SedenComponent implements OnInit {

  public cars!: any[];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.GetList().subscribe((res:any) => {
      let result = res;
      this.cars = result.filter(ress => (ress.category).toLowerCase() === ("SEDAN").toLowerCase())
      console.log(this.cars)
    });
  }

  goSomewhere(){

  }
}
