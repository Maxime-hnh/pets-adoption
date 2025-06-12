import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AnimalsModule } from './modules/animals/animals.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { MessagesModule } from './modules/messages/messages.module';
import { DonationsModule } from './modules/donations/donations.module';
import { EventsModule } from './modules/events/events.module';
import { IncompatibilitiesModule } from './modules/incompatibilities/incompatibilities.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    UsersModule,
    RolesModule,
    AuthModule,
    PrismaModule,
    AnimalsModule,
    FavoritesModule,
    MessagesModule,
    DonationsModule,
    EventsModule,
    IncompatibilitiesModule,
    AuditLogsModule,
    UploadModule
  ],
})
export class AppModule { }
