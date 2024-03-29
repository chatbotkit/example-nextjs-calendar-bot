import { complete } from '@/actions/conversation'
import ChatArea from '@/components/ChatArea'
import '@/components/functions'

import ConversationManager from '@chatbotkit/react/components/ConversationManager'

export default function Page() {
  return (
    <ConversationManager endpoint={complete}>
      <div className="mx-auto w-full max-w-2xl py-20 space-y-6">
        <p>
          Please use the chat area below to book an appointment with me. My
          intelligent assistant will help you with selecting the right time and
          date for your appointment.
        </p>
        <ChatArea />
        <p className="text-center text-gray-500 text-sm">
          Made with ❤️ by{' '}
          <a
            href="https://chatbotkit.com"
            target="_blank"
            className="text-blue-500"
          >
            ChatBotKit
          </a>
        </p>
      </div>
    </ConversationManager>
  )
}
