import { BiCreditCard, BiListOl, BiNews, BiPurchaseTag, BiRocket, BiUserCircle } from "react-icons/bi";
import { GoPackage } from "react-icons/go";

export const nav = [
        {
            name: "Products",
            key: "products",
            link: "/products",
            is_external: false,
            icon: GoPackage,
        },
        {
            name: "Orders",
            link: "/orders",
            key: "orders",
            is_external: false,
            icon: BiCreditCard
        },
        // {
        //     name: "Discounts",
        //     link: "/discounts",
        //     key: "discounts",
        //     is_external: false,
        //     icon: BiPurchaseTag
        // },
        {
            name: "Categories",
            link: "/categories",
            key: "categories",
            is_external: false,
            icon: BiListOl
        },
        {
            name: "Customers",
            link: "/customers",
            key: "customers",
            is_external: false,
            icon: BiUserCircle
        },
        {
            name: "Pages",
            link: "/pages",
            key: "pages",
            is_external: false,
            icon: BiNews
        },
        {
            name: "Shipping",
            link: "/shipping",
            key: "shipping",
            is_external: false,
            icon: BiRocket
        }
]