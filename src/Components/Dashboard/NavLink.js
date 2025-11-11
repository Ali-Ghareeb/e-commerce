import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons/faLayerGroup";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";

export const links = [
    {
        name: "Users",
        path: "/dashboard/users",
        icon: faUsers,
        role: "1995",
    },
    {
        name: "Add Users",
        path: "/dashboard/user/add",
        icon: faPlus,
        role: "1995",
    },
    {
        name: "Categories",
        path: "/dashboard/categories",
        icon: faLayerGroup,
        role: ["1995", "1996"],
    },
    {
        name: "Add Category",
        path: "/dashboard/category/add",
        icon: faPlus,
        role: ["1995", "1996"],
    },
    {
        name: "Products",
        path: "/dashboard/products",
        icon: faProductHunt,
        role: ["1995", "1996"],
    },
    {
        name: "Add Product",
        path: "/dashboard/product/add",
        icon: faPlus,
        role: ["1995", "1996"],
    },
    {
        name: "Writers",
        path: "/dashboard/writer",
        icon: faPlus,
        role: ["1995", "1996"]
    },
];
