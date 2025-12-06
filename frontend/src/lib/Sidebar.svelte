<script>
  import { link } from 'svelte-spa-router';
</script>

<div class="p-4 space-y-4 h-full overflow-y-auto">
  <div class="font-bold text-xl mb-6 text-primary-500">FIP Advisor</div>
  
  <nav class="list-nav">
    <ul>
      <li><a href="/" use:link class="block p-2 rounded hover:bg-surface-500/10">Home</a></li>
    </ul>
    
    <div class="text-sm font-bold text-surface-400 uppercase mt-6 mb-2">User Guide</div>
    <ul class="space-y-1">
      <li><a href="/docs/installation" use:link class="block p-2 rounded hover:bg-surface-500/10">Installation</a></li>
      <li><a href="/docs/summary" use:link class="block p-2 rounded hover:bg-surface-500/10">Skill Summary</a></li>
      <li><a href="/docs/package-guide" use:link class="block p-2 rounded hover:bg-surface-500/10">Package Guide</a></li>
    </ul>

    <div class="text-sm font-bold text-surface-400 uppercase mt-6 mb-2">Developer Guide</div>
    <ul class="space-y-1">
      <li><a href="/docs/extending" use:link class="block p-2 rounded hover:bg-surface-500/10">Extending the Skill</a></li>
      <li><a href="/docs/extension-demo" use:link class="block p-2 rounded hover:bg-surface-500/10">Extension Demo</a></li>
    </ul>
    
    <div class="text-sm font-bold text-surface-400 uppercase mt-6 mb-2">Reference</div>
    <ul class="space-y-1">
       <li><a href="/docs/icatcare_fipupdate_july25.pdf" target="_blank" class="block p-2 rounded hover:bg-surface-500/10">ABCD Guidelines (PDF)</a></li>
    </ul>
  </nav>
</div>
