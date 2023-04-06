import { RecordItem } from "../record-item/record-item";

export interface Record {
    id: number,
    name: string,
    notes: Map<number, RecordItem>
    timeSlot : number
}
