import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { map, take, switchMap, from, of } from 'rxjs';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const firestore = inject(Firestore);

  return user(auth).pipe(
    take(1),
    switchMap(u => {
      if (!u) {
        router.navigate(['/auth']);
        return of(false);
      }

      // If navigating to username-setup, allow it (don't loop)
      const targetPath = route.routeConfig?.path;
      if (targetPath === 'username-setup') {
        // But if they already have a username, send them home
        return from(getDoc(doc(firestore, `users/${u.uid}`))).pipe(
          map(snap => {
            const data = snap.data() as any;
            if (data?.username) {
              router.navigate(['/home']);
              return false;
            }
            return true;
          })
        );
      }

      // For all other protected routes, check if user has username
      return from(getDoc(doc(firestore, `users/${u.uid}`))).pipe(
        map(snap => {
          const data = snap.data() as any;
          if (!data?.username) {
            router.navigate(['/username-setup']);
            return false;
          }
          return true;
        })
      );
    })
  );
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    take(1),
    map(u => {
      if (!u) return true;
      router.navigate(['/home']);
      return false;
    })
  );
};
