import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { zh_CN } from '@faker-js/faker'
import { NotAllowedError } from './errors/not-allowed-error'

let questionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question Unit Test', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await questionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(questionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another author', async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID('question-1'))

    await questionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
