import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})

export class PostsModule { }
