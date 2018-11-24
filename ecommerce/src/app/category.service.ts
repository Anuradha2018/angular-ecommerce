// import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
// import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories').snapshotChanges()
    .pipe(
      map(categories => {
        return categories.map(c => ({
          key: c.key,
          name: (<any>c.payload.val()).name
        }));
      })
    );
    }
  }

