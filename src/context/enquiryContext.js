import { createContext, useContext } from 'react'

export const EnquiryContext = createContext(null)

/** Access the enquiry popup state: { isOpen, pack, openEnquiry(pack?), closeEnquiry() }. */
export function useEnquiry() {
    const context = useContext(EnquiryContext)
    if (!context) {
        throw new Error('useEnquiry must be used inside <EnquiryProvider>')
    }
    return context
}
