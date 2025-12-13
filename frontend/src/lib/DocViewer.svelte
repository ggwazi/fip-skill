<script>
  import { marked } from 'marked';
  import { params } from 'svelte-spa-router';

  let content = $state('');
  
  $effect(() => {
    if ($params && $params['*']) {
      loadDoc($params['*']);
    }
  });

  async function loadDoc(docPath) {
    try {
        const path = docPath.endsWith('.md') ? docPath : `${docPath}.md`;
        const res = await fetch(`/docs/${path}`);
        if (!res.ok) throw new Error('Not found');
        const text = await res.text();
        content = marked.parse(text);
    } catch (e) {
        content = `<h1>404 Not Found</h1><p>The requested document "${docPath}" could not be found.</p>`;
    }
  }
</script>

<div class="max-w-4xl mx-auto">
    <div class="prose dark:prose-invert max-w-none p-4 bg-surface-100-800-token rounded-container-token shadow-xl">
        {@html content}
    </div>
</div>
