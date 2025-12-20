import { test } from "../../fixtures/test-fixtures.js";
import { validateMultipleLinksInRegion } from "../../utils/helpers-page-navigation.js";

import * as sharedConstants_main from "../../../src/scripts/sharedConstants-__main.js";
//import * as sharedConstants_CFSDBasicHTML from "../../../src/scripts/sharedConstants-CFSD-basic-html-helper.js";

// Define list of test cases for multiple fixtures and test parameters for use in test loop with validateMultipleLinksInRegion function
const testCases: {
  // List of fixtures to use in the test
  fixture: "fixture_startFrom_Home" | "fixture_startFrom_CFSD_Home";
  // Region locator to scope the link searches
  regionLocator: string;
  // Links to validate within the specified region
  links: { name: string; expectedHref: string; expectedAriaLabel: string }[];
}[] = [
  {
    fixture: "fixture_startFrom_CFSD_Home",
    regionLocator: "header",
    links: [
      {
        name: sharedConstants_main.linkVisibleNames.home, // used shared constants instead of hardcoding, e.g., name: 'Home',
        expectedHref: sharedConstants_main.hrefs.href_home, // hardcoded example: expectedHref: "http://localhost:3010/index.html",
        expectedAriaLabel:
          sharedConstants_main.ariaLabels.ariaLabel_homeLink_header, // hardcoded example: expectedAriaLabel: "Top of the page Home link to go to the website's main home page"
      },
    ],
  },

  {
    fixture: "fixture_startFrom_CFSD_Home",
    regionLocator: "footer",
    links: [
      {
        name: sharedConstants_main.linkVisibleNames.home,
        expectedHref: sharedConstants_main.hrefs.href_home,
        expectedAriaLabel:
          sharedConstants_main.ariaLabels.ariaLabel_homeLink_footer,
      },
    ],
  },
];

// Simple dynamic approach - explicitly destructure the fixtures we need
test.describe
  .parallel("Validate multiple links in regions - Dynamic Approach", () => {
  for (const { fixture, regionLocator, links } of testCases) {
    test(`validate links in ${fixture} (${regionLocator}) @smoke`, async ({
      fixture_startFrom_Home,
      fixture_startFrom_CFSD_Home,
    }) => {
      // Create a simple mapping of fixture names to page objects
      const fixtures = { fixture_startFrom_Home, fixture_startFrom_CFSD_Home };
      const page = fixtures[fixture];
      await validateMultipleLinksInRegion(page, links, regionLocator);
    });
  }
});

// // The test loop below works. It handles different fixtures in switch statements.
// test.describe.parallel('Validate multiple links in regions', () => {
//   for (const { fixture, regionLocator, links } of testCases) {
//     switch (fixture) {
//       case 'fixture_startFrom_CFSD_Home':
//         test(`validate links in fixture_startFrom_CFSD_Home (${regionLocator})`, async ({ fixture_startFrom_CFSD_Home }) => {
//           await validateMultipleLinksInRegion(fixture_startFrom_CFSD_Home, links, regionLocator);
//         });
//         break;
//       // Add more cases here if there are other fixtures to handle
//       default:
//         throw new Error(`Unhandled fixture: ${fixture}`);
//     }
//   }
// });
