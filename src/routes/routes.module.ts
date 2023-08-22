import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { MapsModule } from 'src/maps/maps.module';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService],
  imports: [MapsModule]
})
export class RoutesModule { }
