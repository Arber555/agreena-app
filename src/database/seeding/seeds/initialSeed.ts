import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CarbonCertificate } from '../../entities/carbon-certificate.entity';
import { CarbonStatus } from '../../../common/enums/carbon-status.enum';

export class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users = await factory(User)().createMany(10);
    await factory(CarbonCertificate)()
      .map(async (carbonCertificate) => {
        carbonCertificate.userId =
          users[Math.floor(Math.random() * users.length)].id;
        return carbonCertificate;
      })
      .createMany(5, { status: CarbonStatus.OWNED });

    await factory(CarbonCertificate)().createMany(95, {});
  }
}
