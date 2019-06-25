import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../post';
import { map } from 'rxjs/internal/operators';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  items: Post[] = [];

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
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

  deletePost(postId) {
    let result = confirm('Are you sure you want to delete this post?');

    if (result) {
      this.httpClient.delete('https://jsonplaceholder.typicode.com/posts/' + postId)
        .subscribe(() => {
          this.items = this.items.filter(p => p.id !== postId);
        });
    }
  }

  viewDetails(post) {
    this.router.navigate(['posts/details/' + post.id]);
  }

  addPost() {
    this.router.navigate(['posts/add']);
  }
}