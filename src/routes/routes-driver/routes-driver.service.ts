import { Injectable } from '@nestjs/common';
import { last } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateRouterDriverDto } from '../dto/create-router-driver.dto';

@Injectable()
export class RoutesDriverService {

    constructor(private readonly prismaService: PrismaService) { }

    async createOrUpdate(dto: CreateRouterDriverDto) {
        return this.prismaService.routeDriver.upsert({
            include: {
                route: true
            },
            where: {
                route_id: dto.route_id
            },
            create: {
                route_id: dto.route_id,
                points: {
                    set: {
                        location: {
                            latitude: dto.lat,
                            longitude: dto.lng
                        }
                    }
                }
            },
            update: {
                points: {
                    push: {
                        location: {
                            latitude: dto.lat,
                            longitude: dto.lng
                        }
                    }
                }
            },

        })
    }
}
