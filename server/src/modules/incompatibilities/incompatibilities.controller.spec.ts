import { Test, TestingModule } from '@nestjs/testing';
import { IncompatibilitiesController } from './incompatibilities.controller';

describe('IncompatibilitiesController', () => {
  let controller: IncompatibilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncompatibilitiesController],
    }).compile();

    controller = module.get<IncompatibilitiesController>(IncompatibilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
