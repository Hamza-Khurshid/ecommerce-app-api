var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Transaction = new Schema({
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'items'
        }
    ],
    order: [
        {
            quantity: Number,
            itemId: Schema.Types.ObjectId,
        }
    ],
    totalBill: Number,
    user: { type: Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true });

const transactionCollection = mongoose.model("transactions", Transaction);

module.exports = transactionCollection;