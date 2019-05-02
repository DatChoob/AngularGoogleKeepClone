import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import Note from "./model/note";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  textAreaHeight: number = 80;
  notes: Observable<Note[]>;

  newNote: Note = <Note>{
    title: "",
    text: ""
  };
  constructor(
    private db: AngularFirestore,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.notes = db.collection<Note>("notes").valueChanges();
    iconRegistry.addSvgIcon(
      "add",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icon/add-24px.svg")
    );
  }

  textAreaChanged(e) {
    this.textAreaHeight = e.scrollHeight;
  }

  async onSubmit() {
    if (this.newNote.title.trim() != "" && this.newNote.text.trim() != "") {
      let docRef = await this.db.collection("notes").add(this.newNote);
      docRef.update({ id: docRef.id });
      this.newNote.title = "";
      this.newNote.text = "";
    }
  }
}
