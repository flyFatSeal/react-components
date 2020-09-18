import { AlertDataWithIndex, AlertService } from "./types";

function ranText(prefix: string = "", len: number = 9): string {
    let str = prefix;
    for (let i = 0; i < len; i++) {
        str += String.fromCharCode(Math.floor(Math.random() * 26) | ranOption(0x41, 0x61));
    }
    return str;
}

function ranInt(max: number) {
    return Math.floor(Math.random() * max);
}

function ranOption<T1, T2>(v: T1, v2: T2): T1 | T2 {
    return Math.random() >= 0.5 ? v : v2;
}

function ranDate(latest: number = Date.now()): Date {
    return new Date(Math.floor(Math.random() * latest))
}

let DATA_INDEX = 0;
let UID = 0;

function ranData(): AlertDataWithIndex {
    return {
        index: ++DATA_INDEX,
        uid: ++UID,
        alertTime: ranDate().toLocaleString(),
        value: ranText("value:"),
        message: ranText("message:", 12),
        type: ranText("type:", 6),
        variableName: ranText("name:", 8),
        confirmTime: ranOption("", ranDate().toLocaleString()),
        recoveryTime: ranOption("", ranDate().toLocaleString(),),
    };
}


export class MockAlertService implements AlertService {
    readonly pageSize: number = 10;

    private latest: AlertDataWithIndex[];
    constructor() {
        this.latest = [];
        this.ranLatest(1000);
    }
    private ranLatest(timeout: number): void {
        setTimeout(() => {
            this.latest.push(ranData());
            if (this.latest.length > 10) {
                this.latest.shift();
            }
            this.ranLatest(timeout);
            this.emitLatest(this.latest);
        }, timeout);
    }

    updateLatest?: (latest: AlertDataWithIndex[]) => void;

    readonly confirm = (uid: number) => {
        let mod = false;
        this.latest.forEach(l => {
            if (l.uid === uid) {
                l.confirmTime = new Date().toLocaleString();
                mod = true;
            }
        });
        if (mod) {
            this.emitLatest(this.latest);
        }
    };

    private emitLatest(data: AlertDataWithIndex[]): void {
        if (this.updateLatest === undefined) return;
        const arr = [];
        for (let i = 0; i < this.pageSize; i++) {
            arr[i] = data[i];
        }
        this.updateLatest(arr);
    }

}


