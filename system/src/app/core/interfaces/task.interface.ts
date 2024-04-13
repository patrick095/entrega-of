export interface ITask {
    number: string;
    description?: string;
    dateStart: Date;
    dateEnd: Date;
    project: string;
    branch: string;
    points?: number;
}