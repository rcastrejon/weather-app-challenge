interface SectionProps {
  title: string
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h3>
      </div>
      <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </dl>
    </>
  )
}
