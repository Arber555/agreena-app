import { IsNotEmpty, IsUUID } from 'class-validator';

export class TransferCarbonCertificatesDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
