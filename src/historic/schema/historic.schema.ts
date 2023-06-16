import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HistoricDocument = HydratedDocument<Historic>

@Schema()
export class Historic{
    @Prop()
    username: string;

    @Prop()
    question: string;

    @Prop()
    option: number;

    @Prop()
    correct_answer: number;

    @Prop()
    response_time: string;
}

export const HistoricSchema = SchemaFactory.createForClass(Historic)