import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User{

    @Prop()
    username: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({default: false})
    admin: boolean;

    @Prop({default: Date.now})
    created_at: Date
}

export const UserSchema = SchemaFactory.createForClass(User);