import { Component, OnInit, Input } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import Note from "../model/note";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  ngOnInit() {
    this.noteRef = this.db.collection("notes").doc(this.note.id);
  }
  editing: boolean = false;

  noteRef: AngularFirestoreDocument<Note>;
  constructor(
    private db: AngularFirestore,
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

  @Input()
  note: Note;

  turnOnEditMode() {
    this.editing = true;
  }

  delete() {
    this.noteRef.delete();
  }

  save() {
    this.editing = false;
    this.noteRef.update(this.note);
  }
}
