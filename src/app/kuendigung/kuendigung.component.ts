import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { BackendService } from "../backend.service";

@Component({
  selector: "app-kuendigung",
  templateUrl: "./kuendigung.component.html",
  styleUrls: ["./kuendigung.component.scss"]
})
export class KuendigungComponent implements OnInit {
  public successOpen = false;
  public errorOpen = false;
  public effectiveDate;
  public agree_passive = false;
  public agree_active = false;
  public gebDatum = "";
  public input = {
    email: undefined,
    vorname: undefined,
    nachname: undefined,
    geb_jahr: undefined,
    geb_monat: undefined,
    geb_tag: undefined,
    zahler_vorname: undefined,
    zahler_nachname: undefined,
    zahler_geb_jahr: undefined,
    zahler_geb_monat: undefined,
    zahler_geb_tag: undefined,
    wechsel_passiv: false
  };
  constructor(public backend: BackendService) { }
  _clear() {
    this.agree_passive = false;
    this.agree_active = false;
    this.gebDatum = "";

    this.input = {
      email: undefined,
      vorname: undefined,
      nachname: undefined,
      geb_jahr: undefined,
      geb_monat: undefined,
      geb_tag: undefined,
      zahler_vorname: undefined,
      zahler_nachname: undefined,
      zahler_geb_jahr: undefined,
      zahler_geb_monat: undefined,
      zahler_geb_tag: undefined,
      wechsel_passiv: false
    };
  }
  calcDate() {
    let currDate = new Date();
    let currMonth = currDate.getMonth();
    // 3 monate frist
    let frist = 3;

    //wenn der derzeitige monat plus die frist nicht größer als Juni ist => kündigung möglich im juni diesen jahres
    if ((currMonth + frist) <= 5) {
      return "30.06." + currDate.getFullYear();
    } else if ((currMonth + frist) <= 11) {
      //wenn der derzeitige monat plus die frist nicht größer als Dezember ist => kündigung möglich im Dezember diesen jahres
      return "31.12." + currDate.getFullYear();
    } else {
      // kündigung im Juni des Folgejahrs
      return "30.06." + (currDate.getFullYear() + 1);
    }
  }
  validEmail(email) {
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email);
    return valid;
  }
  validDay(day) {
    if (day != undefined) {
      if (day > 0 && day <= 31) {
        return true;
      }
    }
    return false;
  }
  validMonth(month) {
    if (month != undefined) {
      if (month > 0 && month <= 12) {
        return true;
      }
    }
    return false;
  }
  gebDatumChanged(event) {
    let selectedDate = event.target.dateValue;
    this.input.geb_jahr = selectedDate.getFullYear();
    this.input.geb_monat = selectedDate.getMonth() + 1;
    this.input.geb_tag = selectedDate.getDate();
  }
  gebDatumZahlerChanged(event) {
    let selectedDate = event.target.dateValue;
    this.input.zahler_geb_jahr = selectedDate.getFullYear();
    this.input.zahler_geb_monat = selectedDate.getMonth() + 1;
    this.input.zahler_geb_tag = selectedDate.getDate();
  }
  checkMandatoryFields() {
    if (
      !this.input.vorname ||
      !this.input.nachname ||
      this.input.geb_jahr == undefined ||
      this.input.geb_jahr < 0 ||
      this.input.geb_monat == undefined ||
      !this.validMonth(this.input.geb_monat) ||
      this.input.geb_tag == undefined ||
      !this.validDay(this.input.geb_tag) ||
      !this.validEmail(this.input.email)
    ) {
      return false;
    }

    return true;
  }
  send() {
    this.backend
      .sendeKuendigung({
        ...this.input,
        effectiveDate: this.calcDate(),
        currentDate: moment(new Date()).format("DD.MM.YYYY")
      })
      .subscribe(
        () => {
          this.successOpen = true;
          this._clear();
        },
        () => {
          this.errorOpen = true;
        }
      );
  }
  ngOnInit() { }
}
