import { InMemoryAnswersCommentsRepository } from '@/test/repositories/in-memory-answers-comments-repository'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from '@/test/factories/make-answer'

let answersRepository: InMemoryAnswersRepository
let answersCommentsRepository: InMemoryAnswersCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer Unit Test', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    answersCommentsRepository = new InMemoryAnswersCommentsRepository()
    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answersCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'Conteúdo teste',
    })

    expect(answersCommentsRepository.items[0].content).toEqual('Conteúdo teste')
  })
})
