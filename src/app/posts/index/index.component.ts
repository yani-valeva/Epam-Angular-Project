import { Component, OnInit } from '@angular/core';
import { Post } from './../../posts';
import { map } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  items: Post[] = [];

  constructor(private httpClient: HttpClient) { }

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

}
