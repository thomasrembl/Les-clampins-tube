import mongoose, { Document, Schema } from 'mongoose';

interface Item extends Document {
  projectName: string;
  urlList: {
    url: string;
    time: Date;
  }[];
}

const ItemSchema: Schema = new Schema(
  {
    projectName: { type: String, required: true },
    urlList: [
      {
        url: { type: String, required: true },
        time: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ItemModel = mongoose.models.Item || mongoose.model<Item>('Item', ItemSchema);

export default ItemModel;