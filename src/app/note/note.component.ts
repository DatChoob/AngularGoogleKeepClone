import { Component, OnInit, Input } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  constructor(
    private db: AngularFirestore,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      "edit",
      sanitizer.bypassSecurityTrustResourceUrl("assets/img/icon/edit-24px.svg")
    );
  }

  @Input()
  note: any;

  ngOnInit() {}
}
