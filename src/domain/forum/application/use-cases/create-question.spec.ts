import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeCreateQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('it should be able to create a question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeCreateQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova Pergunta',
    content: 'Conteúdo da pergunta',
  })

  expect(question.content).toBeTruthy()
})
