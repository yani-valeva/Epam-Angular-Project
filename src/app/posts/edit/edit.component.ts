import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;

    this.httpClient.get('https://jsonplaceholder.typicode.com/posts/' + id)
      .pipe(map((res: any) => {
        return new Post(res);
      }))
      .subscribe((res: Post) => {
        this.profileForm = new FormGroup({
          title: new FormControl(res.title),
          description: new FormControl(res.body),
          userId: new FormControl(res.userId)
        });
        this.post = res;
      });
  }

  redirectToIndex() {
    this.router.navigate(['posts']);
  }

  updatePost(post) {
    let newPost = this.profileForm.value
    newPost.id = post.id;
    console.log(newPost, 'ys');
    if (newPost.title.length > 5 && newPost.description.length > 10 && !isNaN(Number(newPost.userId))) {
      this.httpClient.put('https://jsonplaceholder.typicode.com/posts/' + post.id, newPost)
        .subscribe((res: any) => {
          this.post = res;
        })

        this.router.navigate(['posts']);
      } else {
        alert('Please enter valid data!');
      }
  }
}