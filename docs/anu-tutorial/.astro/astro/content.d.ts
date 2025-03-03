declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"tutorial": {
"1-basics/1-introduction/1-welcome/content.md": {
	id: "1-basics/1-introduction/1-welcome/content.md";
  slug: "/:partSlug/:chapterSlug/1-welcome.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-basics/1-introduction/2-quick-setup/content.md": {
	id: "1-basics/1-introduction/2-quick-setup/content.md";
  slug: "/:partSlug/:chapterSlug/2-quick-setup.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-basics/1-introduction/meta.md": {
	id: "1-basics/1-introduction/meta.md";
  slug: "1-basics/1-introduction/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"1-basics/meta.md": {
	id: "1-basics/meta.md";
  slug: "1-basics/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/1-Creating-Meshes/1-MeshBuilder/content.md": {
	id: "2-Anu-Fundamentals/1-Creating-Meshes/1-MeshBuilder/content.md";
  slug: "/:partSlug/:chapterSlug/1-MeshBuilder.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/1-Creating-Meshes/2-Create/content.md": {
	id: "2-Anu-Fundamentals/1-Creating-Meshes/2-Create/content.md";
  slug: "/:partSlug/:chapterSlug/2-Create.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/1-Creating-Meshes/3-Bind/content.md": {
	id: "2-Anu-Fundamentals/1-Creating-Meshes/3-Bind/content.md";
  slug: "/:partSlug/:chapterSlug/3-Bind.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/1-Creating-Meshes/4-Nesting/content.md": {
	id: "2-Anu-Fundamentals/1-Creating-Meshes/4-Nesting/content.md";
  slug: "/:partSlug/:chapterSlug/4-Nesting.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/1-Creating-Meshes/meta.md": {
	id: "2-Anu-Fundamentals/1-Creating-Meshes/meta.md";
  slug: "2-anu-fundamentals/1-creating-meshes/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/2-Using-Selections/1-Manipulating-Selections/content.md": {
	id: "2-Anu-Fundamentals/2-Using-Selections/1-Manipulating-Selections/content.md";
  slug: "/:partSlug/:chapterSlug/1-Manipulating-Selections.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/2-Using-Selections/2-Materials-and-Colors/content.md": {
	id: "2-Anu-Fundamentals/2-Using-Selections/2-Materials-and-Colors/content.md";
  slug: "/:partSlug/:chapterSlug/2-Materials-and-Colors.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/2-Using-Selections/3-Prop-and-Props/content.md": {
	id: "2-Anu-Fundamentals/2-Using-Selections/3-Prop-and-Props/content.md";
  slug: "/:partSlug/:chapterSlug/3-Prop-and-Props.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/2-Using-Selections/4-Selecting-Meshes/content.md": {
	id: "2-Anu-Fundamentals/2-Using-Selections/4-Selecting-Meshes/content.md";
  slug: "/:partSlug/:chapterSlug/4-Selecting-Meshes.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/2-Using-Selections/5-Actions/content.md": {
	id: "2-Anu-Fundamentals/2-Using-Selections/5-Actions/content.md";
  slug: "/:partSlug/:chapterSlug/5-Actions.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/2-Using-Selections/meta.md": {
	id: "2-Anu-Fundamentals/2-Using-Selections/meta.md";
  slug: "2-anu-fundamentals/2-using-selections/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/3-Your-First-Vis/1-Step1/content.md": {
	id: "2-Anu-Fundamentals/3-Your-First-Vis/1-Step1/content.md";
  slug: "/:partSlug/:chapterSlug/1-Step1.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/3-Your-First-Vis/2-Step2/content.md": {
	id: "2-Anu-Fundamentals/3-Your-First-Vis/2-Step2/content.md";
  slug: "/:partSlug/:chapterSlug/2-Step2.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/3-Your-First-Vis/3-Step3/content.md": {
	id: "2-Anu-Fundamentals/3-Your-First-Vis/3-Step3/content.md";
  slug: "/:partSlug/:chapterSlug/3-Step3.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/3-Your-First-Vis/4-Step4/content.md": {
	id: "2-Anu-Fundamentals/3-Your-First-Vis/4-Step4/content.md";
  slug: "/:partSlug/:chapterSlug/4-Step4.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/3-Your-First-Vis/5-Step5/content.md": {
	id: "2-Anu-Fundamentals/3-Your-First-Vis/5-Step5/content.md";
  slug: "/:partSlug/:chapterSlug/5-Step5.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/3-Your-First-Vis/6-Step6/content.md": {
	id: "2-Anu-Fundamentals/3-Your-First-Vis/6-Step6/content.md";
  slug: "/:partSlug/:chapterSlug/6-Step6.html/";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/3-Your-First-Vis/meta.md": {
	id: "2-Anu-Fundamentals/3-Your-First-Vis/meta.md";
  slug: "2-anu-fundamentals/3-your-first-vis/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"2-Anu-Fundamentals/meta.md": {
	id: "2-Anu-Fundamentals/meta.md";
  slug: "2-anu-fundamentals/meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
"meta.md": {
	id: "meta.md";
  slug: "meta";
  body: string;
  collection: "tutorial";
  data: InferEntrySchema<"tutorial">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
