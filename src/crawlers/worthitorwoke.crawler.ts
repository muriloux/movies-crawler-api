import { Crawler } from "../types";
import { delay } from "../helpers";

export class worthItOrWoke implements Crawler {
    showsNames: string[] = [];
    showsAmount: number | null = null;
    async crawl(): Promise<Set<string>> {
        return new Promise<Set<string>>((resolve, reject) => {
            delay(2000)
            const dataSet = new Set<string>();
        });
    }
    getShowsNames() {
        return []
    }
    getShowsAmount() {
        return null;
    }

}