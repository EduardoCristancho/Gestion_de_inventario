import { Type } from 'class-transformer';
import { IsNumber, IsOptional,  Max, Min} from 'class-validator';

export class paginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'El valor de page debe ser un número' })
    @Min(0, { message: 'El valor de page debe ser mayor o igual a 0' })
    page: number

    @IsOptional()
    @Type(() => Number)
    @Max(100, { message: 'El valor de limit debe ser menor o igual a 100' })
    limit: number
}

export class PaginationResponse<T> {
    data: T[];
    total: number;
    page?: number;
    limit?: number;
    totalPages?: number;

    constructor(data: T[], total: number, page?: number, limit?: number) {
        this.data = data;
        this.total = total;
        this.page = page;
        this.limit = limit;
        if (limit){
            this.totalPages = Math.ceil(total / limit);
        }
    }
}

