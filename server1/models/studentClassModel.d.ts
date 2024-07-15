import { Schema } from "mongoose";
export declare const StudentClass: import("mongoose").Model<{
    className: string;
    students: import("mongoose").Types.ObjectId[];
    courses: import("mongoose").Types.ObjectId[];
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    className: string;
    students: import("mongoose").Types.ObjectId[];
    courses: import("mongoose").Types.ObjectId[];
}> & {
    className: string;
    students: import("mongoose").Types.ObjectId[];
    courses: import("mongoose").Types.ObjectId[];
} & {
    _id: import("mongoose").Types.ObjectId;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    className: string;
    students: import("mongoose").Types.ObjectId[];
    courses: import("mongoose").Types.ObjectId[];
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    className: string;
    students: import("mongoose").Types.ObjectId[];
    courses: import("mongoose").Types.ObjectId[];
}>> & import("mongoose").FlatRecord<{
    className: string;
    students: import("mongoose").Types.ObjectId[];
    courses: import("mongoose").Types.ObjectId[];
}> & {
    _id: import("mongoose").Types.ObjectId;
}>>;
