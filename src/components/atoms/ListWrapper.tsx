import React, { Fragment } from 'react'

export type KeyExtractor<T> = (item: T, index: number) => string | number

type ListWrapperProps<T> = {
    list: T[]
    keyExtractor: KeyExtractor<T>
    renderFallback?: () => React.ReactNode
    children: (item: T, index: number) => React.ReactNode
}

function ListWrapper<T>({
    list,
    children,
    keyExtractor,
    renderFallback,
}: ListWrapperProps<T>) {
    // check that the list is an array and that the keyExtractor is a function
    if (!Array.isArray(list) || typeof keyExtractor !== 'function') {
        return null
    }

    if (list.length === 0) {
        if (typeof renderFallback === 'function') {
            return renderFallback()
        }
        return null
    }

    return (
        <Fragment>
            {list.map((item, index) => {
                const key = keyExtractor(item, index)
                return <Fragment key={key}>{children(item, index)}</Fragment>
            })}
        </Fragment>
    )
}

export default ListWrapper
