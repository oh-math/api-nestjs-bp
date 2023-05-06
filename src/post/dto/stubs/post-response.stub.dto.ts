import { faker } from '@faker-js/faker';
import { PostResponseDto } from '../post-response.dto';
import { randomUUID } from 'crypto';

const slug: string = 'posts';
const title: string = faker.commerce.productAdjective();
const body: string = `So today in my post, i'm gonna talk about ${title}`;

function postResponseFake(fields?: Partial<PostResponseDto>): PostResponseDto {
  return {
    id: randomUUID(),
    slug,
    title,
    body,
    authorId: randomUUID(),
    image: null,


    ...fields,
  };
}

export { slug, title, body, postResponseFake };
