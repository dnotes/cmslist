<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex flex-col h-screen w-screen max-h-screen max-w-screen overflow-hidden
	bg-white dark:bg-stone-900 text-black dark:text-stone-200">

	<header class="w-full indent h-12 flex flex-shrink-0 py-2 items-center bg-stone-200 dark:bg-stone-800
	              sm:h-auto sm:bg-white sm:dark:bg-stone-900">
		<h1 class="text-2xl
			sm:text-5xl sm:text-center sm:py-6 w-full"><a href="/">CMS List</a></h1>
	</header>

	<main class="indent flex-grow overflow-auto">
		{@render children()}
	</main>

	<footer class="h-20 indent flex flex-shrink-0 py-2 items-center bg-stone-400 dark:bg-stone-800">
		<div class="prose prose-stone dark:prose-invert text-xs prose-a:no-underline prose-a:hover:underline">
			<p>
				Information compiled by AI may be outdated or incorrect,
				please <a href="https://github.com/dnotes/cmslist/tree/main/content/cms">edit on GitHub</a>.
				Rankings from <a href="https://w3techs.com/technologies/overview/content_management">W3Techs</a>.
				Site &copy;2025 DNotes LLC.
			</p>
		</div>
	</footer>
</div>

<style lang="postcss">
	.indent {
		@apply px-4 sm:px-9;
	}
</style>