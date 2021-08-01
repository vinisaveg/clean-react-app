import { SurveyModel } from '../models'

import faker from 'faker'

export const mockSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    answers: [
      {
        answer: faker.random.words(5),
        image: faker.internet.url()
      },
      {
        answer: faker.random.words(6)
      }
    ],
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean()
  }
]
