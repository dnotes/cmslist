import '@quickpickle/playwright/actions'
import '@quickpickle/playwright/outcomes'
import '@quickpickle/playwright/world'
import type { PlaywrightWorld } from '@quickpickle/playwright'
import { expect, type Locator, type Page } from '@playwright/test'
import { Given, When, Then, DataTable, AfterStep, Before } from 'quickpickle'
import { allFields } from '$lib'
import { writeFile } from 'node:fs/promises'

type World = Omit<PlaywrightWorld, 'data'> & {
  data: {
    [key:string]: any
  }
}

Before(async function (world:World) {
  world.data.handledErrors = 0
  await world.page.waitForTimeout(800)
})

AfterStep(async function (world:World) {
  if (world.info.errors.length > world.data.handledErrors) {
    let error = world.info.errors[world.data.handledErrors]
    world.data.handledErrors++
    let name = world.toString().replace(/^.+?: /, '')
    await world.page.screenshot({ path: `tests/errors/${name}.png` })
    await writeFile(`${world.projectRoot}/tests/errors/${name}.json`, JSON.stringify({ error: {
      message: error.message.split('\n'),
      stack: error.stack.split('\n'),
    }, ...world.data }, null, 2))
  }
})

When('I select the following fields:', async function (world:PlaywrightWorld, dataTable:DataTable) {
  let fieldsToSelect = dataTable.raw().map(row => row[0])
  let dialog = world.page.getByRole('dialog', { name: 'Field list' })
  let button = world.page.getByRole('button', { name: 'Show fields' })
  try {
    await expect(dialog).toBeVisible({ timeout:200 })
  }
  catch(e) {
    await button.click()
    await expect(dialog).toBeVisible({ timeout:200 })
  }

  for (let f of allFields) {
    if (f.field !== 'title') await dialog.locator('input[type="checkbox"][value="' + f.field + '"]').uncheck({ timeout:500 })
  }
  for (let field of fieldsToSelect) {
    await world.page.locator('input[type="checkbox"][value="'+field+'"]').check({ timeout:500 })
  }

  await button.click({ timeout:200 })
  await expect(dialog).toBeHidden({ timeout:200 })

});

async function expectElement(locator:Locator|Page, toBePresent:boolean=true, toBeVisible:boolean=true, timeout:number=500) {
  let visibleText = toBeVisible ? 'true' : ''
  try {
    if (toBePresent) await expect(locator.locator(`visible=${visibleText}`).first()).toBeAttached({ timeout })
    else await expect(locator.locator(`visible=${visibleText}`)).toHaveCount(0, { timeout })
  }
  catch(e) {
    throw new Error(`The${toBeVisible ? ' hidden' :''} element "${locator}" was unexpectedly ${toBePresent ? 'not present' : 'present'}.`)
  }
}

Then('I should (immediately )(not )(NOT )see a column for {string}', async (world:World, hasText:string) => {
  let locator = world.page.locator('th.cursor-pointer').getByText(hasText, { exact:true })
  let timeout = world.info.step?.match(/^I should immediately/) ? 100 : 500
  let toBePresent = world.info.step?.match(/not see/i) ? false : true
  await expectElement(locator, toBePresent, true, timeout)
})

// Detail

Then('I should see the full listing for {string}', async function (world:World, name) {
  await expect(world.page.getByRole('heading', { name })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Architecture' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Target Users' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Legal' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'User Management' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Content Editing' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Content Display' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Mobile Support' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Multilingual Support' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Extensibility' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Commerce' })).toBeVisible({ timeout:world.worldConfig.timeout})
  await expect(world.page.getByRole('heading', { name:'Costs' })).toBeVisible({ timeout:world.worldConfig.timeout})
});

Then('I should not/NOT see the full listing for {string}', async function (world:World, name) {
  await expect(world.page.getByRole('heading', { name })).toBeHidden({ timeout:world.worldConfig.timeout})
});

// Table

When('I click/select (on )the row (for ){string}', async function (world:World, cms:string) {
  await world.page.locator('tbody tr').filter({ hasText:cms }).click({ timeout:1000 })
});

When('I click/select (on )the following rows:', async function (world:World, dataTable:DataTable) {
  let rows = dataTable.raw().map(row => row[0])
  for (let row of rows) {
    await world.page.locator('tbody tr').filter({ hasText:row }).locator('td.field-rank').click({ timeout:1000, force:true })
  }
});

Then('the {string} row should (still )be selected', async (world:World, cms:string) => {
  await expect(world.page.locator('tbody tr').filter({ hasText:cms })).toHaveClass(/selected/)
})
Then('the {string} row should not/NOT (still )be selected', async (world:World, cms:string) => {
  await expect(world.page.locator('tbody tr').filter({ hasText:cms })).not.toHaveClass(/selected/)
})

Then('the following rows should (still )be selected:', async (world:World, dataTable:DataTable) => {
  let rows = dataTable.raw().map(row => row[0])
  for (let row of rows) {
    await expect(world.page.locator('tbody tr').filter({ hasText:row })).toHaveClass(/selected/)
  }
  await expect(world.page.locator('tbody tr.selected')).toHaveCount(rows.length)
})
