import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const fileValidators = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: 'jpeg' })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
