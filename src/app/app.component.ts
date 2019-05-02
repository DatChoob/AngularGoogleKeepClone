import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  textAreaHeight: number = 80;
  notes: Observable<any[]>;

  newNote = {
    title: "",
    text: ""
  }
  constructor(private db: AngularFirestore,iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.notes = db.collection('notes').valueChanges();
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icon/add-24px.svg'));
  }

  textAreaChanged(e) {
    this.textAreaHeight = e.scrollHeight;
  }


  onSubmit() {
    if (this.newNote.title.trim() != "" && this.newNote.text.trim() != "") {
      this.db.collection('notes').add(this.newNote)
      this.newNote.title="";
      this.newNote.text="";
    }
  }
}
