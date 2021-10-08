import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
    // path: '',
    // redirectTo: 'folder/Inbox',
    // pathMatch: 'full'
  // },
    {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
 
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'credit',
    loadChildren: () => import('./credit/credit.module').then( m => m.CreditPageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./home2/home2.module').then( m => m.Home2PageModule)
  },

  {
    path: 'profiles',
    loadChildren: () => import('./profiles/profiles.module').then( m => m.ProfilesPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'chats',
    loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'addnewcall',
    loadChildren: () => import('./addnewcall/addnewcall.module').then( m => m.AddnewcallPageModule)
  },
  {
    path: 'viewprofile',
    loadChildren: () => import('./viewprofile/viewprofile.module').then( m => m.ViewprofilePageModule)
  },
  {
    path: 'callwait',
    loadChildren: () => import('./callwait/callwait.module').then( m => m.CallwaitPageModule)
  },
  {
    path: 'homenew',
    loadChildren: () => import('./homenew/homenew.module').then( m => m.HomenewPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./members/contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'calllist',
    loadChildren: () => import('./members/calllist/calllist.module').then( m => m.CalllistPageModule)
  },
  {
    path: 'add-contact',
    loadChildren: () => import('./members/add-contact/add-contact.module').then( m => m.AddContactPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./members/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'memberschedule',
    loadChildren: () => import('./members/memberschedule/memberschedule.module').then( m => m.MemberschedulePageModule)
  },
  {
    path: 'addcall',
    loadChildren: () => import('./members/addcall/addcall.module').then( m => m.AddcallPageModule)
  },
  {
    path: 'chats2',
    loadChildren: () => import('./members/chats2/chats2.module').then( m => m.Chats2PageModule)
  },
  {
    path: 'addmembers',
    loadChildren: () => import('./addmembers/addmembers.module').then( m => m.AddmembersPageModule)
  },
  {
    path: 'add-contact2',
    loadChildren: () => import('./add-contact2/add-contact2.module').then( m => m.AddContact2PageModule)
  },
  {
    path: 'chat-room',
    loadChildren: () => import('./chat-room/chat-room.module').then( m => m.ChatRoomPageModule)
  },
  {
    path: 'userlist',
    loadChildren: () => import('./userlist/userlist.module').then( m => m.UserlistPageModule)
  },
  {
    path: 'reschedule',
    loadChildren: () => import('./reschedule/reschedule.module').then( m => m.ReschedulePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'videocall',
    loadChildren: () => import('./videocall/videocall.module').then( m => m.VideocallPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
