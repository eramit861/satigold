import { useEffect, useRef, useState } from 'react'
import { SITE } from '../config/site.js'
import { useEnquiry } from '../context/enquiryContext.js'
import { BULK_PACK_OPTION, PACK_OPTIONS } from '../data/content.js'
import { buildEnquiryText, sendEnquiryEmail, telLink, whatsappLink } from '../utils/contact.js'
import Icon from './Icon.jsx'
import './EnquiryModal.css'

const INITIAL_FORM = {
    name: '',
    phone: '',
    email: '',
    city: '',
    pack: '',
    quantity: '1',
    message: '',
    website: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const FIELD_ORDER = ['name', 'phone', 'email']

const STATUS = {
    idle: 'idle',
    sending: 'sending',
    sentEmail: 'sent-email',
    sentWhatsapp: 'sent-whatsapp',
    error: 'error',
}

function validate(form) {
    const errors = {}
    const phoneDigits = form.phone.replace(/\D/g, '')

    if (!form.name.trim()) {
        errors.name = 'Please enter your name.'
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
        errors.phone = 'Please enter a valid 10-digit mobile number.'
    }
    if (form.email.trim() && !EMAIL_PATTERN.test(form.email.trim())) {
        errors.email = 'Please enter a valid email address.'
    }
    return errors
}

export default function EnquiryModal() {
    const { isOpen, pack, closeEnquiry } = useEnquiry()
    const dialogRef = useRef(null)
    const formRef = useRef(null)
    const pointerDownOnBackdropRef = useRef(false)
    const [form, setForm] = useState(INITIAL_FORM)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(STATUS.idle)
    const [wasOpen, setWasOpen] = useState(isOpen)

    /* Reset per-open state during render; typed form values are kept between opens. */
    if (isOpen !== wasOpen) {
        setWasOpen(isOpen)
        if (isOpen) {
            if (pack) {
                setForm((current) => ({ ...current, pack }))
            }
            setErrors({})
            setStatus(STATUS.idle)
        }
    }

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) {
            return
        }

        if (isOpen && !dialog.open) {
            dialog.showModal()
            document.documentElement.classList.add('sg-modal-open')
            formRef.current?.elements.namedItem('name')?.focus()
        } else if (!isOpen && dialog.open) {
            dialog.close()
        }
    }, [isOpen, pack])

    const handleDialogClose = () => {
        document.documentElement.classList.remove('sg-modal-open')
        closeEnquiry()
    }

    const handleBackdropPointerDown = (event) => {
        pointerDownOnBackdropRef.current = event.target === dialogRef.current
    }

    const handleBackdropClick = (event) => {
        if (pointerDownOnBackdropRef.current && event.target === dialogRef.current) {
            dialogRef.current.close()
        }
        pointerDownOnBackdropRef.current = false
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
        if (errors[name]) {
            setErrors((current) => ({ ...current, [name]: undefined }))
        }
    }

    const validateAndFocus = () => {
        const nextErrors = validate(form)
        setErrors(nextErrors)

        const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
        if (firstInvalid) {
            formRef.current?.elements.namedItem(firstInvalid)?.focus()
            return false
        }
        return true
    }

    const handleWhatsAppSend = () => {
        if (!validateAndFocus()) {
            return
        }
        window.open(whatsappLink(buildEnquiryText(form)), '_blank', 'noopener,noreferrer')
        setStatus(STATUS.sentWhatsapp)
    }

    const handleEmailSubmit = async (event) => {
        event.preventDefault()
        if (status === STATUS.sending || !validateAndFocus()) {
            return
        }

        if (form.website) {
            setStatus(STATUS.sentEmail)
            return
        }

        setStatus(STATUS.sending)
        try {
            await sendEnquiryEmail(form)
            setStatus(STATUS.sentEmail)
            setForm(INITIAL_FORM)
        } catch {
            setStatus(STATUS.error)
        }
    }

    const isSent = status === STATUS.sentEmail || status === STATUS.sentWhatsapp
    const isSending = status === STATUS.sending

    const fieldProps = (name) => ({
        id: `sg-enquiry-${name}`,
        name,
        value: form[name],
        onChange: handleChange,
        className: `sg-form__control${errors[name] ? ' is-invalid' : ''}`,
        'aria-invalid': errors[name] ? 'true' : undefined,
        'aria-describedby': errors[name] ? `sg-enquiry-${name}-error` : undefined,
    })

    const renderError = (name) =>
        errors[name] && (
            <span id={`sg-enquiry-${name}-error`} className="sg-form__error" role="alert">
                {errors[name]}
            </span>
        )

    return (
        <dialog
            ref={dialogRef}
            className="sg-modal"
            aria-labelledby="sg-enquiry-title"
            aria-describedby="sg-enquiry-subtitle"
            onClose={handleDialogClose}
            onPointerDown={handleBackdropPointerDown}
            onClick={handleBackdropClick}
        >
            <div className="sg-modal__panel">
                <div className="sg-modal__header">
                    <img src="/images/emblem.webp" width="200" height="214" alt="" className="sg-modal__emblem" />
                    <div>
                        <h2 id="sg-enquiry-title" className="sg-modal__title">Order &amp; Enquiry</h2>
                        <p id="sg-enquiry-subtitle" className="sg-modal__subtitle">
                            Send your details on WhatsApp or email. We will reply with price &amp; delivery.
                        </p>
                    </div>
                    <button type="button" className="sg-modal__close" aria-label="Close enquiry form" onClick={() => dialogRef.current?.close()}>
                        <Icon name="close" size={20} />
                    </button>
                </div>

                {isSent ? (
                    <div className="sg-modal__success" role="status">
                        <span className="sg-modal__success-icon">
                            <Icon name="checkCircle" size={44} />
                        </span>
                        <h3 className="sg-modal__success-title">
                            {status === STATUS.sentEmail ? 'Thank you! Enquiry sent.' : 'WhatsApp is ready!'}
                        </h3>
                        <p className="sg-modal__success-text">
                            {status === STATUS.sentEmail
                                ? 'We have received your enquiry by email and will get back to you shortly.'
                                : 'We opened WhatsApp with your order details. Just tap Send in WhatsApp to share it with us.'}
                        </p>
                        <div className="sg-modal__success-actions">
                            <button type="button" className="sg-btn sg-btn--outline" onClick={() => setStatus(STATUS.idle)}>
                                Back to Form
                            </button>
                            <button type="button" className="sg-btn sg-btn--primary" onClick={() => dialogRef.current?.close()}>
                                Done
                            </button>
                        </div>
                    </div>
                ) : (
                    <form ref={formRef} className="sg-modal__body sg-form" noValidate onSubmit={handleEmailSubmit}>
                        <div className="sg-form__grid">
                            <div className="sg-form__field">
                                <label className="sg-form__label" htmlFor="sg-enquiry-name">
                                    Full name <span aria-hidden="true">*</span>
                                </label>
                                <input type="text" autoComplete="name" required {...fieldProps('name')} />
                                {renderError('name')}
                            </div>

                            <div className="sg-form__field">
                                <label className="sg-form__label" htmlFor="sg-enquiry-phone">
                                    Mobile number <span aria-hidden="true">*</span>
                                </label>
                                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" required {...fieldProps('phone')} />
                                {renderError('phone')}
                            </div>

                            <div className="sg-form__field">
                                <label className="sg-form__label" htmlFor="sg-enquiry-email">Email</label>
                                <input type="email" inputMode="email" autoComplete="email" placeholder="Optional" {...fieldProps('email')} />
                                {renderError('email')}
                            </div>

                            <div className="sg-form__field">
                                <label className="sg-form__label" htmlFor="sg-enquiry-city">City / PIN code</label>
                                <input type="text" autoComplete="address-level2" placeholder="For delivery details" {...fieldProps('city')} />
                            </div>

                            <div className="sg-form__field">
                                <label className="sg-form__label" htmlFor="sg-enquiry-pack">Pack size</label>
                                <select {...fieldProps('pack')}>
                                    <option value="">Select a pack size</option>
                                    {PACK_OPTIONS.map((option) => (
                                        <option key={option.size} value={option.size}>
                                            {option.size}
                                        </option>
                                    ))}
                                    <option value={BULK_PACK_OPTION}>{BULK_PACK_OPTION}</option>
                                </select>
                            </div>

                            <div className="sg-form__field">
                                <label className="sg-form__label" htmlFor="sg-enquiry-quantity">Quantity (jars)</label>
                                <input type="number" inputMode="numeric" min="1" max="999" {...fieldProps('quantity')} />
                            </div>

                            <div className="sg-form__field sg-form__field--full">
                                <label className="sg-form__label" htmlFor="sg-enquiry-message">Message</label>
                                <textarea rows="3" placeholder="Any questions or special requests?" {...fieldProps('message')} />
                            </div>

                            <div className="sg-form__honeypot" aria-hidden="true">
                                <label htmlFor="sg-enquiry-website">Website</label>
                                <input type="text" id="sg-enquiry-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
                            </div>
                        </div>

                        {status === STATUS.error && (
                            <p className="sg-form__alert" role="alert">
                                We couldn&apos;t send the email right now. Please send your enquiry on WhatsApp or call{' '}
                                <a href={telLink()}>{SITE.contact.phoneDisplay}</a>.
                            </p>
                        )}

                        <div className="sg-form__actions">
                            <button type="button" className="sg-btn sg-btn--whatsapp sg-btn--lg" onClick={handleWhatsAppSend}>
                                <Icon name="whatsapp" size={20} />
                                Send on WhatsApp
                            </button>
                            <button type="submit" className="sg-btn sg-btn--primary sg-btn--lg" disabled={isSending}>
                                <Icon name={isSending ? 'loader' : 'mail'} size={20} className={isSending ? 'sg-spin' : ''} />
                                {isSending ? 'Sending…' : 'Send by Email'}
                            </button>
                        </div>

                        <p className="sg-form__note">
                            Prefer to talk? Call <a href={telLink()}>{SITE.contact.phoneDisplay}</a>
                        </p>
                    </form>
                )}
            </div>
        </dialog>
    )
}
