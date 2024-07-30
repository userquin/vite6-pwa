import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function Root() {
    const [count, setCount] = React.useState(0)

    useRegisterSW({ immediate: true })

    const [hydrated, setHydrated] = React.useState(false)
    React.useEffect(() => {
        setHydrated(true)
    }, [])

    return (
        <div>
            <div>hydrated: {String(hydrated)}</div>
            <div>Count: {count}</div>
            <button onClick={() => setCount((v) => v - 1)}>-1</button>
            <button onClick={() => setCount((v) => v + 1)}>+1</button>
        </div>
    )
}
