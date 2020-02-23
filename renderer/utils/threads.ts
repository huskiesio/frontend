import {StuffedThread} from '../types'

export const loadThreads = async (): Promise<StuffedThread[]> => {
  const seed = [
    {
      name: 'Test Thread',
      description: 'Catchy tagline',
      memberIds: ['1'],
      id: '1',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      messages: [
        {
          senderId: '1',
          threadId: '1',
          payload: Buffer.from('**Bolded text**'),
          id: '1',
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime()
        }
      ]
    },
    {
      name: 'Thread 2',
      description: 'Catchy tagline',
      memberIds: ['1'],
      id: '2',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      messages: [
        {
          senderId: '1',
          threadId: '2',
          payload: Buffer.from('**Different text**'),
          id: '4',
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime()
        }
      ]
    }
  ];

  return seed;
}
