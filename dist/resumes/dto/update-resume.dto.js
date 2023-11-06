"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResumeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_resume_dto_1 = require("./create-resume.dto");
class UpdateResumeDto extends (0, mapped_types_1.PartialType)(create_resume_dto_1.CreateResumeDto) {
}
exports.UpdateResumeDto = UpdateResumeDto;
//# sourceMappingURL=update-resume.dto.js.map