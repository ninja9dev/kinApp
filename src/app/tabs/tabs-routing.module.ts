import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'profiles',
        loadChildren: () => import('../profiles/profiles.module').then(m => m.ProfilesPageModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('../schedule/schedule.module').then(m => m.SchedulePageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../chats/chats.module').then(m => m.ChatsPageModule)
      },
      {
        path: 'homenew',
        loadChildren: () => import('../homenew/homenew.module').then(m => m.HomenewPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/profiles',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/profiles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
