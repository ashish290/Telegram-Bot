import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  chatId: string;
  isEnabled: boolean;
  frequency: number;
  lastSentAt: Date | null;
}

const UserSchema: Schema = new Schema<IUser>({
  chatId: { type: String, required: true, unique: true },
  isEnabled: { type: Boolean, default: true },
  frequency: {
    type: Number,
    default: parseInt(process.env.DEFAULT_FREQUENCY || "1"),
  },
  lastSentAt: { type: Date, default: null },
});

export default mongoose.model<IUser>("User", UserSchema);