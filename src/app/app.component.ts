import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;

    constructor(private af: AngularFireDatabase) {
        /**
         * @see https://github.com/angular/angularfire2/blob/master/docs/rtdb/lists.md
         * @type {AngularFireList<any>}
         */
        this.itemsRef = af.list('list');
        // Use snapshotChanges().map() to store the key
        this.items = this.itemsRef.snapshotChanges().map(changes => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
        });
    }

    addItem(newitem) {
        this.itemsRef.push({name: newitem.value});
        newitem.value = '';
    }

    updateItem(key: string, newText: string) {
        this.itemsRef.update(key, {name: newText});
    }

    deleteItem(key: string) {
        this.itemsRef.remove(key);
    }

    deleteEverything() {
        this.itemsRef.remove();
    }
}
