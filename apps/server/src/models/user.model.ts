import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IProfile extends Document {
    bio: string;
    skills: string[];
    social: {
        twitter: string;
        github: string;
        leetcode: string;
    };
    education: [{
        qualification: string;
        degree: string;
        stream: string;
        institute: string;
        cgpa: number;
        start: Date;
        end: Date;
    }];
    experience: [{
        title: string;
        company: string;
        location: string;
        start: Date;
        end: Date;
        current: boolean;
        description: string;
    }];
};

interface IUser extends Document {
    googleId: string;
    githubId: string;
    firstName: string;
    lastName: string;
    username: string;   
    email: string;
    password: string;
    gender: string;
    dob: Date;
    phone: string;
    address: string;
    location: string;
    avatar: string;
    role: string;
    profile: IProfile;
    company: Schema.Types.ObjectId;
    appliedJobs: Schema.Types.ObjectId[];
    savedJobs: Schema.Types.ObjectId[];
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
};

const UserSchema = new Schema<IUser>({
    googleId: {
        type: String,
        required: false
    },
    githubId: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: false
    },
    dob: {
        type: Date,
        required: false
    }, 
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['user', 'recruiter'],
        required: false
    },
    profile: {
        bio: {
            type: String,
            required: false
        },
        skills: {
            type: [String],
            required: false
        },
        social: {
            twitter: {
                type: String,
                required: false
            },
            github: {
                type: String,
                required: false
            },
            leetcode: {
                type: String,
                required: false
            }
        },
        education: [{
            qualification: {
                type: String,
                required: false
            },
            degree: {
                type: String,
                required: false
            },
            stream: {
                type: String,
                required: false
            },
            institute: {
                type: String,
                required: false
            },
            cgpa: {
                type: Number,
                required: false
            },
            start: {
                type: Date,
                required: false
            },
            end: {
                type: Date,
                required: false
            }
        }],
        experience: [{
            title: {
                type: String,
                required: false
            },
            company: {
                type: String,
                required: false
            },
            location: {
                type: String,
                required: false
            },
            start: {
                type: Date,
                required: false
            },
            end: {
                type: Date,
                required: false
            },
            current: {
                type: Boolean,
                required: false
            },
            description: {
                type: String,
                required: false
            }
        }],
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: false
    },
    appliedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: false
    }],
    savedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: false
    }],
    refreshToken: {
        type: String,
        required: false
    }
}, { timestamps: true });


//* Virtual attributes

UserSchema.virtual('fullName').get(function(this: IUser) {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('age').get(function(this: IUser) {
    return new Date().getFullYear() - this.dob.getFullYear();
});


//* Mongoose methods

UserSchema.pre<IUser>('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.isModified('password') && (this.password = await bcrypt.hash(this.password, salt));
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.generateAccessToken = async function() {
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

UserSchema.methods.generateRefreshToken = async function() {
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE
    });
};


export const User = model<IUser>('User', UserSchema);