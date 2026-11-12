// Verifica end-to-end con Playwright: node scripts/e2e.mjs [baseURL]
// Richiede `npm run build && npx vite preview --port 4173` in esecuzione.
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// Playwright è preinstallato globalmente in molti ambienti: lo carichiamo via require.
const { chromium, devices } = require('playwright');
import fs from 'node:fs';

const BASE = process.argv[2] ?? 'http://localhost:4173/';
const SHOTS = process.env.SHOTS ?? 'screenshots';
fs.mkdirSync(SHOTS, { recursive: true });
const errors = [];
let passed = 0;
const ok = (cond, msg) => {
  if (!cond) throw new Error('FALLITO: ' + msg);
  passed++;
  console.log('  ✓', msg);
};

const browser = await chromium.launch();
const ctx = await browser.newContext({ acceptDownloads: true, viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
const go = (h) => page.goto(BASE + '#' + h);

console.log('Onboarding e navigazione');
await go('/');
ok(await page.getByRole('heading', { name: /Oltre la reazione/ }).isVisible(), 'schermata iniziale visibile');
await page.screenshot({ path: `${SHOTS}/01-benvenuto.png` });
await page.getByRole('button', { name: 'Inizia il percorso' }).click();
ok(await page.getByText('La tua bacheca').isVisible(), 'dashboard dopo onboarding');
await page.screenshot({ path: `${SHOTS}/02-dashboard.png`, fullPage: false });
for (const [label, heading] of [
  ['Laboratori', 'Laboratori'],
  ['Scenari', 'Scenari'],
  ['Diario', 'Diario'],
  ['Piano', 'Il mio piano di cambiamento'],
  ['Progressi', 'Progressi'],
  ['Fonti', 'Bibliografia'],
]) {
  await page.getByRole('navigation', { name: 'Navigazione principale' }).getByRole('link', { name: label }).click();
  ok(await page.getByRole('heading', { level: 1, name: heading }).isVisible(), `navigazione → ${label}`);
}

console.log('Nove laboratori');
await go('/laboratori');
ok((await page.locator('a.lab-card').count()) === 9, '9 card laboratorio');
const labIds = ['emozioni', 'corpo', 'fatti', 'ciclo', 'prospettive', 'impatto', 'radici', 'parole', 'confini'];
for (const id of labIds) {
  await go(`/laboratori/${id}`);
  for (const tab of ['Leggere', 'Scenari', 'Esercizi', 'Riflettere']) {
    await page.getByRole('tab', { name: tab }).click();
    ok(await page.getByRole('tabpanel').isVisible(), `lab ${id} · tab ${tab}`);
  }
  if (await page.getByRole('tab', { name: 'Strumento' }).count()) {
    await page.getByRole('tab', { name: 'Strumento' }).click();
    ok(await page.getByRole('tabpanel').isVisible(), `lab ${id} · strumento`);
  }
}
await go('/laboratori/emozioni');
await page.getByRole('button', { name: 'Segna come letto' }).first().click();
ok(await page.getByRole('button', { name: 'Letto' }).first().isVisible(), 'sezione segnata come letta');
await page.screenshot({ path: `${SHOTS}/03-laboratorio.png` });

console.log('Scenario ramificato');
await go('/scenari/cena-anniversario');
await page.getByRole('button', { name: /Fai un respiro/ }).click();
ok(await page.getByText('Che cosa succede in te').isVisible(), 'feedback dopo la prima scelta');
ok(await page.getByText(/Nota il tuo silenzio teso/).isVisible(), 'feedback sul punto di vista dell’altro');
await page.getByRole('button', { name: /Continua/ }).click();
ok(await page.getByText(/sotto l’irritazione c’è delusione/).isVisible(), 'ramo “consapevole” raggiunto');
await page.getByRole('button', { name: /Sono contenta che tu sia qui/ }).click();
await page.getByRole('button', { name: /Vedi come finisce/ }).click();
const t1 = await page.locator('#esito').textContent();
ok(t1.includes('spazio tra emozione e risposta'), 'esito percorso consapevole');
await page.screenshot({ path: `${SHOTS}/04-scenario-esito.png`, fullPage: true });
await page.getByRole('button', { name: /Riprova con un’altra strada/ }).click();
await page.getByRole('button', { name: /Pensa la mia/ }).click();
ok(await page.getByText('Mossa d’impulso').isVisible(), 'feedback stile impulsivo');
await page.getByRole('button', { name: /Continua/ }).click();
ok(await page.getByText(/Lui si irrigidisce/).isVisible(), 'ramo diverso dopo scelta diversa');
await page.getByRole('button', { name: /Non è una giornata storta/ }).click();
await page.getByRole('button', { name: /Vedi come finisce/ }).click();
const t2 = await page.locator('#esito').textContent();
ok(t1 !== t2, `esito diverso con scelte diverse (“${t2}”)`);
await page.locator('#sc-refl').fill('Di solito mostro rabbia, nascondo la delusione.');
await page.getByRole('button', { name: /Salva la riflessione/ }).click();
ok(await page.getByText('Percorsi precedenti (2)').isVisible(), 'storico dei percorsi');

console.log('Esercizio guidato');
await go('/esercizi/granularita');
await page.getByRole('radio', { name: 'male' }).click();
await page.getByRole('button', { name: /Avanti/ }).click();
await page.getByRole('button', { name: 'delusione', exact: true }).click();
await page.getByRole('button', { name: /Avanti/ }).click();
await page.getByRole('button', { name: /Avanti/ }).click();
await page.getByRole('radio', { name: 'un po’ più bassa' }).click();
await page.getByRole('button', { name: /Completa/ }).click();
ok(await page.getByText('Le tue risposte').isVisible(), 'esercizio completato e riepilogo');

console.log('Diario: crea, modifica, elimina');
await go('/diario/nuovo');
await page.locator('#j-title').fill('Discussione sul lavoro');
await page.locator('#j-facts').fill('Ha detto che il report era sbagliato davanti a tutti.');
await page.getByRole('button', { name: 'umiliazione', exact: true }).click();
await page.getByRole('button', { name: /Salva/ }).click();
ok(await page.getByRole('heading', { name: 'Discussione sul lavoro' }).isVisible(), 'voce creata');
await page.getByRole('link', { name: /Modifica/ }).click();
await page.locator('#j-title').fill('Discussione sul lavoro (rivista)');
await page.getByRole('button', { name: /Salva/ }).click();
ok(await page.getByRole('heading', { name: 'Discussione sul lavoro (rivista)' }).isVisible(), 'voce modificata');

console.log('Persistenza dopo refresh');
await page.reload();
ok(await page.getByRole('heading', { name: 'Discussione sul lavoro (rivista)' }).isVisible(), 'voce presente dopo reload');
await go('/diario');
const count = await page.locator('a.entry-card').count();
ok(count >= 2, `elenco diario (${count} voci, inclusa la riflessione dello scenario)`);
await page.getByLabel('Cerca nel diario').fill('rivista');
ok((await page.locator('a.entry-card').count()) === 1, 'ricerca nel diario');
await page.locator('a.entry-card').first().click();
const [dl1] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Esporta/ }).click()]);
ok(dl1.suggestedFilename().endsWith('.md'), 'esportazione singola voce');
await page.getByRole('button', { name: /Elimina/ }).click();
await page.getByRole('button', { name: 'Elimina definitivamente' }).click();
await page.waitForURL(/#\/diario$/);
ok((await page.locator('a.entry-card').count()) === count - 1, 'voce eliminata');
await page.reload();
ok((await page.locator('a.entry-card').count()) === count - 1, 'eliminazione persistente dopo reload');

console.log('Strumenti');
await go('/strumenti/ciclo');
await page.getByRole('button', { name: /3\. Emozione/ }).click();
ok(await page.getByRole('heading', { name: 'Emozione', level: 3 }).isVisible(), 'ciclo: selezione tappa');
await page.getByRole('radio', { name: 'Ricostruisci il tuo ciclo' }).click();
for (let i = 0; i < 3; i++) {
  await page.locator('textarea').fill(`Tappa ${i + 1}`);
  await page.getByRole('button', { name: 'Tappa successiva' }).click();
}
await page.screenshot({ path: `${SHOTS}/05-ciclo.png` });
await page.getByRole('button', { name: 'Salva nel diario' }).click();
await page.waitForURL(/#\/diario$/);
ok(await page.getByText('Il mio ciclo della reazione').isVisible(), 'ciclo personale salvato nel diario');

await go('/strumenti/fatti');
const items = page.locator('.quiz-item');
for (let i = 0; i < (await items.count()); i++) await items.nth(i).getByRole('button', { name: 'Fatto' }).click();
ok(await page.getByText(/in linea con la distinzione proposta/).isVisible(), 'quiz fatti/interpretazioni completato');

await go('/strumenti/prospettive');
await page.locator('#dp-scene').fill('Discussione sulla cena');
for (const k of ['facts', 'feeling', 'need', 'fear']) {
  await page.locator(`#me-${k}`).fill('io ' + k);
  await page.locator(`#ot-${k}`).fill('altro ' + k);
}
await page.getByRole('button', { name: 'Metti a confronto' }).click();
ok(await page.getByText('altro need').isVisible(), 'doppio punto di vista: confronto');
await page.screenshot({ path: `${SHOTS}/06-doppio-punto-di-vista.png`, fullPage: true });

await go('/strumenti/riparazione');
await page.locator('#rb-what').fill('ti ho interrotto');
await page.locator('#rb-sorry').fill('Scusa, ma eri lento');
ok(await page.getByText(/rischia di cancellare la scusa/).isVisible(), 'riparazione: segnala il “ma”');
await page.locator('#rb-sorry').fill('Mi dispiace.');
await page.getByRole('button', { name: /Aggiungi al piano/ }).click();

console.log('Piano: compilazione, stampa, esportazione');
await go('/piano');
ok(await page.getByLabel(/Frasi per riparare, voce 1/).isVisible(), 'frase di riparazione arrivata nel piano');
await page.getByRole('textbox', { name: 'Perché voglio cambiare' }).fill('Voglio litigare meno con chi amo.');
await page.getByLabel('Aggiungi a: Situazioni che mi attivano').fill('quando mi sento interrotto');
await page.getByLabel('Aggiungi a: Situazioni che mi attivano').press('Enter');
await page.getByRole('button', { name: /Aggiungi un “se… allora…”/ }).click();
await page.getByPlaceholder('mi accorgo che sto alzando la voce').fill('sento la mascella serrata');
await page.getByPlaceholder(/dico che ho bisogno/).fill('chiedo una pausa di dieci minuti');
await page.waitForTimeout(900);
await page.reload();
ok((await page.getByRole('textbox', { name: 'Perché voglio cambiare' }).inputValue()) === 'Voglio litigare meno con chi amo.', 'piano persistente dopo reload');
ok((await page.getByLabel(/Situazioni che mi attivano, voce 1/).inputValue()) === 'quando mi sento interrotto', 'lista del piano persistente');
const [dl2] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Esporta \(\.md\)/ }).click()]);
const planPath = `${SHOTS}/piano-esportato.md`;
await dl2.saveAs(planPath);
const md = fs.readFileSync(planPath, 'utf8');
ok(md.includes('**Se** sento la mascella serrata **allora** chiedo una pausa di dieci minuti'), 'contenuto del piano esportato');
await page.evaluate(() => {
  window.__printed = false;
  window.print = () => (window.__printed = true);
});
await page.getByRole('button', { name: /Stampa o salva in PDF/ }).click();
ok(await page.evaluate(() => window.__printed), 'stampa invocata');
await page.emulateMedia({ media: 'print' });
await page.pdf({ path: `${SHOTS}/piano-stampa.pdf` });
ok(await page.locator('.print-only').isVisible(), 'impaginazione di stampa visibile in media print');
ok(!(await page.locator('.app-header').isVisible()), 'intestazione nascosta in stampa');
await page.emulateMedia({ media: 'screen' });

console.log('Progressi, dati, bibliografia');
await go('/progressi');
ok(await page.getByText('Mossa consapevole').first().isVisible(), 'progressi: distribuzione mosse');
await page.screenshot({ path: `${SHOTS}/07-progressi.png`, fullPage: true });
await go('/dati');
const [dl3] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Backup completo/ }).click()]);
const backupPath = `${SHOTS}/backup.json`;
await dl3.saveAs(backupPath);
ok(JSON.parse(fs.readFileSync(backupPath, 'utf8')).plan.motivation.startsWith('Voglio'), 'backup JSON completo');
await page.getByRole('button', { name: 'Elimina tutti i dati' }).click();
await page.getByRole('button', { name: 'Elimina tutto', exact: true }).click();
await go('/diario');
ok(await page.getByText('Il tuo diario è ancora vuoto').isVisible(), 'eliminazione totale');
await go('/dati');
await page.locator('#import-file').setInputFiles(backupPath);
await page.getByRole('button', { name: 'Importa e sostituisci' }).click();
await go('/diario');
ok((await page.locator('a.entry-card').count()) > 0, 'importazione backup ripristina il diario');
await go('/bibliografia');
ok((await page.locator('ol > li.card').count()) >= 20, 'bibliografia completa');
await go('/inesistente');
ok(await page.getByText('Questa strada non porta da nessuna parte').isVisible(), 'pagina 404');

console.log('Mobile');
const m = await browser.newContext({ ...devices['iPhone 13'] });
const mp = await m.newPage();
mp.on('pageerror', (e) => errors.push(e.message));
await mp.goto(BASE);
await mp.screenshot({ path: `${SHOTS}/m1-benvenuto.png` });
await mp.getByRole('button', { name: 'Inizia il percorso' }).click();
for (const [h, name] of [
  ['/', 'm2-dashboard'],
  ['/laboratori/fatti', 'm3-laboratorio'],
  ['/scenari/visualizzato', 'm4-scenario'],
  ['/strumenti/ciclo', 'm5-ciclo'],
  ['/diario/nuovo', 'm6-diario'],
  ['/piano', 'm7-piano'],
]) {
  await mp.goto(BASE + '#' + h);
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(overflow <= 0, `mobile ${h}: nessuno scroll orizzontale (${overflow}px)`);
  await mp.screenshot({ path: `${SHOTS}/${name}.png` });
}
ok(await mp.locator('.tabbar').isVisible(), 'barra di navigazione mobile visibile');
await mp.locator('.tabbar').getByRole('link', { name: 'Diario' }).click();
ok(await mp.getByRole('heading', { level: 1, name: 'Diario' }).isVisible(), 'navigazione mobile con tab bar');

await browser.close();
if (errors.length) {
  console.log('\nErrori in console:\n' + errors.join('\n'));
  process.exit(1);
}
console.log(`\nTutti i controlli superati: ${passed}`);
