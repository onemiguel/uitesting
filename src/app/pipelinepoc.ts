import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'pipeline-poc',
  templateUrl: './pipelinepoc.html',
  styleUrls: ['./pipelinepoc.scss'],
})
export class PipelinePoc implements OnInit {
  dataSource: MatTableDataSource<PipelineItem> =
    new MatTableDataSource<PipelineItem>(PIPELINE_DATA);
  ngOnInit(): void {}
  applyTableFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  tableKeydown(event: any, row: any): void {}

  renderStatusName(status:any) : string {
    return ItemStatus[status];
  }
  getClassName(status:any) : string {
    let itemStatus:ItemStatus = status as ItemStatus;
    return `${ItemStatus[itemStatus].toLowerCase()}`;
    
  }

  TableDefinition = {
    tableColumns: [
      {
        columnDef: 'itemName',
        header: 'Name',
        cell: (item: PipelineItem) => `${item.itemName}`,
      },
      {
        columnDef: 'itemDevStatus',
        header: 'Dev Status',
        cell: (item: PipelineItem) => `${item.itemDevStatus}`,
      },
      {
        columnDef: 'publishEnabled',
        header: '',
        cell: (item: PipelineItem) => !item.publishEnabled
      },

      {
        columnDef: 'itemProdStatus',
        header: 'Prod Status',
        cell: (item: PipelineItem) => `${item.itemProdStatus}`,
      },
    ],
  };
  displayedColumns = this.TableDefinition.tableColumns.map((c) => c.columnDef);
}

export enum ItemStatus {
  Synced,
  Modified,
  Deleted,
  NotFound,
  InProgress,
}

export class PipelineItem {
  itemName: string;
  itemDevStatus: ItemStatus;
  itemProdStatus: ItemStatus;
  public get publishEnabled(): boolean {
    if(this.itemDevStatus != ItemStatus.Synced) {
      return true;
    }
    return false;
  }
  constructor(itemName:string, itemDevStatus:ItemStatus, itemProdStatus:ItemStatus) {
    this.itemName = itemName;
    this.itemDevStatus = itemDevStatus;
    this.itemProdStatus = itemProdStatus;
  }


}

const PIPELINE_DATA: PipelineItem[] = [
  new PipelineItem('Enrich_D2K', ItemStatus.Synced, ItemStatus.Synced),
  new PipelineItem('Test-Mipa001', ItemStatus.Deleted, ItemStatus.Synced),
  new PipelineItem('MasterSnowCase2', ItemStatus.Modified, ItemStatus.NotFound),
  new PipelineItem('MetadataByAsset', ItemStatus.Modified, ItemStatus.Synced),
  new PipelineItem('AzSecPackSearch', ItemStatus.InProgress, ItemStatus.Synced)
];
