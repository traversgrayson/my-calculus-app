import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Math Resources' })

const resources = [
  {
    title: 'The Natural Logarithm',
    href: '/blog/naturallog',
    description: 'An introduction to the natural log and its properties.',
  },
  {
    title: 'The Power Rule',
    href: '/blog/powerrule',
    description: 'How to differentiate using the power rule.',
  },
  {
    title: 'Limits',
    href: '/blog/limits',
    description: 'An introduction to limits in calculus.',
  },
  {
    title: 'Trigonometric Derivatives',
    href: '/blog/trig',
    description: 'Derivatives of trigonometric functions.',
  },
  {
    title: "Newton's Method Calculator",
    href: '/newtons-method',
    description: "Interactive calculator for finding roots using Newton's Method.",
  },
]

export default function MathResourcesPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Math Resources
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          A collection of calculus notes and guides.
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {resources.map((resource) => (
          <li key={resource.href} className="py-8">
            <h2 className="text-2xl leading-8 font-bold tracking-tight">
              <Link href={resource.href} className="text-gray-900 dark:text-gray-100">
                {resource.title}
              </Link>
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{resource.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
