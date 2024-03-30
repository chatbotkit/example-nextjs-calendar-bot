'use client'

import { useContext } from 'react'

import { ConversationContext } from '@chatbotkit/react'

export default function CaptureDetailsForm({ events }) {
  const { request } = useContext(ConversationContext)

  function captureDetails(event) {
    request('captureDetails', {
      name: event.target.form.name.value,
      email: event.target.form.email.value,
    })
  }

  return (
    <form className="flex flex-col gap-2 w-full">
      <label className="flex flex-col gap-1">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="rounded-md border border-gray-100 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="rounded-md border border-gray-100 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </label>
      <button
        type="button"
        onClick={captureDetails}
        className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white rounded-md px-3 py-2 focus:outline-none transition-all duration-300 ease-in-out"
      >
        Book Appointment
      </button>
    </form>
  )
}
