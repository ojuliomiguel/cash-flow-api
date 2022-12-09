import { IsEnum, IsInt, IsPositive, IsString, IsNotEmpty} from "class-validator";
import { EntryType } from "../enums/entry-types.enum";

export class CreateEntryDto {
  @IsEnum(EntryType)
  type: EntryType
  @IsNotEmpty()
  @IsPositive()
  amount: number;
  @IsNotEmpty()
  @IsString()
  description: string
}
