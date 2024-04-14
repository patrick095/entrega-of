import { Injectable, afterNextRender } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class StorageUtil {
    public window?: Window;

    constructor() {
        afterNextRender(() =>{
            this.window = window;
        });
    }

    public get(key: string): any {
        const stringObject = this.window?.localStorage.getItem(key);
        if (!stringObject) return null;
        console.log(stringObject)
        return JSON.parse(atob(stringObject));
    }

    public store(key: string, data: any): void {
        const parsedData = btoa(JSON.stringify(data));
        void this.window?.localStorage.setItem(key, parsedData);
    }

    public remove(key: string): void {
        void this.window?.localStorage.removeItem(key);
    }

    public clear(): void {
        void this.window?.localStorage.clear();
    }
}