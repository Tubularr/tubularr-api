import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export default class SourceDto {
  @IsString()
  name: string;

  @IsString()
  sourceKey: string;

  @IsString()
  directory: string;

  @IsString()
  format: string;

  @IsString()
  indexSchedule: string;

  @IsInt()
  @Min(0)
  @Max(1)
  download: number;

  @IsString()
  createdOn: string;

  @IsString()
  lastIndexedOn: string;

  @IsString()
  sourceResolution: string;

  @IsString()
  sourceVideoCodec: string;

  @IsString()
  sourceAudioCodec: string;

  @IsInt()
  @Min(0)
  @Max(1)
  prefer60fps: number;

  @IsInt()
  @Min(0)
  @Max(1)
  preferHdr: number;

  @IsString()
  sourceFileExtension: string;

  @IsString()
  fallbackStrategy: string;

  @IsInt()
  @Min(0)
  @Max(1)
  downloadThumbnails: number;

  @IsInt()
  @Min(0)
  @Max(1)
  downloadNfo: number;

  @IsString()
  deleteSchedule: string;

  @IsInt()
  @Min(0)
  @Max(1)
  downloadSubtitles: number;

  @IsString()
  subtitleLanguage: string;

  @IsOptional()
  uuid: string;
}
