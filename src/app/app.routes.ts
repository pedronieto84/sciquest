import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth.component').then(m => m.AuthComponent),
    canActivate: [guestGuard],
  },
  {
    path: 'username-setup',
    loadComponent: () => import('./features/username-setup/username-setup.component').then(m => m.UsernameSetupComponent),
    canActivate: [authGuard],
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
    path: 'biology',
    loadComponent: () => import('./features/biology/biology.component').then(m => m.BiologyComponent),
    canActivate: [authGuard],
  },
  {
    path: 'astronomy',
    loadComponent: () => import('./features/astronomy/astronomy.component').then(m => m.AstronomyComponent),
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
    path: 'pasapalabra',
    loadComponent: () => import('./features/pasapalabra/pasapalabra.component').then(m => m.PasapalabraComponent),
    canActivate: [authGuard],
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('./features/leaderboard/leaderboard.component').then(m => m.LeaderboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'onboarding',
    loadComponent: () => import('./features/onboarding/onboarding.component').then(m => m.OnboardingComponent),
    canActivate: [authGuard],
  },
  {
    path: 'mi-cuenta',
    loadComponent: () => import('./features/mi-cuenta/mi-cuenta.component').then(m => m.MiCuentaComponent),
    loadChildren: () => import('./features/mi-cuenta/mi-cuenta.routes').then(m => m.MI_CUENTA_ROUTES),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'landing' },
];
