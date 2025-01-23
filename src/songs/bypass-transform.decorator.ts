import { SetMetadata } from '@nestjs/common';

const BYPASS_TRANSFORM_INTERCEPTOR = 'bypassTransformInterceptor';

export const BypassTransformInterceptor = () =>
  SetMetadata(BYPASS_TRANSFORM_INTERCEPTOR, true);
