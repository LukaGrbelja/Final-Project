import { Schema, model } from "mongoose";

const ArticleSchema = new Schema({
    Title : {
        type: String,
        required: true
    },
    URL : {
        type: String,
        required: true
    },
    Date : {
        type: Date,
        required: true
    },
    Description : {
        type: String,
        required: true
    },
    User : {
        type: String,
        required: true
    },
    FullText : {
        type: String,
        required: true
    }
});

const ArticleModel = model("news", ArticleSchema);
export default ArticleModel;