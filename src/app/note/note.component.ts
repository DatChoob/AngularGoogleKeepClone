import { Component, OnInit, Input } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { DomSanitizer } from "@angular/platform-browser";
import Note from "../model/note";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  @Input()
  note: Note;

  editing: boolean = false;
  textAreaHeight: number = 40;
  noteRef: AngularFirestoreDocument<Note>;

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "edit",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icon/edit-24px.svg")
    );

    iconRegistry.addSvgIcon(
      "delete",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/img/icon/delete-24px.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "save",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icon/save-24px.svg")
    );
  }

  ngOnInit() {
    this.noteRef = this.db.collection("notes").doc(this.note.id);
  }

  adjustTextAreaHeight(e: HTMLElement) {
    this.textAreaHeight = e.scrollHeight;
  }

  turnOnEditMode() {
    this.editing = true;
  }

  delete() {
    this.db.firestore.runTransaction(async () => {
      this.noteRef.delete();
    });
    this.snackBar.open("Note Deleted", null, { duration: 1000 });
  }

  save() {
    this.editing = false;
    this.db.firestore.runTransaction(() => this.noteRef.update(this.note));
    this.snackBar.open("Note Saved", null, { duration: 1000 });
  }
}
