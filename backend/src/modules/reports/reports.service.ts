import { Inject, Injectable } from '@nestjs/common';
import { saleReportDataDto, salesReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { IReports } from './Ireports';
import { MostSelledDataDto, MostSelledDto, MostSelledTroughTimeDataDto, MostSelledTroughTimeDto } from './dto/most-selled..dto';
import { Console } from 'console';
import { lowStockDto, products } from './dto/lowStock.dto';

@Injectable()
export class ReportsService {
  constructor(@Inject('IReports') private readonly reportsRepository: IReports) {}
  async salesTroughTime(salesReportDto: salesReportDto, companyId: number) {
    const salesResult = await this.reportsRepository.salesTroughTime(salesReportDto, companyId);
    const reportData = salesResult.map((entity: any) => saleReportDataDto.fromEntity(entity));
    return reportData;
  }

  async MostSelled(mostSelledDto: MostSelledDto, company_id: number) {
    const mostSelledResult = await this.reportsRepository.mostSelled(mostSelledDto, company_id);
    const reportData = mostSelledResult.map((entity: any) => MostSelledDataDto.fromEntity(entity));
    return reportData;
  }

  async MostSelledTroughTime(mostSelledDto: MostSelledTroughTimeDto, company_id: number) {
    
    const mostSelledResult = await this.reportsRepository.mostSelledTroughTime(mostSelledDto, company_id);

    //Obtenemos los periodos
    const dataSet = mostSelledResult.reduce((acc : {date: number[], name: string[]}, val : any)=> {
      const dateFounded = acc.date.find( (date) => date ===  new Date(val.periodo).getTime());
      const nameFounded = acc.name.find( (name) => name === val.name);
      if (!dateFounded){
        acc.date.push(new Date(val.periodo).getTime());
      }
      if (!nameFounded){
        acc.name.push(val.name);
      }
        return acc;
    }, {date: [], name: []} );

    dataSet.date.sort((a, b) => a - b);
    
    const data: any[]= [];
    //Organizamos cronologicamente y devolvemos los datos agrupados por producto.
    for (let i = 0 ; i < dataSet.date.length; i++) {
      const result = mostSelledResult.filter((entity: any) => new Date(entity.periodo).getTime() === dataSet.date[i]);
      const row: any = {
        date: new Date(dataSet.date[i]).toLocaleDateString(),
      }
      result.forEach((entity: any) => {
        row[`${entity.name}->profit`] = entity.ganancias;
        row[`${entity.name}->unitsSold`] = parseInt(entity.unidades_vendidas);
    });
      data.push(row);
    }

   return {
    name: dataSet.name,
    data
   };
  }

  async GetLowStock(companyId: number, limit: number, lowStockParams: lowStockDto) {
    const result = await this.reportsRepository.GetLowStock(companyId, limit, lowStockParams);
    const reportData = result.map((entity: any) => products.fromEntity(entity));
    return reportData;
  }
  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
