import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answers Unit Test', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to answer an question', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '2',
      content: 'Nova Resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
