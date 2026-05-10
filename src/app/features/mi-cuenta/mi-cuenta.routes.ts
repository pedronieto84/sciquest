import { Routes } from '@angular/router';

export const MI_CUENTA_ROUTES: Routes = [
  { path: '', redirectTo: 'amigos', pathMatch: 'full' },
  {
    path: 'amigos',
    loadComponent: () => import('./amigos/amigos.component').then(m => m.AmigosComponent),
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent),
  },
  {
    path: 'chat/:friendUid',
    loadComponent: () => import('./chat/chat-room/chat-room.component').then(m => m.ChatRoomComponent),
  },
  {
    path: 'buscar-amigos',
    loadComponent: () => import('./buscar-amigos/buscar-amigos.component').then(m => m.BuscarAmigosComponent),
  },
  {
    path: 'progreso',
    loadComponent: () => import('./progreso/progreso.component').then(m => m.ProgresoComponent),
  },
];
