"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const soft_delete_plugin_mongoose_1 = require("soft-delete-plugin-mongoose");
const companies_module_1 = require("./companies/companies.module");
const jobs_module_1 = require("./jobs/jobs.module");
const files_module_1 = require("./files/files.module");
const resumes_module_1 = require("./resumes/resumes.module");
const permissions_module_1 = require("./permissions/permissions.module");
const roles_module_1 = require("./roles/roles.module");
const databases_module_1 = require("./databases/databases.module");
const subscribers_module_1 = require("./subscribers/subscribers.module");
const mail_module_1 = require("./mail/mail.module");
const schedule_1 = require("@nestjs/schedule");
const health_module_1 = require("./health/health.module");
const votes_module_1 = require("./votes/votes.module");
const results_module_1 = require("./results/results.module");
const attendances_module_1 = require("./attendances/attendances.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGO_URL'),
                    connectionFactory: (connection) => {
                        connection.plugin(soft_delete_plugin_mongoose_1.softDeletePlugin);
                        return connection;
                    }
                }),
                inject: [config_1.ConfigService]
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            companies_module_1.CompaniesModule,
            jobs_module_1.JobsModule,
            files_module_1.FilesModule,
            resumes_module_1.ResumesModule,
            permissions_module_1.PermissionsModule,
            roles_module_1.RolesModule,
            databases_module_1.DatabasesModule,
            subscribers_module_1.SubscribersModule,
            mail_module_1.MailModule,
            health_module_1.HealthModule,
            votes_module_1.VotesModule,
            results_module_1.ResultsModule,
            attendances_module_1.AttendancesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map