import { Schema, model, Document } from 'mongoose';

interface ICompany extends Document {
    name: string;
    logo: string;
    description: string;
    website: string;
    email: string;
    phone: string;
    location: string;
    address: string;
    geo_location: {
        longitude: number;
        latitude: number;
    };
    postedJobs: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
};

const CompanySchema = new Schema<ICompany>({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    geo_location: {
        longitude: {
            type: Number,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        }
    },
    postedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: false
    }]
}, { timestamps: true });

export const Company =  model<ICompany>('Company', CompanySchema);
