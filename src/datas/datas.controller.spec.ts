import { Test, TestingModule } from '@nestjs/testing';
import { DatasController } from './datas.controller';

describe('DatasController', () => {
  let controller: DatasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatasController],
    }).compile();

    controller = module.get<DatasController>(DatasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
