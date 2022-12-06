import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { CompanyService } from '../../services/company.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-car-prod',
  templateUrl: './car-prod.component.html',
  styleUrls: ['./car-prod.component.scss']
})
export class CarProdComponent implements OnInit {

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


  constructor(private productsService:ProductsService, private compService:CompanyService, private http:HttpClient, private toast: NgToastService) {
    
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
      // let result = res;
      // console.log(result)
      // this.cars = result.filter(ress => ress.category === "SEDAN")
      console.log(this.cars)

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
  
  // updateCar(carData: any, index: any): void {

  //   this.isEditClicked = !this.isEditClicked;
  //   this.position = index;
  //   this.updateValue = carData;
  //   this.pos = index;
  // }

  // completeCar(carData: any, i: any, update: string): void {
  //   console.log(carData, i, update);
  //   this.cars.splice(i,1,update);
  //   console.log(this.cars);
  //   /*this.isEditClicked = false;*/
  //   this.isEditClicked = !this.isEditClicked;
  //   /*this.pos = taskData+i;*/
  // }

  deleteCar( id: number){
    this.productsService.deleteCar(parseInt(this.id)).subscribe((res:any) => {
      this.cars=res;
      this.toast.success({detail:'success',summary:'Successfully Deleted!', sticky:false,position:'tr', duration:6000})
      console.log(id);
    })
    //this.cars.pop(carDetails);
    
  }
  // updateCar(){
  //   this.productsService.updateCar(this.id,this.cars).subscribe((res:any) => {
  //     this.cars=res;
  //     console.log(this.cars)
  //   });

  // }





// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgToastService } from 'ng-angular-popup';
// import { Users } from 'src/app/model/users';
// import { UserService } from 'src/app/services/user.service';

// @Component({
//   selector: 'app-edit-user',
//   templateUrl: './edit-user.component.html',
//   styleUrls: ['./edit-user.component.scss']
// })


// export class EditUserComponent implements OnInit {



//   EditUserForm: FormGroup = new FormGroup({
//     firstname: new FormControl(),
//     lastname: new FormControl(),
//     phone: new FormControl(),
//     email: new FormControl()
//   });
//   id!:any;
//   uid!:any;
//   sub!:any;
//   users!:Users;

//   submitted = false;

//   public usertype: any;
 
//   constructor(private userServive:UserService, private router: Router,private route: ActivatedRoute, private toast: NgToastService, public fb: FormBuilder) { }

//   myForm() {
//     this.EditUserForm = this.fb.group({
//       firstname: ['', [ Validators.required ]],
//       lastname: ['', [ Validators.required ]],
//       email: ['', [Validators.required, Validators.email]],
//       phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
//     });
//   }

//   ngOnInit(): void {

//     this.myForm();

//     this.sub = this.route.params.subscribe(params => {
//       return this.uid = params['id'];
//     });

//     console.log(this.uid);

//     this.userServive.GetAllUsers().subscribe((res:any) => {
//         let result = res;
//         this.users = result.filter(ures => String(ures.id) === String(this.uid))
//         console.log(this.users)

//         if(this.users!= undefined)
//         {
//           this.EditUserForm.setValue({
//             firstname: this.users[0].firstname,
//             lastname: this.users[0].lastname,
//             email: this.users[0].email,
//             phone: this.users[0].phone
//           })
//         }
//     })


//   }

//   get formValidation(): { [key: string]: AbstractControl } {
//     return this.EditUserForm.controls;
//   }

  
//   UpdateUser()
//   {
//     // let id=localStorage.getItem('user_id');
//     // console.log(id)
//       this.submitted = true;

//       if(this.EditUserForm.value.firstname != '')
//       {
//         let userDetails = {
//           firstname:this.EditUserForm.value.firstname,
//           lastname: this.EditUserForm.value.lastname,
//           email: this.EditUserForm.value.email,
//           phone: this.EditUserForm.value.phone
//         }
    
//         console.log(userDetails);
    
//         this.userServive.updateUser(this.uid, userDetails).subscribe((next) => {
//             // console.log('Successfully Updated!');
//             this.openSuccess();
//             this.router.navigate(['/users']);
 
//             this.toast.success({detail:'success',summary:'Successfully Updated!', sticky:false,position:'tr', duration:6000})
//             this.submitted = false;
//           });
//       }
//       else
//       {
//         console.log('Successfully UNUpdated!');
//         this.openWarning();
//       }
   
//   }

//   openWarning(){
//     this.toast.warning({detail:'Warning',summary:'Please fill in all the fields...!', sticky:true,position:'tr'})
//   }
//   openSuccess(){
//     this.toast.success({detail:'Success',summary:'Successfully updated!', sticky:true,position:'tr'})
//   }
// }
  }  
