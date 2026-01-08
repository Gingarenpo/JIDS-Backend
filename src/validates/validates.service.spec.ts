import { Test, TestingModule } from '@nestjs/testing';
import { ValidatesService } from './validates.service';

describe('ValidatesService', () => {
  let service: ValidatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidatesService],
    }).compile();

    service = module.get<ValidatesService>(ValidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
