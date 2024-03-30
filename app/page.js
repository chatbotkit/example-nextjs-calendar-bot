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
        <p className="text-center text-gray-500 text-sm">
          <a
            className="flex flex-row justify-center items-center gap-2 text-blue-500"
            href="https://github.com/chatbotkit/example-nextjs-calendar-bot"
            target="_blank"
            title="Fork this example on GitHub"
          >
            <svg
              className="w-[1em] h-[1em]"
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.86 2.33.66.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            <span>Fork on GitHub</span>
          </a>
        </p>
      </div>
    </ConversationManager>
  )
}
