import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { APIService } from "src/app/services/HTTPServices/apiservice.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userData: any;
  constructor(private user: UserService, private apiSr:APIService, private authSr:AuthService) {}

  ngOnInit() {
    this.user.currentUserData.subscribe(userData => (this.userData = userData));
  }

  changeData(event:any) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }
  login(data:any) {
    this.user.changeData(data);
    console.log(data);
    this.apiSr.login(data["login"], data["password"]).subscribe(answer=>{
      console.log("LOGIN ok, token:")
      console.log(answer.Authorization)
      this.authSr.login(answer.Authorization)

    });
  }
}
