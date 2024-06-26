import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ErrorLog} from "./entities/error.entity";
import {ErrorLogController} from "./error.controller";
import {ErrorLogService} from "./error.service";
import {User} from "../users/entities/user.entity";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([ErrorLog,User])],
    controllers: [ErrorLogController],
    providers: [ErrorLogService,ConfigService],
})
export class ErrorLogModule {
}
