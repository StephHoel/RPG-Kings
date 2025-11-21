'use client'
import { GenericTableProps } from '@/interfaces'

export function GenericTable<T>({ header: headers, rows, rowKey }: GenericTableProps<T>) {
  const keyFn = rowKey ?? ((r: any) => r.id ?? JSON.stringify(r))

  return (
    <div className="w-full overflow-x-auto">
      <table className="md:table bg-secondary border border-highlight rounded min-w-full text-sm">
        <thead className="block md:table-header-group bg-primary">
          <tr className="block md:table-row">
            {headers.map((h, i) => (
              <th
                key={h.key}
                className={`${
                  i === 0 ? 'block' : 'hidden md:table-cell'
                } text-left p-2 not-first:border-l`}
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
            <tr key={String(keyFn(row))} className="block md:table-row border-t">
              {headers.map((h) => (
                <td key={h.key} className="block md:table-cell p-2 not-first:border-l">
                  {/* Mobile: show only the first header label above the row's first cell */}
                  <div className="md:hidden mb-1 font-medium text-muted text-xs">{h.label}</div>
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
