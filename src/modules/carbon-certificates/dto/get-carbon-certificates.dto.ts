import { IsOptional, IsEnum } from 'class-validator';
import { CarbonStatus } from 'src/common/enums/carbon-status.enum';

export class GetCarbonCertificatesDto {
  @IsEnum(CarbonStatus)
  @IsOptional()
  status: CarbonStatus;
}
