import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { AuthModule } from "./auth/auth.module";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/guards/auth.guard";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { StoryComponent } from "./posts/story/story.component";
import { CommentComponent } from "./posts/comment/comment.component";
import { LoadSpinnerComponent } from "./load-spinner/load-spinner.component";
import { CommentsComponent } from "./posts/comments/comments.component";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoryComponent,
    CommentComponent,
    LoadSpinnerComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:4200", "localhost:3000"],
        blacklistedRoutes: []
      }
    }),
    CollapseModule.forRoot()
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
