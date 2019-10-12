import {Component, OnInit} from '@angular/core';
import * as iban from "iban";
@Component({selector: 'app-antrag', templateUrl: './antrag.component.html', styleUrls: ['./antrag.component.scss']})
export class AntragComponent implements OnInit {
  iban : string;
  validIban;
  btrgMntl = 0;
  btrgJrl = 0;
  agree = false;
  constructor() {
    let rs = iban.isValid('hello world');
    let rs2 = iban.isValid('BE68539007547034');
    console.log(rs);
  }

  ngOnInit() {}

  _validateIban() {
    this.validIban = iban.isValid(this.iban);
  }

}
