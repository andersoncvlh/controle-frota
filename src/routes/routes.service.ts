import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { DirectionsService } from 'src/maps/directions/directions.service';

@Injectable()
export class RoutesService {

  constructor(private readonly prismaService: PrismaService,
    private readonly directionsService: DirectionsService) { }

  async create(createRouteDto: CreateRouteDto) {
    const {
      available_travel_modes, geocoded_waypoints, routes, request
    } = await this.directionsService.getDirections(createRouteDto.sourceId, createRouteDto.destinationId);
    const legs = routes[0].legs[0];
    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: createRouteDto.sourceId,
          location: {
            latitude: legs.start_location.lat,
            longitude: legs.start_location.lng
          }
        },
        destination: {
          name: createRouteDto.destinationId,
          location: {
            latitude: legs.end_location.lat,
            longitude: legs.end_location.lng
          }
        },
        directions: JSON.stringify({
          available_travel_modes,
          geocoded_waypoints,
          routes,
          request
        }),
        distance: legs.distance.value,
        duration: legs.duration.value
      }
    });
  }

  findAll() {
    return this.prismaService.route.findMany();
  }

  findOne(id: string) {
    return this.prismaService.route.findUniqueOrThrow({
      where: { id }
    });
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
