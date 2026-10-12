import { useEffect, useState } from 'react'

/** Returns the id of the section currently in the middle of the viewport. `ids` must be a stable array. */
export default function useActiveSection(ids) {
    const [activeId, setActiveId] = useState(ids[0])

    useEffect(() => {
        const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
        if (sections.length === 0 || !('IntersectionObserver' in window)) {
            return undefined
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id)
                    }
                })
            },
            { rootMargin: '-45% 0px -50% 0px' },
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [ids])

    return activeId
}
