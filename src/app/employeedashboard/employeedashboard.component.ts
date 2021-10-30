import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { ApiService } from '../shared/api.service';
import { emps } from '../shared/emp.model';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.scss']
})
export class EmployeedashboardComponent implements OnInit {
data:any
showAddBtn!:boolean;
showUpdateBtn!:boolean;
  constructor(private formbuilber:FormBuilder,public api:ApiService) { 

 
  }
  emObj:emps=new emps()
  formValue!:FormGroup;
  ngOnInit(): void {
    this.formValue=this.formbuilber.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phonenum:[''],
      salary:['']
    })
   
this.getemp()
  }

  onSubmit(){
   this.emObj.firstName=this.formValue.value.firstName
   this.emObj.lastName=this.formValue.value.lastName
   this.emObj.email=this.formValue.value.email
   this.emObj.phonenum=this.formValue.value.phonenum
   this.emObj.salary=this.formValue.value.salary
    this.api.postEmploye(this.emObj).subscribe((datas)=>{
    console.log(datas) 
    let ref=document.getElementById('cancel')
    ref?.click()
    this.formValue.reset()
    this.getemp()
    })
     
  }

  getemp(){
    this.api.getEmploye().subscribe((datas)=>{
      this.data=datas
     })}


   delete(item:any){
     this.api.delet(item.id).subscribe((dat)=>{
       this.getemp()
     })
   }
   addbtn(){
    this.showAddBtn=true;
this.showUpdateBtn=false;
   }
   editbtn(item:any){
   this.showAddBtn=false;
 this.showUpdateBtn=true;
     this.emObj.id=item.id; 
     this.formValue.controls["firstName"].setValue(item.firstName)
     this.formValue.controls["lastName"].setValue(item.lastName)
     this.formValue.controls["email"].setValue(item.email)
     this.formValue.controls["phonenum"].setValue(item.phonenum)
     this.formValue.controls["salary"].setValue(item.salary)
   }
   updatebtn(){
     
    this.emObj.firstName=this.formValue.value.firstName
    this.emObj.lastName=this.formValue.value.lastName
    this.emObj.email=this.formValue.value.email
    this.emObj.phonenum=this.formValue.value.phonenum
    this.emObj.salary=this.formValue.value.salary

     this.api.update(this.emObj,this.emObj.id).subscribe((res)=>{
      let ref=document.getElementById('cancel')
      ref?.click()
      this.formValue.reset()
      this.getemp()
     })
   }
}


