import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../post';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  post: Post;
  profileForm = null;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;

    this.httpClient.get('https://jsonplaceholder.typicode.com/posts/' + id)
      .pipe(map((res: any) => {
        return new Post(res);
      }))
      .subscribe((res: Post) => {
        this.profileForm = this.formBuilder.group({
          title: [res.title, [Validators.required, Validators.minLength(5)]],
          description: [res.body, [Validators.required, Validators.minLength(10)]],
          userId: [res.userId, [Validators.required, Validators.pattern("^[0-9]*$")]]
        });

        this.post = res;
      });
  }

  redirectToIndex() {
    this.router.navigate(['posts']);
  }

  onSubmit() {
    let newPost = this.profileForm.value;

    if (this.profileForm.valid) {
      this.httpClient.put('https://jsonplaceholder.typicode.com/posts/' + this.post.id, newPost)
        .subscribe((res: any) => {
          this.post = res;
          this.router.navigate(['posts']);
        })
      } else {
        alert('Please enter valid data!');
      }
  }
}