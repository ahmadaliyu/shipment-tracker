import { LoginResponse } from "@/interfaces";
import { appApi } from "./appApi";
import { ShipmentDetailsList } from "@/interfaces/user";

export const authAPI = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints(build) {
    return {
      login: build.mutation<LoginResponse, { formdata: FormData }>({
        query(arg) {
          return {
            url: "api/method/login",
            method: "POST",
            body: arg.formdata,
          };
        },
      }),
    };
  },
});

export const { useLoginMutation } = authAPI;
