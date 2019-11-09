import { Component, OnInit } from '@angular/core';
import * as iban from 'iban';
import * as moment from 'moment';
import { BackendService } from '../backend.service';
@Component({ selector: 'app-antrag', templateUrl: './antrag.component.html', styleUrls: ['./antrag.component.scss'] })
export class AntragComponent implements OnInit {
  input: {
    iban: string;
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
    geschlecht: 'Divers';
    beruf: true;
    teilnameart: true;
  };

  validIban;
  btrgMntl = 0;
  btrgJrl = 0;
  agree = false;

  constructor(public backend: BackendService) {
    const rs = iban.isValid('hello world');
    const rs2 = iban.isValid('BE68539007547034');
    console.log(rs);
  }

  ngOnInit() {}

  isAdult() {
    if (this.input.geb_jahr && this.input.geb_monat && this.input.geb_tag) {
      const date = moment(new Date(this.input.geb_monat + '.' + this.input.geb_tag + '.' + this.input.geb_jahr));
      const currDate = moment(new Date());

      const diffYears = currDate.diff(date, 'years');
      return diffYears > 15;
    }

    return true;
  }

  calcMntl() {
    let value = 0;

    if (!this.input.teilnameart) {
      return 0;
    }

    if (this.input.type_selbst) {
      value += this.isAdult() && this.input.beruf ? 18 : 15;
    }
    if (this.input.type_arnis) {
      value += this.isAdult() && this.input.beruf ? 18 : 15;
    }
    if (this.input.type_karate) {
      value += this.isAdult() && this.input.beruf ? 18 : 15;
    }
    return value;
  }
  calcJhrl() {
    let value = 0;
    if (!this.input.teilnameart) {
      value += 20;
    } else {
      value += 25;
    }
    return value;
  }
  checkMandatoryFields() {
    if (
      !this.input.vorname ||
      !this.input.nachname ||
      !this.input.ort ||
      !this.input.plz ||
      !this.input.strasse ||
      !this.input.geb_jahr ||
      !this.input.geb_monat ||
      !this.input.geb_tag ||
      !this.input.email ||
      !this.input.konto_geb_jahr ||
      !this.input.konto_geb_monat ||
      !this.input.konto_geb_tag ||
      !this.input.konto_vorname ||
      !this.input.konto_nachname ||
      !this.validIban
    ) {
      return false;
    }

    return true;
  }
  _validateIban() {
    this.validIban = iban.isValid(this.input.iban);
  }

  send() {
    this.backend.sendeAntrag({... this.input, btrgJrl: this.calcJhrl(), btrgMntl: this.calcMntl()}).subscribe(() => console.log('success'));
  }
}
