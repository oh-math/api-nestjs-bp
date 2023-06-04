import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma';
import { S3Module, S3Service } from 'src/s3';
import { CreatePostDto, PostResponseDto } from './dto';
import {
  createPostFake,
  body as fakeBody,
  title as fakeTitle,
} from './dto/stubs/create-post.stub.dto';
import { postResponseFake } from './dto/stubs/post-response.stub.dto';
import { PostService } from './post.service';
import { log } from 'console';

describe('PostService', () => {
  let prisma: PrismaService;
  let postService: PostService;
  let s3: S3Service;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        PrismaService,
        {
          provide: PrismaService,
          useValue: {
            post: {
              create: jest.fn().mockResolvedValue(() => ({
                id: randomUUID() as string,
                slug: 'posts',
                title: fakeTitle,
                body: fakeBody,
                authorID: randomUUID(),
                image: null,
              })),
            },
          },
        },
      ],
      imports: [S3Module],
    }).compile();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    s3 = moduleFixture.get(S3Module);
    postService = new PostService(prisma, s3);
  });

  it('Should be defined', async () => {
    expect(prisma).toBeDefined();
    expect(s3).toBeDefined();
    expect(postService).toBeDefined();
  });

  describe('Create', () => {
    let authorId: string;
    let title: string;
    let body: string;

    let createPostDto: CreatePostDto;
    let postRespondeDto: PostResponseDto;

    beforeEach(() => {
      createPostDto = createPostFake();
      title = createPostDto.title;
      body = createPostDto.body;
      authorId = createPostDto.authorId;

      postRespondeDto = postResponseFake({
        body,
        title,
        authorId,
      });
    });

    it('Should call `post.create` when `postService.create` is called ', async () => {
      await postService.create(Object.create(null));

      expect(prisma.post.create).toBeCalledTimes(1);
    });

    it('Should return `PostResponseDto`', async () => {
      const post = await postService.create(createPostDto);
      log('resultado: '+ post)
      return expect(post).toMatchObject({
        id: expect.any(String),
        slug: 'posts',
        title,
        body,
        authorId,
        image: null,
      });
    });
  });
});
