type methods = "post" | "patch" | "get" | "delete";

export const setId = ({ id, url }: { id: string | number; url: string }) => {
  return url.replace(":id", String(id));
};
export interface IRoute {
  method: methods;
  url: string;
}

interface IBackendRoutes {
  auth: {
    guest: IRoute;
    forgetPassword: IRoute;
  };
}

export const BACKEND_ROUTES: IBackendRoutes = {
  auth: {
    guest: {
      method: "post",
      url: "/users/create",
    },
    forgetPassword: {
      method: "post",
      url: "/auth/register",
    },
  },
};
