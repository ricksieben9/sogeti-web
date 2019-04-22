import {Component, OnInit, TemplateRef, ViewChild, AfterViewInit} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {IntakeMomentService} from '../../../service/intake-moment.service';
import {IntakeMoment_medicines} from '../../../_models/intake_moment_medicine';
import {UsersService} from '../../../service/users.service';
import {PriorityService} from '../../../service/priority.service';
import {FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import {IntakeMoment} from '../../../_models/intakeMoment';
import {ErrorMsg} from '../../../_models/errorMsg';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-intakemoment-detail',
  templateUrl: './intakemoment-detail.component.html',
  styleUrls: ['./intakemoment-detail.component.scss']
})
export class IntakemomentDetailComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  medicines: any;
  intakemoments: any;
  dispensers: any;
  priorities: any;
  intakeMoment: IntakeMoment = new IntakeMoment();
  errorMsg: ErrorMsg = new  ErrorMsg();
  modalRef: BsModalRef;
  id: number;

  intakeForm = new FormGroup({
    medicinesForm : new FormArray([
      new FormGroup({
        medicines: new FormControl('', Validators.required),
        time_window: new FormControl('', Validators.required),
        dosage: new FormControl('', Validators.required)
      })
    ])
  });

  constructor(private intakeMomentService: IntakeMomentService,
              private userService: UsersService,
              private priorityService: PriorityService,
              private route: ActivatedRoute,
              private location: Location,
              private modalService: BsModalService,
              private modal: NgbModal) { }

  ngOnInit() {
    this.getIntakeMomentsOfReceiver();
  }

  // get the intakemoments of the selected receiver
  getIntakeMomentsOfReceiver() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.intakeMomentService.getIntakeMomentOfReceiver(this.id)
      .subscribe(intakemoments => {
                  this.intakemoments = intakemoments; });
  }

  getData() {

    const roles = { roleList: ['Toediener', 'Hoofdtoediener'] };
    // get dispensers from API
    const userObservable = this.userService.getUsersByRoles(roles);
    userObservable.subscribe((userData: any[]) => {
      this.dispensers = userData;
    });

    // get priorities from API
    const priorityObservable = this.priorityService.getAllPriorities();
    priorityObservable.subscribe((priorityData: any[]) => {
      this.priorities = priorityData;
    });
  }

  // view: CalendarView = CalendarView.Month;

  // CalendarView = CalendarView;

  // viewDate: Date = new Date();

  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // };

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fa fa-fw fa-pencil"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     }
  //   },
  //   {
  //     label: '<i class="fa fa-fw fa-times"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter(iEvent => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     }
  //   }
  // ];

  // refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  // activeDayIsOpen: boolean = true;

  // dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
  //   if (isSameMonth(date, this.viewDate)) {
  //     this.viewDate = date;
  //     if (
  //       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
  //       events.length === 0
  //     ) {
  //       this.activeDayIsOpen = false;
  //     } else {
  //       this.activeDayIsOpen = true;
  //     }
  //   }
  // }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map(iEvent => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  // handleEvent(action: string, event: CalendarEvent): void {
  //   this.modalData = { event, action };
  //   this.modal.open(this.modalContent, { size: 'lg' });
  // }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true
  //       }
  //     }
  //   ];
  // }

  // deleteEvent(eventToDelete: CalendarEvent) {
  //   this.events = this.events.filter(event => event !== eventToDelete);
  // }

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  // closeOpenMonthViewDay() {
  //   this.activeDayIsOpen = false;
  // }






  openModalAddIntakemoment(template: TemplateRef<any>) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment = new IntakeMoment();
    this.getData();
    this.modalRef = this.modalService.show(template);
  }

  openModalEditIntakemoment(template: TemplateRef<any>, intake: IntakeMoment) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment.intake_start_time = intake.intake_start_time;
    this.intakeMoment.intake_end_time = intake.intake_end_time;
    this.intakeMoment.priority_number = intake.priority_number;
    this.intakeMoment.dispenser = intake.dispenser;
    this.intakeMoment.remark = intake.remark;
    // this.intakeMoment.name = rec.name;
    this.modalRef = this.modalService.show(template);
  }

  openModalDeleteIntakemoment(template: TemplateRef<any>, intake: IntakeMoment) {
    this.errorMsg = new ErrorMsg();
    this.intakeMoment.id = intake.id;
    this.intakeMoment.receiver_id = intake.receiver_id;
    this.modalRef = this.modalService.show(template);
  }

  onSave() {
    if (!this.intakeMoment.intake_start_time && !this.intakeMoment.intake_end_time &&
      !this.intakeMoment.priority_number && !this.intakeMoment.dispenser) {
      return;
    } else {
      this.intakeMomentService.addIntakeMoment(this.intakeMoment).subscribe(res => {
        this.getIntakeMomentsOfReceiver();
        this.modalRef.hide();
        console.log(res);
      }, error => {
         console.log(error);
         this.errorMsg.name = error.error['response'];
       });
    }
  }

  onAlter() {
    // !this.intakeMoment.name ? this.errorMsg.name = 'Naam vereist' : '';
    // if (!this.intakeMoment.name) {
    //   return;
    // } else {
    //   this.intakeMomentService.updateIntakeMoment(this.intakeMoment).subscribe(res => {
    //     this.getReceivers();
    //     this.modalRef.hide();
    //     console.log(res);
    //   }, error => {
    //     console.log(error);
    //     this.errorMsg.name = error.error['response'];
    //   });
    // }
  }

  deleteIntakeMoment(intake: IntakeMoment) {
    this.intakeMomentService.deleteIntakeMoment(this.id, intake).subscribe(res => {
      this.getIntakeMomentsOfReceiver();
       this.modalRef.hide();
    }, error => {
      this.errorMsg.name = error.error['response'];
    });
  }

}

