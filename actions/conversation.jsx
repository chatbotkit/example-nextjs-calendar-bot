'use server'

import CaptureDetailsForm from '@/components/functions/CaptureDetailsForm'
import SlowSelectionForm from '@/components/functions/SlotSelectionForm'

import { streamComplete } from '@chatbotkit/react/actions/complete'
import { ChatBotKit } from '@chatbotkit/sdk'

const cbk = new ChatBotKit({
  secret: process.env.CHATBOTKIT_API_SECRET,
})

const calendar = [
  { id: 1, date: '2024-03-01', time: '11:00', duration: 60 },
  { id: 2, date: '2024-03-02', time: '14:00', duration: 30 },
  { id: 3, date: '2024-03-03', time: '15:00', duration: 45 },
  { id: 4, date: '2024-03-04', time: '16:00', duration: 30 },
  { id: 5, date: '2024-03-05', time: '17:00', duration: 60 },
]

export async function complete({ messages }) {
  return streamComplete({
    client: cbk.conversation,

    // The backstory is the heart of the conversation. It provides the context
    // and rules for the conversational AI agent to follow. In this example, the
    // backstory is a simple appointment booking system for a virtual assistant.

    backstory: `You are a virtual assistant that help with managing calendar bookings with Dr. Smith.

Today's date is 2024-03-01.

RULES:
- Always great the user by explaining your purpose.
- Only book appointments between 11am and 5pm.
- Ensure that Dr. Smith has at least 30 minutes between appointments.
- Dr. Smith can only have a maximum of 3 appointments per day.
- Dr. Smith can only have a maximum of 5 appointments per week.
- Dr. Smith can only have a maximum of 10 appointments per month.
- Each appointment is 30 minutes long.
- Only show up-to 4 available slots at a time.
- You can only book appointments 1 month in advance.
- Do not disclose Dr. Smith's calendar to the user, only show available slots.
- Be brief and to the point.
- Do not ask for unnecessary information or repeat yourself.

STEPS:
1. Great the user by explaining your purpose if you haven't done so already.
2. Try to find a suitable slot for booking an appointment.
 - Use the getCalendar function to get a list of the current calendar events.
 - Describe the calendar events to the user.
 - Use the showSlotSelectionForm function to show available slots for booking an appointment.
3. Ensure that the new appointment is within the rules.
4. Capture the name and email of the person booking the appointment with the capture details form.
5. Finally book the appointment.
6. Explain the appointment details to the user.
7. Warn that a confirmation email will be sent to the user.

You have acccess to a number of UI functions to help you with getting information from the user. These function start with the prefix "show". The UI functions will display and interactive form to the user where user input is expected. Akways use these functions to get the required information from the user.

Failure to follow these rules will result in a decline of the appointment and customer dissatisfaction.`,

    // We allow configuration of the model to be used for the conversation by
    // setting the CHATBOTKIT_MODEL environment variable. The default model is
    // GPT-3.5 Turbo.

    model: process.env.CHATBOTKIT_MODEL || 'gpt-3.5-turbo',

    // Pass the messages to the conversation.

    messages,

    // Pass a list of functions that the AI agent can call to interact with.

    functions: [
      // This function will be called to get a list of the current calendar events.
      {
        name: 'getCalendarEvents',
        description: 'Get a list of the current calendar events.',
        parameters: {},
        handler: async () => {
          return {
            result: {
              status: 'success',
              data: {
                calendar,
              },
            },
          }
        },
      },

      // This function will be called to show available slots for booking an appointment.
      {
        name: 'showSlotSelectionForm',
        description: 'Show slots selection form for booking an appointment.',
        parameters: {
          type: 'object',
          properties: {
            slots: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  slot: {
                    type: 'string',
                    description:
                      'A string representing the day plus time and duration of the slot. The day can be the day of the week (Monday to Friday) or date if the appointment is in the future. For example, "Monday 11:00 - 11:30" or "March 20th 11:00 - 11:30".',
                  },
                },
                required: ['slot'],
              },
            },
          },
          required: ['slots'],
        },
        handler: async ({ slots }, { controllers }) => {
          controllers.continuation.abort()

          return {
            children: <SlowSelectionForm slots={slots} />,
            result: {
              status: 'waiting for user input',
            },
          }
        },
      },

      // This function will be called to capture the slot for booking an appointment.
      {
        name: 'captureSlot',
        description: 'Capture the slot for booking an appointment.',
        parameters: {
          type: 'object',
          properties: {
            slot: {
              type: 'string',
              description:
                'A string representing the day plus time and duration of the slot. The day can be the day of the week (Monday to Friday) or date if the appointment is in the future. For example, "Monday 11:00 - 11:30" or "March 20th 11:00 - 11:30".',
            },
          },
          required: ['date', 'time', 'duration'],
        },
        handler: async ({ slot }) => {
          return {
            result: {
              status: slot ? 'success' : 'failure',
              data: {
                slot,
              },
            },
          }
        },
      },

      // This function will be called to show a form to capture the name and email of the person booking the appointment.
      {
        name: 'showContactDetailsForm',
        description:
          'Shows a form to capture the name and email of the person booking the appointment.',
        parameters: {},
        handler: async (_, { controllers }) => {
          controllers.continuation.abort()

          return {
            children: <CaptureDetailsForm />,
            result: {
              status: 'waiting for user input',
            },
          }
        },
      },

      // This function will be called to capture the name and email of the person booking the appointment.
      {
        name: 'captureDetails',
        description:
          'Capture the name and email of the person booking the appointment.',
        parameters: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
          required: ['name', 'email'],
        },
        handler: async ({ name, email }) => {
          return {
            result: {
              status: name && email ? 'success' : 'failure',
              data: {
                name,
                email,
              },
            },
          }
        },
      },

      // This is the final function that will be called to book the appointment.
      {
        name: 'bookAppointment',
        description: 'Book the appointment.',
        parameters: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
            },
            time: {
              type: 'string',
            },
            duration: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
          required: ['date', 'time', 'duration', 'name', 'email'],
        },
        handler: async ({ date, time, duration, name, email }) => {
          calendar.push({ id: calendar.length + 1, date, time, duration })

          return {
            result: {
              status: 'success',
              data: {
                date,
                time,
                duration,
              },
            },
          }
        },
      },
    ],
  })
}
