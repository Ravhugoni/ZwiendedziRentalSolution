import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from 'src/app/services/company.service';
import { ProductsService } from 'src/app/services/products.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    companyID: new FormControl(''),
    pickup_date: new FormControl(new Date()),
    dropoff_date: new FormControl('')
  });

  decoded: any;

  submitted = false;
  public searchedDIV = false;
  typeSelected: String;

  public cars!: any[];
  company!: any[];
  currentDate: string;

  constructor(private productsService: ProductsService, private companyService:CompanyService, private search: SearchService, private fb: FormBuilder, private toast: NgToastService, private spinnerService: NgxSpinnerService) { 
    this.typeSelected = 'ball-scale-multiple';
  }

  myForm() {
    this.searchForm = this.fb.group({
      companyID: ['', [Validators.required]],
      pickup_date: ['', [ Validators.required ]],
      dropoff_date: ['', [ Validators.required ]]
    });
  }

  ngOnInit(): void {

    this.showSpinner();
    this.currentDate = new Date().toISOString().slice(0, 10);
    // this.currentDate = new Date();

    console.log(this.currentDate);
    this.myForm()
    this.companyService.GetList().subscribe((res:any) => {
      this.company = res;
    });
  }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  searchbtn(){

    this.showSpinner();

    this.submitted = true;

    if(this.searchForm.value.pickup_date < this.currentDate)
    {
      this.toast.warning({detail:'Warning',summary:'Pickup date wont be less than todays date', sticky:false,position:'tr', duration:3000})
    }
    else{

      if(this.searchForm.value.dropoff_date > this.searchForm.value.pickup_date)
      {
        if(this.searchForm.value.pickup_date != '' && this.searchForm.value.pickup_date != null && this.searchForm.value.dropoff_date != '' && this.searchForm.value.dropoff_date != null)
        {
          this.searchedDIV = true;
  
          if(this.searchForm.value.companyID != '', this.searchForm.value.companyID != null){
            var data;
            data = {
              pickup_date:this.searchForm.value.pickup_date,
              dropoff_date:this.searchForm.value.dropoff_date
            }
            console.log('without id ',data)
            this.search.GetAvailable(data).subscribe((res:any) => {
              console.log(res)
              this.cars = res
            })
          }
          else{
            var data;
            data = {
              companyID:this.searchForm.value.companyID,
              pickup_date:this.searchForm.value.pickup_date,
              dropoff_date:this.searchForm.value.dropoff_date
            }
            this.search.GetAvailableByCampany(data).subscribe((res:any) => { 
              console.log("with id ",res)
              this.cars = res
            })
          }
        }
  
      }
      else{
        this.toast.warning({detail:'Warning',summary:'Pickup date wont be less than todays date', sticky:false,position:'tr', duration:3000})
      }
    }
  }

  showSpinner(): void {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000); // 2 seconds
  }

}
