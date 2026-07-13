import { t as createServerFn } from "./createServerFn-CIHAFgYl.js";
import { t as createSsrRpc } from "./createSsrRpc-DTpWICjJ.js";
//#region src/lib/auth.functions.ts
var checkAuth = createServerFn({ method: "GET" }).handler(createSsrRpc("c742807c24d8cf24409ab05ee479814cabfe4b92c8f6ea72847513d368654c35"));
var login = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("8df20e164b02e0f25b2f3ded46ca477870814adcef4eda397ae3f9dd4def87a1"));
createServerFn({ method: "POST" }).handler(createSsrRpc("452e3e86c202416aafc02a2b55b578ec43fec039a5a067befd21bb3ba85f5fd5"));
//#endregion
export { login as n, checkAuth as t };
