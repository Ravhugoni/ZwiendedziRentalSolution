import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { CompanyService } from '../../services/company.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-car-prod',
  templateUrl: './car-prod.component.html',
  styleUrls: ['./car-prod.component.scss']
})
export class CarProdComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  EditCarForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    carName: new FormControl(''),
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

  public cars:any;
  submitted = false;
  isEditClicked: boolean = true;
  position = 0;
  updateValue = '';
  pos: any;
  fb: any;
  file: any;
  imgUrl: any;


  constructor(private productsService:ProductsService, private compService:CompanyService, 
    private spinnerService: NgxSpinnerService, private http:HttpClient, private toast: NgToastService) {
    
   }

  //  myForm() {
  //       this.EditCarForm = this.fb.group({
  //         carName: ['', [ Validators.required ]],
  //         lastname: ['', [ Validators.required ]],
  //         email: ['', [Validators.required, Validators.email]],
  //         phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
  //         firstname: ['', [ Validators.required ]],
  //         lastname: ['', [ Validators.required ]],
  //         email: ['', [Validators.required, Validators.email]],
  //         phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
  //         firstname: ['', [ Validators.required ]],
  //         lastname: ['', [ Validators.required ]],
  //         email: ['', [Validators.required, Validators.email]],
  //         phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
  //       });
  company: any;
  cid!:number;
  id!:any;

  

  ngOnInit(): void {

    this.productsService.GetList().subscribe((res:any) => {
      this.cars=res;
    
      this.dtTrigger.next(this.cars);

      if(this.cars!= undefined)
      {
        this.EditCarForm.setValue({
          firstname: this.cars[0].firstname,
          lastname: this.cars[0].lastname,
          email: this.cars[0].email,
          phone: this.cars[0].phone
        })
      }

    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu : [5, 10, 25],
      processing: true
     };

  }
    onFileChange(event :any)
    {
        if(event.target.files.length>0)
        {
          this.file = event.target.files[0];

        }

    }

    async updateCar(){       
      const formData = new FormData();    
      formData.append("file",this.file)    
      formData.append("upload_preset","sxnxtyof");     
      this.http.post('https://api.cloudinary.com/v1_1/dhtppljex/image/upload',formData).subscribe(async (res:any)=>{     
        
  
        this.imgUrl =  await res.url;
  
        let carDetails = {
          id: this.EditCarForm.value.id,
          carName: this.EditCarForm.value.carName,
          carImage: res.url,
          model: this.EditCarForm.value.model,
          numberPlate: this.EditCarForm.value.numberPlate,
          make: this.EditCarForm.value.make,
          price: this.EditCarForm.value.price,
          companyID: this.EditCarForm.value.companyID,
          category: this.EditCarForm.value.category,
          status: this.EditCarForm.value.status,
          fuelType: this.EditCarForm.value.fuelType,
          horsePower: this.EditCarForm.value.horsePower,
          speedPerSec: this.EditCarForm.value.speedPerSec,
          topSpeed: this.EditCarForm.value.topSpeed
    
        }

        console.log(this.imgUrl); 
        console.log(carDetails);
  
        // this.productsService.updateCar(this.id,carDetails).subscribe((next:any) => {
        //   console.log('Car has been successfully edited!');
        //   this.submitted = false;
        // });
     })
    }


  deleteCar(id: any){
      this.productsService.deleteCar(id).subscribe((res:any) => {
        this.cars=res;
        this.toast.success({detail:'success',summary:'Successfully Deleted!', sticky:false,position:'tr', duration:6000})
        console.log(id);
      })
    }

    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
    showSpinner(): void {
      this.spinnerService.show();
  
      setTimeout(() => {
        this.spinnerService.hide();
      }, 1000); // 2 seconds
    }
}  
