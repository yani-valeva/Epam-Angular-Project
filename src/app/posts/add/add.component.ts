import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  profileForm = null;

  constructor() { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      userId: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
