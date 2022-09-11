import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/database/entities/user.entity';
import { CarbonCertificatesService } from './carbon-certificates.service';
import { GetCarbonCertificatesDto } from './dto/get-carbon-certificates.dto';
import { TransferCarbonCertificatesDto } from './dto/transfer-carbon-certificates.dto';

@UseGuards(JwtAuthGuard)
@Controller('carbon-certificates')
export class CarbonCertificatesController {
  constructor(private carbonCertificatesService: CarbonCertificatesService) {}

  @Get()
  getList(
    @Query(new ValidationPipe())
    getCarbonCertificatesDto: GetCarbonCertificatesDto,
    @GetUser() user: User,
  ) {
    return this.carbonCertificatesService.getList(
      getCarbonCertificatesDto,
      user,
    );
  }

  @Post('/transfer/:id')
  transfer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe)
    transferCarbonCertificatesDto: TransferCarbonCertificatesDto,
    @GetUser() user: User,
  ) {
    return this.carbonCertificatesService.transfer(
      id,
      transferCarbonCertificatesDto,
      user,
    );
  }
}
