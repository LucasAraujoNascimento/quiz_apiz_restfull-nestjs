import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RankingDocument = HydratedDocument<Ranking>

@Schema()
export class Ranking{
    @Prop()
    username: string;

    @Prop()
    score: number;

    @Prop()
    response_time: string;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking)