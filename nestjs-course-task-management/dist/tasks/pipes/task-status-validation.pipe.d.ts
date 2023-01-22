import { PipeTransform } from '@nestjs/common';
export declare class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: any[];
    transform(value: any): any;
    private isStatusValid;
}
