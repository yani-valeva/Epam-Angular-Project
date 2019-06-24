import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
    {
        path: 'posts',
        children: [
            {
                path: '',
                component: IndexComponent
            },
            // {
            //     path: 'edit/:id',
            //     component: EditComponent
            // }

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
