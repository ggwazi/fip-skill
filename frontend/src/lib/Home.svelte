<script>
  import { onMount } from 'svelte';
  import { marked } from 'marked';

  let content = $state('');

  onMount(async () => {
    try {
      const res = await fetch('/README.md');
      const text = await res.text();
      content = marked.parse(text);
    } catch (e) {
      console.error(e);
      content = '<p>Error loading content.</p>';
    }
  });
</script>

<div class="max-w-4xl mx-auto">
    <div class="prose dark:prose-invert max-w-none p-4 bg-surface-100-800-token rounded-container-token shadow-xl">
        {@html content}
    </div>
</div>
