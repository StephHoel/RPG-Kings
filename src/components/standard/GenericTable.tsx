'use client'
import { GenericTableProps } from '@/interfaces'

export function GenericTable<T>({ header: headers, rows, rowKey }: GenericTableProps<T>) {
  const keyFn = rowKey ?? ((r: any) => r.id ?? JSON.stringify(r))

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full md:table rounded border border-highlight bg-secondary text-sm">
        <thead className="bg-primary md:table-header-group block">
          <tr className="md:table-row block">
            {headers.map((h, i) => (
              <th
                key={h.key}
                className={`${i === 0 ? 'block' : 'hidden md:table-cell'} text-left p-2 not-first:border-l`}
              >
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

        <tbody className="md:table-row-group">
          {rows.map((row) => (
            <tr key={String(keyFn(row))} className="border-t md:table-row block">
              {headers.map((h) => (
                <td key={h.key} className="p-2 not-first:border-l block md:table-cell">
                  {/* Mobile: show only the first header label above the row's first cell */}
                  <div className="md:hidden text-xs font-medium text-muted mb-1">{h.label}</div>
                  <div className="text-sm">{h.render ? h.render(row) : (row as any)[h.key]}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
