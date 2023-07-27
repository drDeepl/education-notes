import { Logger, LoggerService } from '@nestjs/common';

export const _getRandomInt = function (): number {
  return Math.floor(Math.random() * 100);
};
