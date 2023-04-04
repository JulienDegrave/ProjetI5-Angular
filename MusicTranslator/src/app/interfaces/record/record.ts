import { RecordItem } from "../record-item/record-item";

export interface Record {
    notes: Map<number, RecordItem>
    timeSlot : number
}
