export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"]
export const STATUS_COLORS: any = {
    "CANCELLED": "red.500",
    "RETURNED": "purple.500",
    "PENDING": "gray.500",
    "ON THE WAY": "orange.500",
    "FULFILLED": "green.500",
    "REPLACE - ON THE WAY": "orange.600",
    "REPLACE - FULFILLED": "green.600"
}

export const STATUS_TEXT: any = {
    "CANCELLED": "Your Order has been cancelled.",
    "RETURNED": "Order Revised",
    "ON THE WAY": "Order Shipped",
    "FULFILLED": "Order Delivered",
    "REPLACE - ON THE WAY": "Replaced Items Shipped",
    "REPLACE - FULFILLED": "Replaced Items Delivered"
}
