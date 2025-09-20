import mongoose, { Document, Schema } from "mongoose";
const UserSchema = new Schema({
    chatId: { type: String, required: true, unique: true },
    isEnabled: { type: Boolean, default: true },
    frequency: {
        type: Number,
        default: parseInt(process.env.DEFAULT_FREQUENCY || "1"),
    },
    lastSentAt: { type: Date, default: null },
});
export default mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map