import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from '../domain/customer';
import { CustomerService } from '../service/customerservice';
import { Product } from '../domain/product';
import { ProductService } from '../service/productservice';
import { Table } from 'primeng/table';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api'

@Component({
    templateUrl: './tabledemo.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss'],
    styles: [`
        :host ::ng-deep  .p-frozen-column {
            font-weight: bold;
        }

        :host ::ng-deep .p-datatable-frozen-tbody {
            font-weight: bold;
        }

        :host ::ng-deep .p-progressbar {
            height:.5rem;
        }
    `]
})
export class TableDemoComponent implements OnInit {

    customers1: Customer[];

    customers2: Customer[];

    customers3: Customer[];

    complaints: any[];

    selectedCustomers1: Customer[];

    selectedCustomer: Customer;

    representatives: Representative[];

    statuses: any[];

    products: Product[];

    rowGroupMetadata: any;

    expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    tableHeader: any;
    startRowIndex: number = 0;

    @ViewChild('dt') table: Table;

    @ViewChild('filter') filter: ElementRef;

    constructor(private customerService: CustomerService, private productService: ProductService, private messageService: MessageService, private confirmService: ConfirmationService, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'UI Kit' },
            { label: 'Table' }
        ]);
    }

    ngOnInit() {

        this.tableHeader = [
            { cellOptions: { cellWidth: '55px', align: "center" }, field: 'sn', header: 'Sr. No.' },
            { cellOptions: { cellWidth: '100px', align: "center" }, field: 'complaintId', header: 'Complaint ID' },
            { cellOptions: { cellWidth: '100px', align: "center" }, field: 'tenderId', header: 'Tender ID' },
            { cellOptions: { cellWidth: 'auto', align: "left" }, field: 'tendererName', header: 'Name of Tenderer / Consultant' },
            { cellOptions: { cellWidth: 'auto', align: "center" }, field: 'complaintType', header: 'Complaint Type' },
            { cellOptions: { cellWidth: 'auto', align: "left" }, field: 'complaintSubject', header: 'Complaint Subject' },
            { cellOptions: { cellWidth: 'auto', align: "center" }, field: 'complaintDt', header: 'Complaint Date and Time' },
            { cellOptions: { cellWidth: 'auto', align: "center" }, field: 'complaintStatus', header: 'Complaint Status' },
            { cellOptions: { cellWidth: 'auto', align: "center" }, field: 'lastModifiedDt', header: 'Last Modified Date and Time' },
            { cellOptions: { cellWidth: '70px', align: "center" }, field: 'peActions', header: 'Action' },
        ];

        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });

        this.customerService.getComplaintList().then(comp => {
            this.complaints = comp?.list;
            console.log(comp);
            this.loading = false;
        });


        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];
    }

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData.representative.name;

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData.representative.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => this.expandedRows[product.name] = true);

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getPeOptionMenuItem(dataRow: any) {

        let items: MenuItem[] = [];

        let processComplaint: MenuItem = {
            label: 'Process', id: 'processComplaint', disabled: !dataRow.process, icon: 'pi pi-caret-right', command: (event) => {
                this.processComplaint(dataRow);
            }
        };
        items.push(processComplaint);

        let complaintView: MenuItem = {
            label: 'View', id: 'linkComplaintView', disabled: !dataRow.view, icon: 'pi pi-eye', command: () => {
                this.goToComplaintView(dataRow);
            }
        };
        items.push(complaintView);
        let notificationFromCPTU: MenuItem = {
            label: 'Notification from CPTU', id: 'linkEscalateComplaintNextLevel', disabled: !dataRow.notificationFromCptu, icon: 'pi pi-caret-right', command: (event) => {
                this.goToNotificationFromCPTUPage(dataRow);
            }
        };
        items.push(notificationFromCPTU);

        // console.log("items->", items);
        return items;
    }

    processComplaint(complaint: any) {
        let action: string = (complaint.forward) ? 'forward' : 'All';
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Process Complaint' });

        console.log("processComplaint");
    }

    goToComplaintView(complaint: any) {
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Go To Complaint View' });
        console.log("goToComplaintView");
    }

    goToNotificationFromCPTUPage(complaint: any) {
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Go To Notification From CPTU Page' });
        console.log("goToNotificationFromCPTUPage");
    }

    getDateTimeinDisplayFormat(fromDate: any) {
        if (fromDate === '1900-01-01T00:00:00') return '--';
        if (fromDate != undefined || fromDate != '' || fromDate != null) {
            return fromDate;
        }
        return fromDate;
    }

}