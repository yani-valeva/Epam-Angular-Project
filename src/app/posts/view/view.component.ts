import { Component, OnInit } from '@angular/core';
import { Post } from './../../posts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  items: Post[] = [];
  id: number = Number(window.location.href.split('/').slice(-1).pop());

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/posts/'+this.id)
    .subscribe((res: Post[]) => {
      this.items = res;
    });
  }
}
