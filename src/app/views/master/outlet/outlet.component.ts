import { AfterContentInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service'
import { Subject } from 'rxjs';
import { FORM_STATUS } from '../../../constants/libraries/form-status';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Page } from '../../../models/page';
import { ACTION } from '../../../constants/libraries/action';
import { BtnActionComponent } from 'src/app/core/btn-action/btn-action.component';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.scss']
})
export class OutletComponent implements AfterContentInit, OnInit {

  title: string = 'Master Outlet';
  @ViewChild('btnAction') btnAction: TemplateRef<BtnActionComponent>;

  visibleFilter: boolean = false;
  loading: boolean = false;
  CreateUpdateForm: FormGroup;
  formStatus: string;

  outletTypes: any[] = [];
  regions: any[] = [];
  areas: any[] = [];
  status: any[] = [
    {
      code: 'A',
      name: 'Active'
    },
    {
      code: 'I',
      name: 'Inactive'
    }
  ];
  selectedOutletType: any = '';
  selectedRegion: any = '';
  selectedArea: any = '';

  dtOptions: DataTables.Settings = {};
  selectedRowData: any;
  dtColumns: any = [];
  page = new Page();

  constructor(
    private formBuilder: FormBuilder,
    private appSvc: AppService
  ) { }

  dtPageChange(event: any) {
    this.selectedRowData = undefined;
    $.fn['dataTable'].ext.search.pop();
  }

  ngOnInit(): void {
    this.initForm();
    this.initFilter();
  }

  ngAfterContentInit(): void {
    this.initTable();
  }

  initForm(): void {
    this.CreateUpdateForm = this.formBuilder.group({
      // todo, create your form
    });
  }

  initFilter(): void {
    
  }

  initTable(): void {
    const mapData = (resp: any) => {
      return resp.data.map((item: any, index: number) => {
        const { rn, ...rest } = item;
        return {
          ...rest,
          dtIndex: this.page.start + index + 1,
          dateCreate: item.dateCreate,
          timeCreate: item.timeCreate,
          dateUpdate: item.dateUpdate,
          timeUpdate: item.timeUpdate,
        };
      });
    };

    const handleButtonClick = (action: string, data: any) => {
      switch (action) {
        case ACTION.EDIT:
          this.formStatus = FORM_STATUS.UPDATE;
          break;
        case ACTION.DELETE:
          this.formStatus = FORM_STATUS.DELETE;
          break;
      }
      const openModalButton = document.getElementById("openModalButton");
      if (openModalButton instanceof HTMLButtonElement) {
        openModalButton.click();
      }
    };

    this.dtOptions = {
      processing: true,
      serverSide: true,
      autoWidth: true,
      info: true,
      drawCallback: () => {
        this.selectedRowData = undefined;
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.page.start = dataTablesParameters.start;
        this.page.length = dataTablesParameters.length;
        // this.appSvc
        //   .post(AppServiceType.MASTER_OUTLET, dataTablesParameters)
        //   .subscribe((resp: any) => {
        //     const mappedData = mapData(resp);
        //     this.page.recordsTotal = resp.recordsTotal;
        //     this.page.recordsFiltered = resp.recordsFiltered;
        //     callback({
        //       recordsTotal: resp.recordsTotal,
        //       recordsFiltered: resp.recordsFiltered,
        //       data: mappedData,
        //     });
        //   });
      },
      columns: [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'regionCode', title: 'REGION CODE', orderable: true, searchable: true },
        // { data: 'regionName', title: 'REGION NAME', orderable: true, searchable: true },
        { data: 'areaCode', title: 'AREA CODE', orderable: true, searchable: true },
        // { data: 'areaName', title: 'AREA NAME', orderable: true, searchable: true },
        { data: 'outletCode', title: 'OUTLET CODE', orderable: true, searchable: true },
        { data: 'outletName', title: 'OUTLET NAME', orderable: true, searchable: true },
        { data: 'initialOutlet', title: 'INITIAL', orderable: true, searchable: true },
        { data: 'type', title: 'TYPE', orderable: true, searchable: true },
        { data: 'status', title: 'STATUS', orderable: true, searchable: true },
        {
          data: 'dtIndex',
          title: 'ACTIONS',
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: any) => {
            return `
              <div class="button-action">
                <button class="action-edit"><i class="fa fa-pencil"></i> Edit</button>
                <button class="action-delete"><i class="fa fa-trash"></i> Delete</button>
              </div>
            `;
          },
        }
      ],
      searchDelay: 1500,
      order: [[1, 'asc']],
      rowCallback: (row: Node, data: any, index: number) => {
        $('.action-edit', row).on('click', () => handleButtonClick(ACTION.EDIT, data));
        $('.action-delete', row).on('click', () => handleButtonClick(ACTION.DELETE, data));
        return row;
      },
    };

    this.dtColumns = this.dtOptions.columns;
  }

  onCreateClicked() {
    this.formStatus = FORM_STATUS.CREATE;
  }

  onEditClicked(value: any) {
    this.formStatus = FORM_STATUS.UPDATE;
    this.CreateUpdateForm.patchValue(value);
  }

  onDeleteClicked(value: any) {

  }

  onFilterChange(type: any = undefined): void {
    this.initTable();
    if (type == 'region') {
      const params = {
        region_code: this.selectedRegion
      }
      // this.appSvc.post(AppServiceType.MASTER_AREA, params).subscribe(response => {
      //   this.areas = response?.data || [];
      // });
    }
  }

  getModalTitle(): string {
    return (this.formStatus == FORM_STATUS.CREATE ? 'Create New' : (this.formStatus == FORM_STATUS.UPDATE ? 'Update' : 'Delete')) + ' ' + this.title;
  }

  onSubmitForm() {
    const valid = this.CreateUpdateForm.valid;
    if (valid) {
      const body = this.CreateUpdateForm.getRawValue();
      // todo, create data;
    } else {
      alert('Terdapat data yang belum valid');
    }
  }

  onCancelClicked() {
    this.CreateUpdateForm.reset();
  }
}

