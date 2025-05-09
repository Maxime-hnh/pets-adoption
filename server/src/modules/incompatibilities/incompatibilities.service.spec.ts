import { Test, TestingModule } from '@nestjs/testing';
import { IncompatibilitiesService } from './incompatibilities.service';

describe('IncompatibilitiesService', () => {
  let service: IncompatibilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncompatibilitiesService],
    }).compile();

    service = module.get<IncompatibilitiesService>(IncompatibilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
