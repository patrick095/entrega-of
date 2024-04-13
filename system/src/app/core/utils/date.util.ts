export class DateUtil {
    public convertStringBrToDate(value: string): Date {
        const [day, month, year] = value.split('/');
        return new Date(+year, +month -1, +day);
    }

    public formatDateToStringBR(date: Date) {
        if (typeof date === 'string') date = new Date(date);

        return [
          this._padTo2Digits(date.getDate()),
          this._padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }

    private _padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
      }
}