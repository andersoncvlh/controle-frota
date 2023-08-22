import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Injectable()
export class RoutesService {

  constructor(private readonly prismaService: PrismaService) {}

  create(createRouteDto: CreateRouteDto) {
    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: createRouteDto.sourceId,
          location: {
            latitude: 0,
            longitude: 0
          }
        },
        destination: {
          name: createRouteDto.destinationId,
          location: {
            latitude: 0,
            longitude: 0
          }
        },
        directions: '{}',
        distance: 0,
        duration: 0
      }
    });
  }

  findAll() {
    return this.prismaService.route.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
