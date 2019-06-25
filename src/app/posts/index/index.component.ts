import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from './../../posts';
import { map } from 'rxjs/internal/operators';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  items: Post[] = [];

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router) { }

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
        console.log(this.items,'ha')
      });
  }

  deletePost(postId) {
    this.items = this.items.filter(p => p.id !== postId);
  }

  viewDetails(post) {
    this.router.navigate(['posts/details/' + post.id]);
  }
}
