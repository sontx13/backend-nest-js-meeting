import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { SubscriberDocument } from 'src/subscribers/schemas/subscriber.schema';
import { JobDocument } from 'src/jobs/schemas/job.schemas';
export declare class MailController {
    private readonly mailService;
    private readonly mailerService;
    private subscriberModel;
    private jobModel;
    constructor(mailService: MailService, mailerService: MailerService, subscriberModel: SoftDeleteModel<SubscriberDocument>, jobModel: SoftDeleteModel<JobDocument>);
    handleTestEmail(): Promise<void>;
}
