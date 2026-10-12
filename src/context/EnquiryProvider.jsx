import { useCallback, useMemo, useState } from 'react'
import { EnquiryContext } from './enquiryContext.js'

export function EnquiryProvider({ children }) {
    const [enquiry, setEnquiry] = useState({ isOpen: false, pack: '' })

    const openEnquiry = useCallback((pack = '') => setEnquiry({ isOpen: true, pack }), [])
    const closeEnquiry = useCallback(() => setEnquiry((current) => ({ ...current, isOpen: false })), [])

    const value = useMemo(
        () => ({ ...enquiry, openEnquiry, closeEnquiry }),
        [enquiry, openEnquiry, closeEnquiry],
    )

    return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}
