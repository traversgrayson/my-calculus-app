import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Biography' })

export default function BiographyPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Biography
        </h1>
      </div>
      <div className="prose dark:prose-invert max-w-none pt-8 pb-8">
        <p>Write a short introduction about yourself here. Who are you? What do you do?</p>
        <h2>Background</h2>
        <p>Share your educational or professional background here.</p>
        <h2>Interests</h2>
        <p>Describe your interests and what drives you — mathematics, research, teaching, etc.</p>
      </div>
    </div>
  )
}
