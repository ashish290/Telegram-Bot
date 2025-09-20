import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    chatId: string;
    isEnabled: boolean;
    frequency: number;
    lastSentAt: Date | null;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=user.d.ts.map