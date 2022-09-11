import { Module } from '@nestjs/common';
import { CarbonCertificatesService } from './carbon-certificates.service';
import { CarbonCertificatesController } from './carbon-certificates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertificate } from 'src/database/entities/carbon-certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarbonCertificate])],
  providers: [CarbonCertificatesService],
  controllers: [CarbonCertificatesController],
})
export class CarbonCertificatesModule {}
