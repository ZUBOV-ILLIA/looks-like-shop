import { Dispatch, SetStateAction } from "react";
import { Product } from "../types/products";

export const sorting = (arg: Product[], sorting: string, fn: any) => {
	fn([...arg].sort((a, b) => {
		switch (sorting) {
			case "by rating": {
				return b.rating - a.rating;
			}
			case "lowest to highest price": {
				return a.price - b.price;
			}
			case "highest to lowest price": {
				return b.price - a.price;
			}
			case "alphabet": {
				return a.title.localeCompare(b.title);
			}
			case "alphabet backwards": {
				return b.title.localeCompare(a.title);
			}

			default: {
				return 0;
			}
		}
	}));
};