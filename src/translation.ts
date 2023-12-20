import mongoose from 'mongoose';

// an interface that describes the properties
// that are required to create a Translation

interface TranslationAttrs {
  Key: string;
  Value: string;
  Locale: string;
}

// an interface that describes the properties
// that a Translation Model has
interface TranslationModel extends mongoose.Model<TranslationDoc> {
  build(attrs: TranslationAttrs): TranslationDoc;
}

// an interface that describes the properties
// that a Translation Document has
interface TranslationDoc extends mongoose.Document {
  Key: string;
  Value: string;
  Locale: string;
}

const TranslationSchema = new mongoose.Schema(
  {
    Key: {
      type: String,
    },
    Value: {
      type: String,
    },
    Locale: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.ID = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

TranslationSchema.pre("save", async function (done) {
  if (this.isModified("Key")) {
    const Key: string = this.get("Key")!;
    this.set("Key", Key.trim());
  }

  if (this.isModified("Value")) {
    const Value: string = this.get("Value")!;
    this.set("Value", Value.trim());
  }

  if (this.isModified("Locale")) {
    const Locale: string = this.get("Locale")!;
    this.set("Locale", Locale.trim());
  }

  done();
});

TranslationSchema.statics.build = (attrs: TranslationAttrs) => {
  return new Translation(attrs);
};

const Translation = mongoose.model<TranslationDoc, TranslationModel>(
  "Translation",
  TranslationSchema
);

export { Translation };
