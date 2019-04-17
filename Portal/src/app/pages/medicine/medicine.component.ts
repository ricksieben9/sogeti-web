import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MedicinenService} from "../../service/medicinen.service";

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

  constructor(private medicineService: MedicinenService, private modalService: BsModalService) { }

  openModalAdd(template: TemplateRef<any>) {
    this.errorMsg = new ErrorMsg();
    this.medicine = new Medicine();
    this.modalRef = this.modalService.show(template);
  }

  onSave() {
    !this.medicine.name ? this.errorMsg.name = 'Naam vereist' : '';
    !this.medicine.unit ? this.errorMsg.name = 'Eenheid vereist' : '';
    if (!this.medicine.name || !this.medicine.unit) {
      return;
    } else {
      this.medicineService.addMedicine(this.medicine).subscribe(res => {
        // this.getMedicine();
        this.modalRef.hide();
        console.log(res);
      }, error => {
        console.log(error);
        this.errorMsg.name = error.error['response'];
      });
    }
  }
  ngOnInit() {
  }

  private getMedicine() {

  }
}

class Medicine {
  id: string;
  name: string;
  desc: string;
  unit: string;
}
class ErrorMsg {
  name: string;
}
