import { HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private db;
    constructor(health: HealthCheckService, db: MongooseHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
