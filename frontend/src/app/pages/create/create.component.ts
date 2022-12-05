import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { CompanyService } from '../../services/company.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  FormBuilder: any;
  file: any;
  company!:any;
  public cars!:any[];
  imgUrl!:any;

  CarForm: FormGroup = new FormGroup({
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
  
  submitted = false;

  constructor(private companyService: CompanyService, private carService:CarsService, private toast: NgToastService, private compService:CompanyService,private router: Router, private http:HttpClient) {
    
   }

  ngOnInit(): void {

    this.companyService.GetList().subscribe((res:any) => {
      this.company = res;
    });
}

onFileChange(event :any)
{
  if(event.target.files.length>0)
  {
    this.file = event.target.files[0];

  }

}

  async postCar(){       
    const formData = new FormData();    
    formData.append("file",this.file)    
    formData.append("upload_preset","sxnxtyof");     
    this.http.post('https://api.cloudinary.com/v1_1/dhtppljex/image/upload',formData).subscribe(async (res:any)=>{     
      

      this.imgUrl =  await res.url;

      let carDetails = {
        carName: this.CarForm.value.carName,
        carImage: res.url,
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
  
      console.log(this.imgUrl); 
      console.log(carDetails);

      this.carService.postCar(carDetails).subscribe((next:any) => {
        console.log('Car has been added successfully!');
        this.router.navigate(['/carlist']);
        this.toast.success({detail:'Success',summary:'Car has been added successfully!', sticky:false,position:'tr', duration:6000})
      
        this.submitted = false;
      });
})  

  }

  


}

