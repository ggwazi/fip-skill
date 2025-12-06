<script>
  import Router from 'svelte-spa-router';
  import Sidebar from './lib/Sidebar.svelte';
  import DocViewer from './lib/DocViewer.svelte';
  import Home from './lib/Home.svelte';

  // Define routes
  const routes = {
    '/': Home,
    '/docs/*': DocViewer,
  };
</script>

<div class="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-surface-50-900 text-surface-900-50">
  <!-- Sidebar -->
  <aside class="w-full md:w-64 flex-none border-r border-surface-500/30 bg-surface-100-800">
    <Sidebar />
  </aside>

  <!-- Main Content -->
  <main class="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
    <Router {routes} />
  </main>
</div>
