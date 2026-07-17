import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { MailsModule } from './modules/mails/mails.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { AuthGoogleModule } from './modules/auth-google/auth-google.module';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { ImagesModule } from './modules/images/images.module';
import { BannerModule } from './modules/banner/banner.module';
import { CategoriesBlogModule } from './modules/categories-blog/categories-blog.module';
import { ContactModule } from './modules/contact/contact.module';
import { HistoryModule } from './modules/history/history.module';
import { InfoWebsiteModule } from './modules/info-website/info-website.module';
import { BlogModule } from './modules/blog/blog.module';
import { JwtAuthCoreModule } from './modules/jwt-auth-core/jwt-auth-core.module';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import googleConfig from './config/google.config';
import mailerConfig from './config/mailer.config';
import { UsersModule } from './modules/users/users.module';
import { ServicePackageModule } from './modules/service-package/service-package.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { ProductsModule } from './modules/products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './modules/permissions/guards/permissions.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, authConfig, googleConfig, mailerConfig],
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
    }),

    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 50,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 1000,
      },
    ]),

    ScheduleModule.forRoot(),
    JwtAuthCoreModule,
    DatabaseModule,
    PermissionsModule,
    RolesModule,
    AuthGoogleModule,
    ForgotPasswordModule,
    MailsModule,
    MailerModule,
    ImagesModule,
    BannerModule,
    CategoriesBlogModule,
    ContactModule,
    HistoryModule,
    InfoWebsiteModule,
    UsersModule,
    BlogModule,
    ServicePackageModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
