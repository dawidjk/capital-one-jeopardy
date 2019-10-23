import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Clue } from '../models/clue';
// key that is used to access the data in local storageconst STORAGE_KEY = 'local_todolist';
@Injectable()
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {}
  
  public addFavorite(clue: Clue[], key: string): void {
    this.storage.set(key, clue);
    console.log(this.storage.get(key) || 'Local storage is empty');
  }

  public getFavorites(key: string): Clue[] {
    return this.storage.get(key) || [];
  }
}
