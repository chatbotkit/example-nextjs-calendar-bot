'use server'

import AvailabilitySlotsForm from '@/components/functions/AvailabilitySlotsForm'
import CaptureDetailsForm from '@/components/functions/CaptureDetailsForm'

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
- Be brief and to the point.
- Do not ask for unnecessary information or repeat yourself.
- Do not disclose Dr. Smith's calendar to the user, only show available slots.
- Only show up-to 4 available slots at a time.

STEPS:
0. Great the user by explaining your purpose if you haven't done so already.
1. Try to find a suitable slot for booking an appointment.
 - Use the getCalendar function to get a list of the current calendar events.
 - Describe the calendar events to the user.
 - Use the showAvailaibilitySlotsForm function to show available slots for booking an appointment.
2. Ensure that the new appointment is within the rules.
3. Capture the name and email of the person booking the appointment with the capture details form.
4. Finally book the appointment.
5. Explain the appointment details to the user.
6. Warn that a confirmation email will be sent to the user.

Failure to follow these rules will result in a decline of the appointment and customer dissatisfaction.`,

    model: 'gpt-3.5-turbo',

    messages,

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
        name: 'showSlotForm',
        description: 'Show available slots for booking an appointment.',
        parameters: {
          type: 'object',
          properties: {
            slots: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  day: {
                    type: 'string',
                    description:
                      'The day of the week or date if the appointment is in the future.',
                  },
                  time: {
                    type: 'string',
                    description:
                      'The time of the appointment in 24-hour format.',
                  },
                  duration: {
                    type: 'number',
                    description: 'The duration of the appointment in minutes.',
                  },
                },
                required: ['date', 'time', 'duration'],
              },
            },
          },
          required: ['slots'],
        },
        handler: async ({ slots }) => {
          return {
            children: <AvailabilitySlotsForm slots={slots} />,
            result: {
              status: 'success',
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
            day: {
              type: 'string',
              description:
                'The day of the week or date if the appointment is in the future.',
            },
            time: {
              type: 'string',
              description: 'The time of the appointment in 24-hour format.',
            },
            duration: {
              type: 'number',
              description: 'The duration of the appointment in minutes.',
            },
          },
          required: ['date', 'time', 'duration'],
        },
        handler: async ({ day, time, duration }) => {
          return {
            result: {
              status: 'success',
              data: {
                day,
                time,
                duration,
              },
            },
          }
        },
      },

      // This function will be called to show a form to capture the name and email of the person booking the appointment.
      {
        name: 'showDetailsForm',
        description:
          'Shows a form to capture the name and email of the person booking the appointment.',
        parameters: {},
        handler: async () => {
          return {
            children: <CaptureDetailsForm />,
            result: {
              status: 'success',
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
              status: 'success',
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
