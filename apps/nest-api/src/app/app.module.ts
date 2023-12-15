import { Module } from '@nestjs/common';
import { RsUserModule } from '@rumsan/user';
import { PrismaDbModule, PrismaService } from '@rumsan/prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ListenerModule } from './listeners/listners.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		EventEmitterModule.forRoot({ maxListeners: 10, ignoreErrors: false }),
		ListenerModule,
		PrismaDbModule,
		RsUserModule,
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
