import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type QuizDocument = HydratedDocument<Quiz>;

@Schema()
export class Quiz{
    @Prop()
    question: string;

    @Prop([String])
    options: string[]

    @Prop()
    correct_answer: number;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz)