import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleComponent } from './pages/index/title/title.component';
import { CardComponent } from './pages/portfolio/card/card.component';
import { NotFoundComponent } from './pages/not-found/not-found/not-found.component';

const routes: Routes = [
  {path:'' , component: TitleComponent, pathMatch:'full'},
  {path:'portfolio', component: CardComponent, pathMatch:'prefix'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
