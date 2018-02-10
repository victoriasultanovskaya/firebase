import {Component, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    coursesObservable: Observable<any[]>;
    courseFirst: Observable<any>;

    constructor(private db: AngularFireDatabase) {
        this.coursesObservable = this.db.list('/courses')
            .valueChanges();

        this.courseFirst = this.db.object('/courses/learn-ionic3-from-scratch').valueChanges();
    }
}
