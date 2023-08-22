import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { MapsModule } from 'src/maps/maps.module';
import { RoutesDriverService } from './routes-driver/routes-driver.service';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService, RoutesDriverService],
  exports: [RoutesService],
  imports: [MapsModule]
})
export class RoutesModule { }
