import { Injectable, afterNextRender } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SessionUtil {
    public window?: Window;

    constructor() {
        afterNextRender(() =>{
            this.window = window;
        });
    }

    public get<T>(key: string): T | null {
        const stringObject = this.window?.sessionStorage.getItem(key);
        if (!stringObject) return null;
        return JSON.parse(atob(stringObject)) as T;
    }

    public store(key: string, data: any): void {
        const parsedData = btoa(JSON.stringify(data));
        void this.window?.sessionStorage.setItem(key, parsedData);
    }

    public remove(key: string): void {
        void this.window?.sessionStorage.removeItem(key);
    }

    public clear(): void {
        void this.window?.sessionStorage.clear();
    }
}