import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
    rooms: {
        type: Number,
        required: true,
        min: 0
    },
    name: {
        type: String,
        required: true,
        maxLength: 99
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        maxLength: 999,
        default: ""
    },
});

apartmentSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

const apartmentModel = mongoose.model('Apartment', apartmentSchema);

export default apartmentModel;
