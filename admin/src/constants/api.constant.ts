export const LOGIN = '/auth/signin';

export const EDIT_PRODUCT = '/products/edit';
export const GET_PRODUCTS = '/products/view_all';
export const CREATE_PRODUCT = '/products/create';
export const GET_PRODUCT = '/products/view';
export const DELETE_PRODUCT = '/products/delete';
export const UPLOAD_MEDIA = '/products/upload';


export const GET_CATEGORIES = '/collections/category/get_categories'
export const CREATE_CATEGORY = '/collections/category/create_category'
export const EDIT_CATEGORY = '/collections/category/update_category?slug='
export const DELETE_CATEGORY = '/collections/category/delete_category'

export const GET_PAGES = '/collections/pages/get_all'
export const GET_PAGE = '/collections/pages/get_one?slug='
export const CREATE_PAGE = '/collections/pages/create'
export const EDIT_PAGE = '/collections/pages/update?slug='
export const DELETE_PAGE = '/collections/pages/delete'

export const GET_DISCOUNTS = '/collections/discounts/get_all_discounts'
export const GET_DISCOUNT = '/collections/discounts/get_one_discount?code='
export const CREATE_DISCOUNT = '/collections/discounts/create_discount'
export const EDIT_DISCOUNT = '/collections/discounts/update_discount?code='
export const DELETE_DISCOUNT = '/collections/discounts/delete_discount?code='

export const GET_ZONES = '/collections/shipping/get_all'
export const GET_ZONE = '/collections/shipping/get_one?slug='
export const CREATE_ZONE = '/collections/shipping/create_zone'
export const EDIT_ZONE = '/collections/shipping/update_zone?slug='
export const DELETE_ZONE = '/collections/shipping/deletet?slug='

export const VIEW_CUSTOMERS = '/collections/customers/get_all'
export const VIEW_PROFILE = '/collections/customers/get_profile?user='
export const VIEW_MY_PROFILE = '/collections/customers/get_user_profile'

export const GET_ORDERS = '/collections/orders/get_all'
export const EDIT_ORDER = '/collections/orders/edit?id='
export const VIEW_ORDER = '/collections/orders/get?id='
export const UPDATE_ORDER = '/collections/orders/edit?id='
export const COUNT_ORDER = '/collections/orders/count'
export const GET_SALES = '/collections/orders/sales'

export const GET_CHANNELS = '/collections/channels/get_all_channels'
export const GET_TYPES = 'products/type/viewall'