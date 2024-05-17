import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;

  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem("crud");
      if (localData != null) {
        this.studentList = JSON.parse(localData)
      }
    }
  }

  openModel() {
    if (this.modal != undefined && this.modal.nativeElement != null) {
      this.modal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    this.studentObj = new Student();
    if (this.modal != undefined && this.modal.nativeElement != null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Student) {
    const isDelete = confirm("Are you sure want to Delete");
    if(isDelete) {
      const currentRecord = this.studentList.findIndex(m=> m.id === this.studentObj.id);
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem('crud', JSON.stringify(this.studentList));
    }
  }
  
  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }

  updateStudent() {
    const currentRecord = this.studentList.find(m=> m.id === this.studentObj.id);
    if(currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.mobileNumber = this.studentObj.mobileNumber;
      currentRecord.city = this.studentObj.city;
      currentRecord.state = this.studentObj.state;
      currentRecord.email = this.studentObj.email;
      currentRecord.pincode = this.studentObj.pincode;
    };
    localStorage.setItem('crud',JSON.stringify(this.studentList));
    this.closeModal();
  }

  saveStudent() {
    debugger;
    if (typeof window !== 'undefined') {
      const isLocalPresent = localStorage.getItem("crud");
      if (isLocalPresent != null) {
        const oldArray = JSON.parse(isLocalPresent);
        this.studentObj.id = oldArray.length + 1;
        oldArray.push(this.studentObj);
        this.studentList = oldArray;
        localStorage.setItem('crud', JSON.stringify(oldArray));
      } else {
        const newArr = [];
        newArr.push(this.studentObj);
        this.studentObj.id = 1;
        this.studentList = newArr;
        localStorage.setItem('crud', JSON.stringify(newArr));
      }
      this.closeModal()
    }
  }
}

export class Student {
  id: number;
  name: string;
  mobileNumber: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNumber = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}
