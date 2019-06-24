import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    {
        path: 'posts',
        children: [
            {
                path: '',
                component: IndexComponent
            },
            {
                path: 'details/:id',
                component: ViewComponent
            },
            {
                path: 'edit/:id',
                component: EditComponent
            }

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
