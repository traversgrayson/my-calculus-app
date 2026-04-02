import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Contact' })

export default function ContactPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Contact
        </h1>
      </div>
      <div className="prose dark:prose-invert max-w-none pt-8 pb-8">
        <p>Feel free to reach out through any of the channels below.</p>
        <ul>
          <li>
            <strong>Email:</strong> your-email@example.com
          </li>
          <li>
            <strong>GitHub:</strong>{' '}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              github.com/your-username
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{' '}
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/your-profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
