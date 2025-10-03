import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { get, push, ref, set } from 'firebase/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

now = Date.now()
 private dbPath = `/students/${this.now}` ;

  constructor(private db: Database) { }

  // Register student
  register(student: any) {
    const studentsRef = ref(this.db, this.dbPath);
    const newRef = push(studentsRef);
    return set(newRef, { ...student, autoId: newRef.key });
  }

  // Get all users
  getUsers(): Observable<any[]> {
    return new Observable(observer => {
      const studentsRef = ref(this.db, this.dbPath);
      get(studentsRef).then(snapshot => {
        const data = snapshot.val();
        const arr = data ? Object.values(data) : [];
        observer.next(arr);
      }).catch(err => observer.error(err));
    });
  }

  // Login check
  loginCheck(contact: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.getUsers().subscribe(users => {
        const user = users.find((u: any) => u.contact === contact && u.password === password);
        observer.next(user || null);
      });
    });
  }
}
