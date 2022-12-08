import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  FormBuilder: any;
  file: any;
  user!:any;
  public docx!:any[];
  idUrl!:any;
  licenceUrl! :any;
  // public docx1!:any[];

  UploadForm: FormGroup = new FormGroup({
    //id: new FormControl(''),
    identity: new FormControl(''),
    licence: new FormControl('')
  });
  
  submitted = false;

  constructor(private userService : UserService, private uploadService: UploadService, private toast: NgToastService, private router: Router, private http:HttpClient) { }

  //GET UPLOADS
  ngOnInit(): void {
    // this.uploadService.GetList().subscribe((res:any) => {
    //   this.docx = res;
    //   console.log(this.docx)
    // });
  }

  onFileChange(event :any)
{
  if(event.target.files.length>0)
  {
    this.file = event.target.files[0];

  }

}
 //UPLOAD-POST !!!!!
async uploadDocx(){    

  const formData = new FormData();    
  formData.append("file",this.file)    
  formData.append("upload_preset","sxnxtyof");     
  this.http.post('https://api.cloudinary.com/v1_1/dhtppljex/image/upload',formData).subscribe(async (res:any)=>{     
    

    
    this.idUrl =  await res.url;
    this.licenceUrl =  await res.url;

let uploadDetails = {
  //id: this.UploadForm.value.id,
  identity: res.url,
  licence: res.url,
}

    console.log('hello url',this.idUrl); 
    console.log('license', this.licenceUrl); 
    console.log(uploadDetails);


    this.uploadService.uploadDocx(uploadDetails).subscribe((next:any) => {
      console.log('Document added successfully!');
      this.router.navigate(['/profile']); //fix the carList, It should be uploadList!!!!!
      this.toast.success({detail:'Success',summary:'Document added successfully!', sticky:false,position:'tr', duration:6000})
    
      this.submitted = false;
    });
})  

}
//UPDATE DOCX - PUT
async updateDocx(){       
  const formData = new FormData();    
  formData.append("file",this.file)    
  formData.append("upload_preset","sxnxtyof");     
  this.http.post('https://api.cloudinary.com/v1_1/dhtppljex/image/upload',formData).subscribe(async (res:any)=>{     
    

    this.idUrl =  await res.url;
    this.licenceUrl =  await res.url;

    let uploadDetails = {
    //  id: this.EditUploadForm.value.id,
      identity: res.url,
      licence: res.url,
      

    }

    console.log(this.idUrl); 
    console.log(this.licenceUrl); 
    console.log(uploadDetails);

    this.uploadService.uploadDocx(uploadDetails).subscribe((next:any) => {
      console.log('Document updated successfully!');
      this.router.navigate(['/profile']); //fix the carList, It should be uploadList!!!!!
      this.toast.success({detail:'Success',summary:'Document updated successfully!', sticky:false,position:'tr', duration:6000})
    
      this.submitted = false;
    });

 })
}

}
