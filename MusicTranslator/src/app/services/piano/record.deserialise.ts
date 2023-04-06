
import { Record } from 'src/app/interfaces/record/record';
import { RecordItem } from 'src/app/interfaces/record-item/record-item';

export class RecordDeserializer {
    static deserialize(json: any): Record {
        console.log("Test");
      const notes = new Map<number, RecordItem>();
      for (const key in json.notes) {
        if (json.notes.hasOwnProperty(key)) {
          const note = json.notes[key];
          const timeSlot = parseFloat(key);
          notes.set(timeSlot, note);
        }
      }
      return {
        id: json.id,
        name: json.name,
        notes: notes,
        timeSlot: json.timeSlot
      };
    }
  }