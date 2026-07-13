import { Bug, DoorOpen, Droplets, Flame, Hammer, Home, PaintBucket, ShieldCheck, Snowflake, Sparkles, Star, Wind, Wrench, Zap } from "lucide-react";
//#region src/lib/icon-map.ts
var ICON_MAP = {
	Wind,
	Wrench,
	Bug,
	Home,
	DoorOpen,
	Zap,
	Droplets,
	Flame,
	Snowflake,
	Hammer,
	ShieldCheck,
	PaintBucket,
	Sparkles,
	Star
};
var ICON_NAMES = Object.keys(ICON_MAP);
function getIcon(name) {
	return ICON_MAP[name] ?? Wrench;
}
//#endregion
export { getIcon as n, ICON_NAMES as t };
