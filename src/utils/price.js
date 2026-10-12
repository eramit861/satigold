import { PACK_OPTIONS } from '../data/content.js'

const rupees = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

/** 1499 -> "₹1,499" */
export const formatPrice = (amount) => rupees.format(amount)

export const findPack = (size) => PACK_OPTIONS.find((pack) => pack.size === size)

/** "500 g" -> "500 g - ₹799"; sizes without a price (e.g. bulk) are returned as-is. */
export function packLabel(size) {
    const pack = findPack(size)
    return pack ? `${pack.size} - ${formatPrice(pack.price)}` : size
}
