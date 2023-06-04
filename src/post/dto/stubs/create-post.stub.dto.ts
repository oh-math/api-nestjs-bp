import { faker } from '@faker-js/faker';
import { CreatePostDto } from '../create-post.dto';
import { randomUUID } from 'crypto';

const title: string = faker.commerce.productAdjective();
const body: string = `So today in my post, i'm gonna talk about ${title}`;
const authorId = () => randomUUID();

function createPostFake(fields?: Partial<CreatePostDto>): CreatePostDto {
  return {
    title,
    body,
    authorId: authorId(),
    image: null,

    ...fields,
  };
}

export { title, body, authorId, createPostFake };
