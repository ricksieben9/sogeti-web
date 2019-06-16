import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MedicineService} from '../../service/medicine.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  list: any;
  modalRef: BsModalRef;
  errorMsg: ErrorMsg = new  ErrorMsg();
  medicine: Medicine = new Medicine();

  constructor(private medicineService: MedicineService, private modalService: BsModalService) { }

  openModalAdd(template: TemplateRef<any>) {
    this.errorMsg = new ErrorMsg();
    this.medicine = new Medicine();
    this.modalRef = this.modalService.show(template);
  }
  openModalAlter(template: TemplateRef<any>, med: Medicine) {
    this.errorMsg = new ErrorMsg();
    this.medicine.id = med.id;
    this.medicine.name = med.name;
    this.medicine.description = med.description;
    this.medicine.unit = med.unit;
    this.modalRef = this.modalService.show(template);
  }
  openModalView(template: TemplateRef<any>, med: Medicine) {
    this.medicine = med;
    this.modalRef = this.modalService.show(template);
  }
  openModalDelete(template: TemplateRef<any>, med: Medicine) {
    this.errorMsg = new ErrorMsg();
    this.medicine.id = med.id;
    this.medicine.name = med.name;
    this.modalRef = this.modalService.show(template);
  }

  getMedicine() {
    const medicineObservable = this.medicineService.getAllMedicine();
    medicineObservable.subscribe((data: any[]) => {
      this.list = data;
    });
  }

  onSave() {
    this.errorMsg.name = !this.medicine.name ? 'Naam vereist' : '';
    this.errorMsg.unit = !this.medicine.unit ? 'Eenheid vereist' : '';
    if (!this.medicine.name || !this.medicine.unit) {
      return;
    } else {
      this.medicineService.addMedicine(this.medicine).subscribe(res => {
        this.getMedicine();
        this.modalRef.hide();
      }, error => {
        this.errorMsg.name = error.error['response'];
      });
    }
  }

  onAlter() {
    this.errorMsg.name = !this.medicine.name ? 'Naam vereist' : '';
    this.errorMsg.unit = !this.medicine.unit ? 'Eenheid vereist' : '';
    if (!this.medicine.name || !this.medicine.unit) {
      return;
    } else {
      this.medicineService.updateMedicine(this.medicine).subscribe(res => {
        this.getMedicine();
        this.modalRef.hide();
      }, error => {
        this.errorMsg.name = error.error['response'];
      });
    }
  }

  onDelete(med: Medicine) {
    this.medicineService.deleteMedicine(med).subscribe(res => {
      this.getMedicine();
      this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
  }

  ngOnInit() {
    this.getMedicine();
  }
}

class Medicine {
  id: string;
  name: string;
  description: string;
  unit: string;
}
class ErrorMsg {
  name: string;
  unit: string;
}
