import { Injectable } from '@angular/core';
import { Database, query } from '@angular/fire/database';
import { equalTo, get, orderByChild, push, ref, set } from 'firebase/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

now = Date.now()
 private dbPath = `/students` ;

  constructor(private db: Database) { }

  // Register student
  async register(student: any) {


    const studentsRef = ref(this.db, this.dbPath);

    const phoneQuery = query(studentsRef, orderByChild('contact'), equalTo(student.contact));
    const snapshot = await get(phoneQuery);

    // Check if a student with same name + contact already exists
    const exists =
      snapshot.exists() &&
      Object.values(snapshot.val()).some(
        (s: any) => s.name?.trim().toLowerCase() === student.name?.trim().toLowerCase()
      );

    if (exists) {
      console.log('Duplicate student found');
      return { success: true, message: 'A student with the same name and contact already exists.' };
    }
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
