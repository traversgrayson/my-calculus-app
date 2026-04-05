'use client'

import { useState } from 'react'
import * as math from 'mathjs'

interface IterationRow {
  iteration: number
  x: number
  fx: number
  fpx: number
  xNext: number
}

function runNewtonsMethod(
  equation: string,
  initialGuess: number,
  maxIterations: number
): IterationRow[] {
  const compiled = math.parse(equation).compile()
  const derivativeExpr = math.derivative(equation, 'x')
  const compiledDeriv = derivativeExpr.compile()

  const rows: IterationRow[] = []
  let x = initialGuess

  for (let i = 1; i <= maxIterations; i++) {
    const fx = compiled.evaluate({ x }) as number
    const fpx = compiledDeriv.evaluate({ x }) as number

    if (Math.abs(fpx) < 1e-14) {
      throw new Error(`Derivative is zero at x = ${x}. Newton's Method cannot continue.`)
    }

    const xNext = x - fx / fpx
    rows.push({ iteration: i, x, fx, fpx, xNext })

    if (Math.abs(xNext - x) < 1e-12) break
    x = xNext
  }

  return rows
}

function fmt(n: number): string {
  if (!isFinite(n)) return String(n)
  return Math.abs(n) < 1e-10 ? n.toExponential(6) : Number(n.toPrecision(10)).toString()
}

export default function NewtonsMethodPage() {
  const [equation, setEquation] = useState('x^2 - 2')
  const [guess, setGuess] = useState('1')
  const [iterations, setIterations] = useState('10')
  const [rows, setRows] = useState<IterationRow[]>([])
  const [error, setError] = useState('')
  const [hasRun, setHasRun] = useState(false)

  function handleCalculate() {
    setError('')
    setRows([])
    setHasRun(true)

    const x0 = parseFloat(guess)
    const n = parseInt(iterations, 10)

    if (isNaN(x0)) {
      setError('Initial guess must be a number.')
      return
    }
    if (isNaN(n) || n < 1 || n > 100) {
      setError('Iterations must be a number between 1 and 100.')
      return
    }

    try {
      const result = runNewtonsMethod(equation.trim(), x0, n)
      setRows(result)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Could not parse equation. Check your syntax.')
    }
  }

  const root = rows.length > 0 ? rows[rows.length - 1].xNext : null
  const converged = rows.length > 0 && Math.abs(rows[rows.length - 1].fx) < 1e-10

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Newton's Method Calculator
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Find roots of f(x) = 0 using Newton's Method.
        </p>
      </div>

      <div className="space-y-8 pt-8 pb-8">
        {/* Inputs */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <label
              htmlFor="equation"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Equation f(x)
            </label>
            <input
              id="equation"
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g. x^2 - 2"
              className="focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Use <code className="font-mono">x</code> as the variable. Supported:{' '}
              <code className="font-mono">+ - * / ^ sqrt() sin() cos() tan() log() exp()</code>
            </p>
          </div>

          <div>
            <label
              htmlFor="guess"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Initial Guess (x₀)
            </label>
            <input
              id="guess"
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="iterations"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Iterations
            </label>
            <input
              id="iterations"
              type="number"
              value={iterations}
              min={1}
              max={100}
              onChange={(e) => setIterations(e.target.value)}
              className="focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleCalculate}
              className="bg-primary-500 hover:bg-primary-600 w-full rounded-md px-4 py-2 font-medium text-white transition-colors"
            >
              Calculate
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Result summary */}
        {hasRun && !error && rows.length > 0 && (
          <div
            className={`rounded-md border px-4 py-3 text-sm ${
              converged
                ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}
          >
            {converged ? (
              <>
                Converged in <strong>{rows.length}</strong> iteration{rows.length !== 1 ? 's' : ''}.
                Approximate root: <strong className="font-mono">{fmt(root!)}</strong>
              </>
            ) : (
              <>
                Did not fully converge in {rows.length} iterations. Best estimate:{' '}
                <strong className="font-mono">{fmt(root!)}</strong>
              </>
            )}
          </div>
        )}

        {/* Iteration table */}
        {rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  <th className="py-2 pr-6 font-medium">n</th>
                  <th className="py-2 pr-6 font-medium">xₙ</th>
                  <th className="py-2 pr-6 font-medium">f(xₙ)</th>
                  <th className="py-2 pr-6 font-medium">f′(xₙ)</th>
                  <th className="py-2 font-medium">xₙ₊₁</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((row) => (
                  <tr key={row.iteration} className="text-gray-900 dark:text-gray-100">
                    <td className="py-2 pr-6 font-mono">{row.iteration}</td>
                    <td className="py-2 pr-6 font-mono">{fmt(row.x)}</td>
                    <td className="py-2 pr-6 font-mono">{fmt(row.fx)}</td>
                    <td className="py-2 pr-6 font-mono">{fmt(row.fpx)}</td>
                    <td className="py-2 font-mono">{fmt(row.xNext)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Formula reference */}
        <div className="rounded-md border border-gray-200 px-4 py-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          <p className="mb-1 font-medium text-gray-700 dark:text-gray-300">Formula</p>
          <p className="font-mono">x&#8345;₊₁ = x&#8345; − f(x&#8345;) / f′(x&#8345;)</p>
          <p className="mt-2">
            The derivative f′(x) is computed symbolically using{' '}
            <a
              href="https://mathjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600"
            >
              mathjs
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
