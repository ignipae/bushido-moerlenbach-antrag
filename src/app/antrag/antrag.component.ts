import { Component, OnInit } from "@angular/core";
import * as iban from "iban";
import * as moment from "moment";
import { BackendService } from "../backend.service";
import { CostsConfig, CostCalculator } from "../shared/config/costs.config";
@Component({
  selector: "app-antrag",
  templateUrl: "./antrag.component.html",
  styleUrls: ["./antrag.component.scss"]
})
export class AntragComponent implements OnInit {
  successOpen = false;
  errorOpen = false;
  kontoGebDatum = "";
  input = {
    iban: undefined,
    konto_vorname: undefined,
    konto_nachname: undefined,
    konto_geb_tag: undefined,
    konto_geb_monat: undefined,
    konto_geb_jahr: undefined,
    anmerkungen: undefined,
    type_selbst: false,
    type_arnis: false,
    type_karate: false,
    email: undefined,
    privat_telefon: undefined,
    mobil: undefined,
    telfax: undefined,
    geb_jahr: undefined,
    geb_monat: undefined,
    geb_tag: undefined,
    plz: undefined,
    ort: undefined,
    strasse: undefined,
    vorname: undefined,
    nachname: undefined,
    geschlecht: "Divers",
    beruf: true,
    teilnameart: true
  };

  validIban;
  btrgMntl = 0;
  btrgJrl = 0;
  agree = false;

  constructor(public backend: BackendService) { }

  _clear() {
    this.kontoGebDatum = "";
    this.validIban = undefined;
    this.agree = false;
    this.input = {
      iban: undefined,
      konto_vorname: undefined,
      konto_nachname: undefined,
      konto_geb_tag: undefined,
      konto_geb_monat: undefined,
      konto_geb_jahr: undefined,
      anmerkungen: undefined,
      type_selbst: false,
      type_arnis: false,
      type_karate: false,
      email: undefined,
      privat_telefon: undefined,
      mobil: undefined,
      telfax: undefined,
      geb_jahr: undefined,
      geb_monat: undefined,
      geb_tag: undefined,
      plz: undefined,
      ort: undefined,
      strasse: undefined,
      vorname: undefined,
      nachname: undefined,
      geschlecht: "Divers",
      beruf: true,
      teilnameart: true
    };
  }
  ngOnInit() {
    this._clear();
  }
  kontoGebDatumChanged(event) {
    let selectedDate = event.target.dateValue;
    this.input.konto_geb_jahr = selectedDate.getFullYear();
    this.input.konto_geb_monat = selectedDate.getMonth() + 1;
    this.input.konto_geb_tag = selectedDate.getDate();
  }
  gebDatumChanged(event) {
    let selectedDate = event.target.dateValue;
    this.input.geb_jahr = selectedDate.getFullYear();
    this.input.geb_monat = selectedDate.getMonth() + 1;
    this.input.geb_tag = selectedDate.getDate();
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
  isAdult() {
    if (this.input.geb_jahr && this.input.geb_monat && this.input.geb_tag) {
      const date = moment(
        new Date(
          this.input.geb_monat +
          "." +
          this.input.geb_tag +
          "." +
          this.input.geb_jahr
        )
      );
      const currDate = moment(new Date());

      const diffYears = currDate.diff(date, "years");
      return diffYears > 15;
    }

    return true;
  }

  calcMntl() {
    return CostCalculator.calculateMonthlyCost(
      this.input.teilnameart,
      this.isAdult() || this.input.beruf,
      {
        karate: this.input.type_karate,
        selbst: this.input.type_selbst,
        arnis: this.input.type_arnis
      }
    );
  }
  calcJhrl() {
    return CostCalculator.calculateAnnualCost(this.input.teilnameart);
  }
  getRegistrationFee() {
    return CostCalculator.getRegistrationFee();
  }
  checkMandatoryFields() {
    if (
      !this.input.vorname ||
      !this.input.nachname ||
      !this.input.ort ||
      !this.input.plz ||
      !this.input.strasse ||
      this.input.geb_jahr == undefined ||
      this.input.geb_jahr < 0 ||
      this.input.geb_monat == undefined ||
      !this.validMonth(this.input.geb_monat) ||
      this.input.geb_tag == undefined ||
      !this.validDay(this.input.geb_tag) ||
      !this.validEmail(this.input.email) ||
      this.input.konto_geb_jahr == undefined ||
      this.input.konto_geb_jahr < 0 ||
      this.input.konto_geb_monat == undefined ||
      !this.validMonth(this.input.konto_geb_monat) ||
      this.input.konto_geb_tag == undefined ||
      !this.validDay(this.input.konto_geb_tag) ||
      !this.input.konto_vorname ||
      !this.input.konto_nachname ||
      !this.validIban
    ) {
      return false;
    }

    return true;
  }
  activeAndSelectedSport() {
    if (!this.input.teilnameart) {
      return true;
    } else if (
      this.input.teilnameart &&
      (this.input.type_arnis ||
        this.input.type_karate ||
        this.input.type_selbst)
    ) {
      return true;
    }
    return false;
  }
  _validateIban() {
    this.validIban = iban.isValid(this.input.iban);
  }

  send() {
    this.backend
      .sendeAntrag({
        ...this.input,
        btrgJrl: this.calcJhrl(),
        btrgMntl: this.calcMntl()
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
}
