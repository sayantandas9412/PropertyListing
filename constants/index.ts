export const DEFAULT_LATITUDE = 48.864716;
export const DEFAULT_LONGITUDE = 2.349014;
export const POST_API =
  "curl -L -X POST 'https://www.vrbo.com/serp/g' \
-H 'Content-Type: application/json'";

export const MIN_BEDROOM_VALUE = 0;
export const MAX_BEDROOM_VALUE = 5;

export const MIN_BATHROOM_VALUE = 0;
export const MAX_BATHROOM_VALUE = 4;

export const MIN_SLEEP_VALUE = 1;
export const MAX_SLEEP_VALUE = 20;

export const filtersHeader = [
  {
    filter: "Bedrooms",
    minQuantity: MIN_BEDROOM_VALUE,
    maxQuantity: MAX_BEDROOM_VALUE,
    star5: false,
    star4: false,
    star0: false,
  },
  {
    filter: "Bathrooms",
    minQuantity: MIN_BATHROOM_VALUE,
    maxQuantity: MAX_BATHROOM_VALUE,
    star5: false,
    star4: false,
    star0: false,
  },
  {
    filter: "Sleeps",
    minQuantity: MIN_SLEEP_VALUE,
    maxQuantity: MAX_SLEEP_VALUE,
    star5: false,
    star4: false,
    star0: false,
  },
];
