export class ResultModel<T> {
    code!: number;
    message!: string;
    data?: T;
}