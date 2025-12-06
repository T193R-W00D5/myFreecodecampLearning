import { Page, expect, test } from '@playwright/test';
import { debugConsole } from '../../src/scripts/debug-console.js'

export async function validateMultipleLinksInRegion(
  page: Page,
  links: { name: string; expectedHref: string; expectedAriaLabel: string }[],
  regionLocator?: string // 'header', 'footer', '.list-pageLinks', 'role=navigation'
) {
  for (const { name, expectedHref, expectedAriaLabel } of links) {
    await test.step(`Validate link "${name}" in ${regionLocator ?? 'auto'}`, async () => {
      let linkLocator;

      if (regionLocator) {
        if (regionLocator === 'role=navigation') {
          linkLocator = page.getByRole('navigation').getByRole('link', { name });
        } else {
          linkLocator = page.locator(regionLocator).getByRole('link', { name });
        }
      } else {
        const navRegion = page.getByRole('navigation');
        if (await navRegion.count() > 0) {
          linkLocator = navRegion.getByRole('link', { name });
        } else {
          linkLocator = page.getByRole('link', { name });
        }
      }

      await expect(linkLocator).toBeVisible();
      await expect(linkLocator).toHaveAttribute('aria-label', expectedAriaLabel);

      const href = await linkLocator.getAttribute('href');
      const ariaLabel = await linkLocator.getAttribute('aria-label');
      debugConsole.log(`Region "${regionLocator ?? 'auto'}" link "${name}" href: ${href}`);
      debugConsole.log(`Region "${regionLocator ?? 'auto'}" link "${name}" aria-label: ${ariaLabel}`);

      await linkLocator.click();
      await expect(page).toHaveURL(expectedHref);

      // Navigate back to fixture’s starting page for next link
      await page.goBack();
      await page.waitForLoadState('networkidle');
    });
  }
}
