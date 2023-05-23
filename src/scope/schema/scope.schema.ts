import * as mongoose from 'mongoose';

export const PriorityEnum = ['Low', 'Medium', 'High', 'Urgent'];

export const StatusEnum = ['Pending', 'Ongoing', 'Done', 'Last_files', 'New_files'];

export const PaymentEnum = ['Unpaid', 'Waiting', 'Paid'];

export const ScopeSchema = new mongoose.Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    priority: {
        type: String,
        enum: PriorityEnum
    },
    status: { 
        type: String,
        enum: StatusEnum
    },
    payment: {
        type: String,
        enum: PaymentEnum
    },
    fee: Number,
    projectId: String
}, { timestamps: true });

ScopeSchema.pre('save', function (next) {
    if (this.fee !== undefined) {
        this.fee = Number(this.fee.toFixed(2));
        next();
    }
});
