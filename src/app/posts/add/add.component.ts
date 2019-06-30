import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      userId: new FormControl('')
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
    const postsCount = this.items.length;
    let newPost = this.profileForm.value;
    newPost.id = this.items[postsCount - 1].id + 1;
    if (newPost.title.length > 5 && newPost.description.length > 10 && !isNaN(Number(newPost.userId))) {
      this.httpClient.post('https://jsonplaceholder.typicode.com/posts', newPost)
        .subscribe((res: Post[]) => {
          this.items = res;
          this.router.navigate(['posts']);
        });
    }
  }
}
