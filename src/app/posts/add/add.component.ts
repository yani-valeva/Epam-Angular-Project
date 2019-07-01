import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../post';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  profileForm = null;
  items: Post[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      userId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });

    this.httpClient.get('https://jsonplaceholder.typicode.com/posts/')
      .pipe(map((res: any) => {
        let items = [];
        res.map((item: any) => {
          items.push(new Post(item));
        });

        return items;
      }))
      .subscribe((res: Post[]) => {
        this.items = res;
      });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.httpClient.post('https://jsonplaceholder.typicode.com/posts', this.profileForm.value)
        .subscribe((res: Post[]) => {
          this.items = res;
          this.router.navigate(['posts']);
        });
    }
  }
}
