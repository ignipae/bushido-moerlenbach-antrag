import {Component, OnInit} from '@angular/core';
import * as iban from "iban";
import * as moment from 'moment';
@Component({selector: 'app-antrag', templateUrl: './antrag.component.html', styleUrls: ['./antrag.component.scss']})
export class AntragComponent implements OnInit {
  iban : string;
  validIban;
  btrgMntl = 0;
  btrgJrl = 0;
  agree = false;
  konto_vorname;
  konto_nachname;
  konto_geb_tag;
  konto_geb_monat;
  konto_geb_jahr;
  anmerkungen;
  type_selbst;
  type_arnis;
  type_karate;
  email;
  privat_telefon;
  mobil;
  telfax;
  geb_jahr;
  geb_monat;
  geb_tag;
  plz;
  ort;
  strasse;
  vorname;
  nachname;
  geschlecht = "Divers";
  beruf = true;
  teilnameart = true;
  constructor() {
    let rs = iban.isValid('hello world');
    let rs2 = iban.isValid('BE68539007547034');
    console.log(rs);
  }

  ngOnInit() {}

  isAdult() {
    if (this.geb_jahr && this.geb_monat && this.geb_tag) {
      let date = moment(new Date(this.geb_monat + "." + this.geb_tag + "." + this.geb_jahr));
      let currDate = moment(new Date());

      let diffYears = currDate.diff(date, "years");
      return diffYears > 15;

    }

    return true;
  }

  calcMntl() {
    let value = 0;

    if (!this.teilnameart) {
      return 0;
    }

    if (this.type_selbst) {
      value += this.isAdult() && this.beruf
        ? 18
        : 15;
    }
    if (this.type_arnis) {
      value += this.isAdult() && this.beruf
        ? 18
        : 15;
    }
    if (this.type_karate) {
      value += this.isAdult() && this.beruf
        ? 18
        : 15;
    }
    return value;
  }
  calcJhrl() {
    let value = 0;
    if (!this.teilnameart) {
      value += 20;
    } else {
      value += 25;
    }
    return value;
  }
  checkMandatoryFields() {
    if (!this.vorname || !this.nachname || !this.ort || !this.plz || !this.strasse || !this.geb_jahr || !this.geb_monat || !this.geb_tag || !this.email || !this.konto_geb_jahr || !this.konto_geb_monat || !this.konto_geb_tag || !this.konto_vorname || !this.konto_nachname || !this.validIban) {
      return false;
    }

    return true;
  }
  _validateIban() {
    this.validIban = iban.isValid(this.iban);
  }

}
