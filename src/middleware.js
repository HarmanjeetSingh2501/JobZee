import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/','/onboard']
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
