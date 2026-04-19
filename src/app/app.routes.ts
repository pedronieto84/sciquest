import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'chemistry',
    loadComponent: () => import('./features/chemistry/chemistry.component').then(m => m.ChemistryComponent),
    canActivate: [authGuard],
  },
  {
    path: 'quantum',
    loadComponent: () => import('./features/quantum/quantum.component').then(m => m.QuantumComponent),
    canActivate: [authGuard],
  },
  {
    path: 'nuclear',
    loadComponent: () => import('./features/nuclear/nuclear.component').then(m => m.NuclearComponent),
    canActivate: [authGuard],
  },
  {
    path: 'newtonian',
    loadComponent: () => import('./features/newtonian/newtonian.component').then(m => m.NewtonianComponent),
    canActivate: [authGuard],
  },
  {
    path: 'quiz',
    loadComponent: () => import('./features/quiz/quiz.component').then(m => m.QuizComponent),
    canActivate: [authGuard],
  },
  {
    path: 'competition',
    loadComponent: () => import('./features/competition/competition.component').then(m => m.CompetitionComponent),
    canActivate: [authGuard],
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./features/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'home' },
];
