import { Module } from '@nestjs/common';
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { AdminModule as AdminBroModule } from '@adminjs/nestjs';
import { BoardModule } from 'src/board/board.module';
import { getModelToken } from '@nestjs/mongoose';
import { Board } from 'src/board/board.schema';
import { Model } from 'mongoose';

AdminJS.registerAdapter(AdminJSMongoose);

@Module({
  imports: [
    AdminBroModule.createAdminAsync({
      imports: [BoardModule],
      inject: [getModelToken(Board.name)],
      useFactory: (boardModel: Model<Board>) => ({
        adminJsOptions: {
          rootPath: '/admin',
          resources: [
            {
              resource: boardModel,
              options: {
                properties: {
                  contents: { type: 'richtext' },
                },
              },
            },
          ],
          dashboard: {
            component: AdminJS.bundle('./dashboard'),
          },
          branding: {
            companyName: 'Admin',
            logo: false,
          },
        },
        auth: {
          authenticate: async (email, password) =>
            Promise.resolve({ email: 'gogownsduq@gmail.com' }),
          cookieName: 'admin',
          cookiePassword: '0000',
        },
      }),
    }),
  ],
})
export class AdminModule {}
