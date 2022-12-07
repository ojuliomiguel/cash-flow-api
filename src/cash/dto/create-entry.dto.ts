import { EntryType } from "../enums/entry-types.enum";

export class CreateEntryDto {
  type: EntryType
  amount: number;
  description: string
}
