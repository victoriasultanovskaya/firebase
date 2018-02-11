import {Component, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    coursesObservable: Observable<any[]>;
    listObservable: FirebaseListObservable<any[]>;
    lists: FirebaseListObservable<any[]>;
    courseFirst: Observable<any>;
    author$: Observable<any>;

    constructor(private db: AngularFireDatabase) {
        this.coursesObservable = this.db.list('/courses')
            .valueChanges();

        this.courseFirst = this.db.object('/courses/learn-ionic3-from-scratch').valueChanges();

        this.author$ = this.db.object('/authors/1').valueChanges();

        this.listObservable = this.db.list('/list');

        this.lists = this.db.list('/list').valueChanges();
    }

    add(listItem) {
        this.listObservable.push({
            name: listItem.value,
            sections: {
                1 : {
                    name: 'X'
                }
            }
        });
        listItem.value = '';
    }
}
