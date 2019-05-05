import { Component } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import Note from "./model/note";
import { firestore } from "firebase/app";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  textAreaHeight: number = 80;
  notes$: Observable<Note[]>;

  newNote: Note = <Note>{
    title: "",
    text: ""
  };
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    this.notes$ = db
      .collection<Note>("notes", ref => ref.orderBy("timestamp", "desc"))
      .valueChanges();
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
      this.newNote.title = this.newNote.title.trim();
      this.newNote.text = this.newNote.text.trim();

      let docRef = await this.db.collection("notes").add(this.newNote);

      docRef.update({
        id: docRef.id,
        timestamp: firestore.FieldValue.serverTimestamp()
      });

      this.newNote.title = "";
      this.newNote.text = "";
      this.snackBar.open("Note Added", null, { duration: 1000 });
    }
  }

  ngAfterViewChecked() {
    this.resizeAllGridItems();
  }

  //recieved masonary code from https://gist.github.com/urkopineda/026023d70d1d1745297515abb145d5f3
  onResize() {
    this.resizeAllGridItems();
  }

  resizeGridItem(item) {
    var grid = document.getElementsByClassName("flex-container")[0];
    var rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
    );
    var rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
    );
    var rowSpan = Math.ceil(
      (item.querySelector(".card").getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    item.style.gridRowEnd = "span " + rowSpan;
  }

  resizeAllGridItems() {
    var allItems = document.getElementsByClassName("flex-item");
    for (var x = 0; x < allItems.length; x++) {
      this.resizeGridItem(allItems[x]);
    }
  }
}
