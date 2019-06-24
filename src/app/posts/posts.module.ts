import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { PostsRoutingModule } from './posts-routing.module';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [IndexComponent, ViewComponent, EditComponent],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})

export class PostsModule { }
