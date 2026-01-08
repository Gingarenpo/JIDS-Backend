import { Test, TestingModule } from '@nestjs/testing';
import { ValidatesController } from './validates.controller';

describe('ValidatesController', () => {
  let controller: ValidatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidatesController],
    }).compile();

    controller = module.get<ValidatesController>(ValidatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
