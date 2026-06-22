import { Schema, model, Document } from "mongoose";

export interface ICategoryModel extends Document {
  name: string;
}

const schema = new Schema<ICategoryModel>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default model<ICategoryModel>("Category", schema);
