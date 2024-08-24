import {
  RequestDetails,
  ShipmentDetailsList,
  ShipmentStatusList,
} from "@/interfaces/user";
import Config from "@/utils/config";
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: Config.apiUrl,
});

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: retry(baseQuery, { maxRetries: 4 }),
  tagTypes: ["PROFILE", "SHIPMENTS"],
  endpoints: (builder) => ({
    getShipments: builder.mutation<ShipmentDetailsList, RequestDetails>({
      query(arg) {
        return {
          url: "api/method/frappe.client.get_list",
          method: "GET", // explicitly specify the method
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          params: arg,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetShipmentsMutation } = appApi;
