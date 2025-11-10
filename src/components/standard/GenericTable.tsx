'use client'
import { GenericTableProps } from '@/interfaces'

export function GenericTable<T>({ header: headers, rows, rowKey }: GenericTableProps<T>) {
  const keyFn = rowKey ?? ((r: any) => r.id ?? JSON.stringify(r))

  return (
    <table className="min-w-full rounded border border-highlight bg-secondary text-sm">
      <thead className="bg-primary">
        <tr>
          {headers.map(h => (
            <th key={h.key} className='text-left p-2 not-first:border-l'>
              {h.onHeaderClick ? (
                <button onClick={h.onHeaderClick} className="flex items-center space-x-2">
                  <span>{h.label}</span>
                </button>
              ) : (
                h.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={String(keyFn(row))} className="border-t">
            {headers.map(h => (
              <td key={h.key} className='p-2 not-first:border-l'>
                {h.render ? h.render(row) : (row as any)[h.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
