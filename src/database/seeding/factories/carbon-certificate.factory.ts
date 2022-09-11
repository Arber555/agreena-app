import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { CarbonCertificate } from '../../entities/carbon-certificate.entity';
import { CarbonStatus } from '../../../common/enums/carbon-status.enum';

define(CarbonCertificate, () => {
  const carbonCertificate = new CarbonCertificate();
  carbonCertificate.country = faker.address.country();
  carbonCertificate.status = CarbonStatus.AVAILABLE;
  return carbonCertificate;
});
