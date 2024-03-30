# Appointment Scheduling Bot

This repository contains the code for an appointment scheduling chatbot designed to assist in managing calendar bookings. The chatbot, built with the ChatBotKit SDK, facilitates the booking of appointments following specific rules and guidelines to ensure an efficient and conflict-free scheduling process.

https://github.com/chatbotkit/example-nextjs-calendar-bot/assets/5363404/3aaf362f-3dc4-4b11-93dd-f14248309059

## Features

- **Appointment Scheduling**: Users can schedule appointments within predefined time slots, ensuring adherence to the specified availability and rules set for Dr. Smith.
- **Dynamic Calendar Handling**: The chatbot integrates a calendar system that lists available slots and manages bookings dynamically.
  User Interaction: Through UI components, the chatbot captures user details and appointment preferences, providing a seamless booking experience.

## Technology Stack

- **ChatBotKit SDK**: For building the chatbot logic and handling conversation flow.
- **React**: For UI components that interact with the user, such as forms for capturing appointment details and slot selection.

## Setup

1. Ensure you have Node.js installed.
2. Clone this repository.
3. Install dependencies by running npm install.
4. Set the `CHATBOTKIT_API_SECRET` environment variable with your ChatBotKit API secret.
5. Optionally, set the `CHATBOTKIT_MODEL` environment variable to specify the model used for conversation (default is GPT-3.5 Turbo).

## Usage

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The system will automatically handle appointment bookings based on the following rules:

- Appointments can only be booked between 11 am and 5 pm.
- Dr. Smith must have at least 30 minutes between appointments.
- A maximum of 3 appointments per day, 5 per week, and 10 per month is enforced.
- Each appointment lasts 30 minutes.
- Appointments can be booked up to a month in advance.

The chatbot uses several custom functions to interact with the user, fetch calendar events, show available slots, and capture booking details. These include:

- **getCalendarEvents**: Fetches current calendar events.
- **showSlotSelectionForm**: Displays a form for slot selection.
- **captureSlot**: Captures the selected slot for booking.
- **showContactDetailsForm**: Displays a form to capture user contact details.
- **captureDetails**: Captures the name and email of the person booking the appointment.
- **bookAppointment**: Finalizes the booking and updates the calendar.

## Learn More

To learn more about ChatBotKit and relevent SDKs look at the following resources:

- [ChatBotKit Documentation](https://chatbotkit.com/docs) - learn about ChatBotKit
- [ChatBotKit JavaScript SDKs](https://github.com/chatbotkit/node-sdk) - learn about used SDKs

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com).

## Contributing

Contributions to enhance the chatbot's functionality or address issues are welcome. Please follow the standard pull request process for contributions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
