import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CarsService } from 'src/app/services/cars.service';
import { CompanyService } from 'src/app/services/company.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {
  FormBuilder: any;
  file: any;
  
  public cars!:any[];
  imgUrl!:any;
  sub!:any;
  cid!:any;

  CarForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    // carName: new FormControl(''),
    carImg: new FormControl(''),
    model: new FormControl(''),
    numberPlate: new FormControl(''),
    make: new FormControl(''),
    price: new FormControl(''),
    companyID: new FormControl(''),
    category: new FormControl(''),
    status: new FormControl(''),
    fuelType: new FormControl(''),
    horsePower: new FormControl(''),
    speedPerSec: new FormControl(''),
    topSpeed: new FormControl('')
  });
  
  submitted = false;

  constructor(private carService:CarsService, private productsService:ProductsService, private toast: NgToastService, private compService:CompanyService,private router: Router,private route: ActivatedRoute, private http:HttpClient, private fb: FormBuilder, ) {
    
    this.productsService.GetList().subscribe((res:any) => {
      // this.bookings = res;
      let result = res;

      this.cars = result.filter(ress => String(ress.id) === String(this.cid))

      console.log(this.cars);

      console.log(this.cid);

        this.CarForm.setValue({  
          carName: this.cars[0].carName,
          // carImage: this.cars[0].carImage,
          model: this.cars[0].model,
          numberPlate: this.cars[0].numberPlate,
          make: this.cars[0].make,
          price: this.cars[0].price,
          companyID: this.cars[0].companyID,
          category: this.cars[0].category,
          status: this.cars[0].status,
          fuelType: this.cars[0].fuelType,
          horsePower: this.cars[0].horsePower,
          speedPerSec: this.cars[0].speedPerSec,
          topSpeed: this.cars[0].topSpeed
          }); 
 
    });
   }

   myForm() {
    this.CarForm = this.fb.group({
      carName: ['', [Validators.required ]],
      // carImg: ['', [Validators.required ]],
      model: ['', [Validators.required ]],
      numberPlate: new FormControl(''),
      make: ['', [Validators.required ]],
      price: ['', [Validators.required ]],
      companyID: ['', [Validators.required ]],
      category: ['', [Validators.required ]],
      status: ['', [Validators.required ]],
      fuelType: ['', [Validators.required ]],
      horsePower: ['', [Validators.required ]],
      speedPerSec: ['', [Validators.required ]],
      topSpeed: ['', [Validators.required ]]
    });
  }
  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      return this.cid = params['id'];
    });

    console.log(this.cid)
    this.myForm();


  }

  onFileChange(event :any)
  {
      if(event.target.files.length>0)
      {
        this.file = event.target.files[0];

      }

  }
  EditCar()
  {


    let carDetails = {
      carName: this.CarForm.value.carName,
      // carImage: res.url,
      model: this.CarForm.value.model,
      numberPlate: this.CarForm.value.numberPlate,
      make: this.CarForm.value.make,
      price: this.CarForm.value.price,
      companyID: this.CarForm.value.companyID,
      category: this.CarForm.value.category,
      status: this.CarForm.value.status,
      fuelType: this.CarForm.value.fuelType,
      horsePower: this.CarForm.value.horsePower,
      speedPerSec: this.CarForm.value.speedPerSec,
      topSpeed: this.CarForm.value.topSpeed

    }

    console.log(carDetails);

    this.productsService.updateCar(Number(this.cid), carDetails).subscribe((next:any) => {
      this.router.navigate(['/carlist']);
      this.toast.success({detail:'Success',summary:'Successfully Updated!', sticky:false,position:'tr', duration:6000})
      this.submitted = false;
    });

  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.CarForm.controls;
  }

}
