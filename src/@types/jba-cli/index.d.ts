declare module "jba-cli" {
	export function getAndGenerate(
		args: any,
		quickinstall: any,
		site: any,
		dounzip: any,
		path: any,
		dothrow: boolean
	): Promise<boolean>;

	export function urlExists(url: string, cb: Function): void;
}
