import { IsString } from "class-validator";

export class credentialsDTO{
    @IsString()
    username: string;

    @IsString()
    password: string;
}