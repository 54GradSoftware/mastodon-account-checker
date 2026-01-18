<template>
  <footer class="layout-footer">
    <div class="footer-grid">
      <div class="footer-col">
        Von: <span class="font-medium"><a href="https://54gradsoftware.de/" target="_blank">
            54 Grad Software GmbH
          </a>
        </span>
      </div>
      <div class="footer-col">
        <a href="https://github.com/54GradSoftware/mastodon-profile-checker">GitHub (Software)</a> | <a
          href="https://github.com/54GradSoftware/mastodon-profile-checker/blob/main/LICENSE">MIT-Lizenz</a>
      </div>
      <div class="footer-col">
        <a href="https://www.54gradsoftware.de/impressum">Impressum</a> | <a
          href="https://www.54gradsoftware.de/datenschutz">Datenschutz</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.layout-footer {
  padding: 1.5rem;
  background: var(--p-surface-100);
  border-top: 1px solid var(--p-surface-200);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-col a {
  color: inherit;
  text-decoration: none;
}

.footer-col a:hover {
  text-decoration: underline;
}

.font-medium {
  font-weight: 500;
  margin-left: 0.5rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
