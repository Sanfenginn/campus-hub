"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentClass = void 0;
const mongoose_1 = require("mongoose");
const studentClassSchema = new mongoose_1.Schema({
    className: {
        type: String,
        required: true,
        notEmpty: true,
    },
    students: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Student",
            _id: false,
        },
    ],
    courses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Course",
            _id: false,
        },
    ],
});
exports.StudentClass = (0, mongoose_1.model)("StudentClass", studentClassSchema);
//# sourceMappingURL=studentClassModel.js.map