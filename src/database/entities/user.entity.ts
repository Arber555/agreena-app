import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CarbonCertificate } from './carbon-certificate.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: false,
    unique: true,
  })
  username: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', {
    nullable: false,
  })
  password: string;

  @OneToMany(
    () => CarbonCertificate,
    (carbonCertificate) => carbonCertificate.user,
  )
  carbonCertificates: CarbonCertificate[];
}
