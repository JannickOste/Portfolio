import { RouteObject } from "react-router-dom";

export type RouteObjectExtended = RouteObject & { text:string; children?:RouteObjectExtended[]}