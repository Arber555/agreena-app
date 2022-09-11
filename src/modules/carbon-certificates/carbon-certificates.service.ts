import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarbonStatus } from 'src/common/enums/carbon-status.enum';
import { CarbonCertificate } from 'src/database/entities/carbon-certificate.entity';
import { User } from 'src/database/entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { GetCarbonCertificatesDto } from './dto/get-carbon-certificates.dto';
import { TransferCarbonCertificatesDto } from './dto/transfer-carbon-certificates.dto';

@Injectable()
export class CarbonCertificatesService {
  constructor(
    @InjectRepository(CarbonCertificate)
    private readonly carbonCertificateRepository: Repository<CarbonCertificate>,
    private connection: Connection,
  ) {}

  async getList(
    getCarbonCertificatesDto: GetCarbonCertificatesDto,
    user: User,
  ) {
    const { status } = getCarbonCertificatesDto;

    const conditions = {
      available: { status, userId: null },
      owned: { status, userId: user.id },
      transferred: { status, userId: user.id },
    };

    return this.carbonCertificateRepository.find({
      where: status ? conditions[status] : {},
    });
  }

  async transfer(
    carbonCertificateId: string,
    transferCarbonCertificatesDto: TransferCarbonCertificatesDto,
    user: User,
  ) {
    const { userId } = transferCarbonCertificatesDto;

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const myCarbonCertificate = await queryRunner.manager.findOne(
        CarbonCertificate,
        {
          where: {
            id: carbonCertificateId,
            status: CarbonStatus.OWNED,
            userId: user.id,
          },
        },
      );

      if (!myCarbonCertificate) {
        throw new BadRequestException(
          `Can't find this carbon certificate with id ${carbonCertificateId}`,
        );
      }

      myCarbonCertificate.status = CarbonStatus.TRANSFERRED;
      myCarbonCertificate.userId = userId;

      await queryRunner.manager.update(
        CarbonCertificate,
        { id: myCarbonCertificate.id },
        myCarbonCertificate,
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
}
