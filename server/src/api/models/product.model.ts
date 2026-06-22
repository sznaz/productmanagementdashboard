import { ObjectId } from "mongodb";
import { Schema, model, Document, Types } from "mongoose";


export interface IProductModel extends Document {
  name: string;
  price: number;
  category: string | Types.ObjectId;
  inStock: number;
}

const schema = new Schema<IProductModel>(
  {
    name: { type: String, required: true },
    price: { type: Number,  required: true },
    category: { type: Types.ObjectId, ref: 'Category', required: true },
    inStock: { type: Number,  required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IProductModel>("Product", schema);