"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const customize_1 = require("../decorator/customize");
const mailer_1 = require("@nestjs-modules/mailer");
const job_schemas_1 = require("../jobs/schemas/job.schemas");
const mongoose_1 = require("@nestjs/mongoose");
const rxjs_1 = require("rxjs");
const schedule_1 = require("@nestjs/schedule");
let MailController = class MailController {
    constructor(mailService, mailerService, subscriberModel, jobModel) {
        this.mailService = mailService;
        this.mailerService = mailerService;
        this.subscriberModel = subscriberModel;
        this.jobModel = jobModel;
    }
    async handleTestEmail() {
        const subscribers = await this.subscriberModel.find({});
        for (const subs of subscribers) {
            const subsSkills = subs.skills;
            const jobWithMatchingSkills = await this.jobModel.find({ skills: { $in: subsSkills } });
            if (jobWithMatchingSkills === null || jobWithMatchingSkills === void 0 ? void 0 : jobWithMatchingSkills.length) {
                const jobs = jobWithMatchingSkills.map(item => {
                    return {
                        name: item.name,
                        company: item.company.name,
                        salary: `${item.salary}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " đ",
                        skills: item.skills
                    };
                });
                await this.mailerService.sendMail({
                    to: "sontx13@gmail.com",
                    from: '"Support Team" <support@example.com>',
                    subject: 'Welcome to Nice App! Confirm your Email',
                    template: "new-job",
                    context: {
                        receiver: subs.name,
                        jobs: jobs
                    }
                });
            }
        }
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Get)(),
    (0, customize_1.Public)(),
    (0, customize_1.ResponseMessage)("Test email"),
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEKEND),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MailController.prototype, "handleTestEmail", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('mail'),
    __param(2, (0, mongoose_1.InjectModel)(rxjs_1.Subscriber.name)),
    __param(3, (0, mongoose_1.InjectModel)(job_schemas_1.Job.name)),
    __metadata("design:paramtypes", [mail_service_1.MailService,
        mailer_1.MailerService, Object, Object])
], MailController);
//# sourceMappingURL=mail.controller.js.map