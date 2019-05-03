import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NoteComponent } from "./note/note.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, NoteComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    MatFormFieldModule,
    AngularFirestoreModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
