import { Plugins } from '@capacitor/core';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private _user = new BehaviorSubject<User>(null);
  private activeLogoutTimer: any;

  baseUrl = environment.apiUrl;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
    }));
  }

  get userId() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    }));
  }

  get token() {
    return this._user.asObservable().pipe(map(user => {
      if (user) {
        return user.token;
      } else {
        return null;
      }
    }));
  }

  constructor(private http: HttpClient) { }

  ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  }

  autoLogin() {
    return from(Plugins.Storage.get({key: 'authData'})).pipe(
      map(storedData => {
      if (!storedData || !storedData.value) {
        return null;
      }
      const parsedData = JSON.parse(storedData.value) as {
        token: string;
        tokenExpirationDate: string;
        userId: string;
        email: string;
      };
      const expirationTime = new Date(parsedData.tokenExpirationDate);
      if (expirationTime <= new Date()) {
        return null;
      }
      const user = new User(parsedData.userId, parsedData.email, parsedData.token, expirationTime);
      return user;
    }),
    tap(user => {
      if (user) {
        this._user.next(user);
        this.autoLogout(user.tokenDuration);
      }
    }),
    map(user => {
      return !!user;
    })
    );
  }

  private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.baseUrl + 'register/', {email: email, password: password, returnSecureToken: true});
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.baseUrl + 'login/', {email: email, password: password, returnSecureToken: true});
  }

  logout() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this._user.next(null);
    Plugins.Storage.remove({key: 'authData'});
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    const user = new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime
    );
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
  }


  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      tokenExpirationDate: tokenExpirationDate,
      email: email
    });
    Plugins.Storage.set({ key: 'authData', value: data });
  }
}
