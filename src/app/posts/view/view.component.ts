import { Component, OnInit } from '@angular/core';
import { Post } from '../../post';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  post: Post;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    
    this.httpClient.get('https://jsonplaceholder.typicode.com/posts/' + id)
      .pipe(map((res: any) => {
        return new Post(res);
      }))
      .subscribe((res: Post) => {
        this.post = res;
      });
  }
}