import { CarbonStatus } from '../../common/enums/carbon-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CarbonCertificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: false,
  })
  country: string;

  @Column({ type: 'enum', enum: CarbonStatus, nullable: false })
  status: CarbonStatus;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => User, (user) => user.carbonCertificates)
  user: User;
}
