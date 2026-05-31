import "./List.css"
type Listprops<T> = {
    headers: string[]
    items: T[];
    render: (item: T) => React.ReactNode;
}

export default function List<T>({ headers, items, render}: Listprops<T>) {
    return(
        <div className="list-table">
            <div className="list-header">
                {headers.map((h) => (
                    <div key={h} className="list-cell header">
                        {h}
                    </div>
                ))}
            </div>

            {items.map((item, i) => (
                <div key={i} className="list-row">
                    {render(item)}
                </div>
            ))}
        </div>
    );
}