'use server'

import CalendarEvents from '@/components/functions/CalendarEvents'

import { streamComplete } from '@chatbotkit/react/actions/complete'
import { ChatBotKit } from '@chatbotkit/sdk'

const cbk = new ChatBotKit({
  secret: process.env.CHATBOTKIT_API_SECRET,
})

const events = [
  { id: 1, title: 'Meeting with Jane Doe' },
  { id: 2, title: 'Meeting with Jill Doe' },
]

export async function complete({ messages }) {
  return streamComplete({
    client: cbk.conversation,

    model: 'gpt-4-turbo',

    messages,

    functions: [
      function () {
        const parameters = {}

        return {
          name: 'getCalendarEvents',
          description: 'Get a list of calendar events',
          parameters: parameters,
          handler: async () => {
            return {
              children: <CalendarEvents events={events} />,

              result: {
                events,
              },
            }
          },
        }
      },

      function () {
        const parameters = {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'The ID of the event to decline',
            },
          },
          required: ['id'],
        }

        return {
          name: 'declineCalendarEvent',
          description: 'Decline a calendar event',
          parameters: parameters,
          handler: async ({ id }) => {
            const eventIndex = events.findIndex((event) => event.id === id)

            if (eventIndex < 0) {
              return `The event with ID ${id} was not found`
            }

            events.splice(eventIndex, 1)

            return `The event with ID ${id} was declined`
          },
        }
      },
    ],
  })
}
