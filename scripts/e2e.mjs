// Verifica end-to-end con Playwright: node scripts/e2e.mjs [baseURL]
// Richiede `npm run build && npx vite preview --port 4173` in esecuzione.
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
// Playwright è preinstallato globalmente in molti ambienti: lo carichiamo via require.
const { chromium, devices } = require('playwright');

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
const btn = (name, exact = false) => page.getByRole('button', { name, exact });

console.log('Onboarding e navigazione');
await go('/');
ok(await page.getByText('Capire ciò che provi. Riconoscere ciò che provochi.').first().isVisible(), 'titolo e sottotitolo');
ok(await page.getByText(/Non sei responsabile di tutte le emozioni che provi/).isVisible(), 'messaggio centrale');
ok((await page.locator('.principles-list li').count()) === 9, 'nove principi');
await page.screenshot({ path: `${SHOTS}/01-benvenuto.png` });
await btn('Inizia il percorso').click();
ok(await page.getByText('Il tuo percorso').first().isVisible(), 'bacheca dopo onboarding');
await page.screenshot({ path: `${SHOTS}/02-dashboard.png` });
for (const [label, heading] of [
  ['Laboratori', 'Laboratori'],
  ['Situazioni', 'Situazioni quotidiane'],
  ['Diario', 'Diario'],
  ['Piano', 'Il mio piano di cambiamento'],
  ['Progressi', 'Progressi'],
  ['Chiedere aiuto', 'Potrebbe essere il momento di chiedere aiuto?'],
]) {
  await page.getByRole('navigation', { name: 'Navigazione principale' }).getByRole('link', { name: label }).click();
  ok(await page.getByRole('heading', { level: 1, name: heading }).isVisible(), `navigazione → ${label}`);
}
await go('/bibliografia');
ok((await page.locator('ol > li.card').count()) >= 25, 'bibliografia');

console.log('Nove laboratori, sette schede ciascuno');
await go('/laboratori');
ok((await page.locator('a.lab-card').count()) === 9, '9 card laboratorio');
const labIds = ['mondo-interiore', 'storie', 'fiducia', 'controllo', 'rabbia', 'altra-persona', 'due-bisogni', 'reagire', 'comportamenti'];
for (const id of labIds) {
  await go(`/laboratori/${id}`);
  for (const tab of ['Introduzione', 'Concetti', 'Strumenti', 'Situazioni', 'Autoriflessione', 'Esercizi', 'Approfondimento']) {
    await page.getByRole('tab', { name: tab }).click();
    ok(await page.getByRole('tabpanel').isVisible(), `${id} · ${tab}`);
  }
}

console.log('Concetti e autoriflessione');
await go('/laboratori/mondo-interiore?tab=concetti');
ok((await page.locator('.concept dt').count()) === 7, 'concetto aperto con sette punti');
await page.getByRole('button', { name: /Paura dell’abbandono/ }).click();
ok(await page.getByText('Perché può svilupparsi').isVisible(), 'apertura di un altro concetto');
await go('/laboratori/mondo-interiore?tab=autoriflessione');
await page.getByRole('button', { name: 'Qualche ora' }).click();
const fb1 = await page.locator('.feedback').first().textContent();
await page.getByRole('button', { name: 'Pochi minuti, poi il dubbio torna' }).click();
const fb2 = await page.locator('.feedback').nth(0).textContent();
ok(fb1 !== fb2, 'feedback personalizzato diverso per risposta');
await go('/laboratori/mondo-interiore');
await btn('Segna come letto').first().click();
ok(await btn('Letto').first().isVisible(), 'sezione segnata come letta');
await page.screenshot({ path: `${SHOTS}/03-laboratorio.png` });

console.log('Strumento “Che cosa stai provando davvero?”');
await go('/laboratori/mondo-interiore?tab=strumenti');
await btn('Ha pranzato con un collega').click();
await btn('Avanti').click();
await btn('gelosia', true).click();
await btn('Avanti').click();
await btn('paura di perderla', true).click();
await btn('Avanti').click();
await page.locator('#wyf-thought').fill('Quel collega le piace');
await btn('Avanti').click();
await btn('chiederle spiegazioni', true).click();
await btn('Avanti').click();
await btn('Dirle ciò che sento, senza accusare').click();
await btn('Vedi la sequenza').click();
ok(await page.getByText(/Sotto gelosia hai riconosciuto anche paura di perderla/).isVisible(), 'feedback sulla sequenza emozione→comportamento');
await page.screenshot({ path: `${SHOTS}/04-sentire.png`, fullPage: true });

console.log('Classificazione fatti / interpretazioni / paure / conclusioni / impulsi');
await go('/laboratori/storie?tab=strumenti');
const items = page.locator('.quiz-item');
ok((await items.count()) === 30, '30 frasi in 6 situazioni');
await items.nth(0).getByRole('button', { name: 'Interpretazione' }).click();
ok(await items.nth(0).getByText(/Più probabilmente: fatto osservabile/).isVisible(), 'spiegazione anche quando la scelta non coincide');
await items.nth(1).getByRole('button', { name: 'Interpretazione' }).click();
ok(await items.nth(1).getByText(/Sì: interpretazione/).isVisible(), 'spiegazione quando la scelta coincide');

console.log('Laboratorio 4: dieci situazioni in tre modalità');
await go('/laboratori/controllo?tab=strumenti');
ok((await page.getByRole('tablist', { name: 'Situazioni' }).getByRole('tab').count()) === 10, '10 situazioni');
await page.getByRole('tab', { name: /Non vuole mostrare il telefono/ }).click();
ok((await page.locator('.mode').count()) === 3, 'tre modalità A/B/C');
await page.getByRole('radio', { name: /^B/ }).click();
ok(await page.getByText(/Riconoscere la pressione è già un passo importante/).isVisible(), 'feedback sul riconoscimento');
await page.screenshot({ path: `${SHOTS}/05-controllo.png`, fullPage: true });

console.log('Laboratorio 5: verifica di sicurezza e sospensione degli esercizi');
await go('/esercizi/mappa-escalation');
ok(await page.getByText('La mia mappa dell’escalation').first().isVisible(), 'esercizio accessibile senza segnalazioni');
await go('/laboratori/rabbia?tab=strumenti');
const qs = page.locator('.safety-q');
ok((await qs.count()) === 6, 'sei domande di sicurezza');
await qs.nth(0).getByRole('radio', { name: 'No' }).click();
await qs.nth(1).getByRole('radio', { name: 'Sì' }).click();
for (let i = 2; i < 6; i++) await qs.nth(i).getByRole('radio', { name: 'No' }).click();
await btn('Conferma le risposte').click();
ok(await page.getByText('Adesso la priorità è la sicurezza').isVisible(), 'priorità sicurezza dopo un sì');
await go('/esercizi/mappa-escalation');
ok(await page.getByText('Gli esercizi ordinari sono sospesi').isVisible(), 'esercizio ordinario sospeso');
await go('/scenari/porta');
ok(await page.getByText('Gli esercizi ordinari sono sospesi').isVisible(), 'situazione del lab 5 sospesa');
await page.screenshot({ path: `${SHOTS}/06-sicurezza.png`, fullPage: true });
await page.locator('#ep-message').fill('Mi sto arrabbiando troppo. Mi fermo adesso.');
await page.locator('#ep-where').fill('Esco a camminare al parco');
await page.getByLabel(/Ho letto il protocollo/).check();
await btn('Salva il piano e prosegui').click();
ok(await page.getByRole('heading', { level: 1, name: 'La porta' }).isVisible(), 'situazione accessibile dopo il piano di uscita');
await btn(/Ti metti davanti alla porta/).click();
ok(await page.locator('.safety').getByText('La sicurezza viene prima di tutto.').isVisible(), 'avviso di sicurezza su risposta intimidatoria');
await page.reload();
ok(await page.getByRole('heading', { level: 1, name: 'La porta' }).isVisible(), 'stato di sicurezza persistente dopo refresh');

console.log('Situazioni ramificate');
await go('/scenari/pranzo-collega');
ok((await page.locator('.choice').count()) === 4, 'quattro risposte iniziali');
await btn(/Noti la stretta/).click();
ok(await page.getByText('Che cosa può vivere lei').isVisible(), 'feedback su di te e su di lei');
await btn(/Continua/).click();
ok(await page.getByText(/Davide l’ha aiutata/).isVisible(), 'ramo di apertura');
await btn(/Ti accorgi del pensiero/).click();
await btn(/Vedi come finisce/).click();
const end1 = await page.locator('#esito').textContent();
await page.screenshot({ path: `${SHOTS}/07-situazione-esito.png`, fullPage: true });
await btn(/Riprova con un’altra strada/).click();
await btn(/da quando pranzi con Davide/).click();
await btn(/Continua/).click();
ok(await page.getByText(/C’è qualche problema con il fatto che pranzo/).isVisible(), 'ramo di tensione dopo scelta diversa');
await btn(/Nessun problema. Però potevi dirmelo prima/).click();
await btn(/Vedi come finisce/).click();
const end2 = await page.locator('#esito').textContent();
ok(end1 !== end2, `esito diverso (“${end2}”)`);
await page.locator('#sc-refl').fill('Mostro sospetto, nascondo la paura.');
await btn(/Salva la riflessione/).click();

console.log('Circoli, cassetta, esercizio');
await go('/laboratori/altra-persona?tab=strumenti');
await btn(/Lascia correre/).click();
await btn('Interrompi il circolo qui').click();
ok(await page.getByText('Hai interrotto al passo 2').isVisible(), 'simulazione del circolo interrotta');
await page.screenshot({ path: `${SHOTS}/08-circoli.png` });
await go('/laboratori/reagire?tab=strumenti');
ok((await page.locator('.acc-item').count()) === 9, 'nove strumenti');
await btn('Avvia la procedura guidata').click();
for (let i = 0; i < 4; i++) await btn('Passo successivo').click();
await btn('Fatto').click();
ok(await page.getByText('Procedura completata.').isVisible(), 'procedura guidata completata');
await go('/esercizi/tk-pensieri');
await page.locator('#st-pensiero').fill('Se non scrive non le importa');
await btn(/Avanti/).click();
await btn(/Avanti/).click();
await btn('lettura del pensiero', true).click();
await btn(/Avanti/).click();
await page.locator('#st-equilibrato').fill('Non so perché non scrive');
await btn(/Avanti/).click();
await btn(/Completa/).click();
ok(await page.getByText('Le tue risposte').isVisible(), 'esercizio completato');

console.log('Diario: crea, modifica, elimina, persistenza');
await go('/diario/nuovo');
await page.locator('#j-title').fill('Il pranzo con il collega');
await page.locator('#j-facts').fill('Ha pranzato con un collega.');
await page.locator('#j-fear').fill('Di essere meno importante.');
await btn('gelosia', true).click();
await btn(/Salva/).click();
ok(await page.getByRole('heading', { name: 'Il pranzo con il collega' }).isVisible(), 'voce creata');
await page.getByRole('link', { name: /Modifica/ }).click();
await page.locator('#j-title').fill('Il pranzo con il collega (riletto)');
await btn(/Salva/).click();
ok(await page.getByRole('heading', { name: 'Il pranzo con il collega (riletto)' }).isVisible(), 'voce modificata');
await page.reload();
ok(await page.getByText('Di essere meno importante.').isVisible(), 'voce persistente dopo refresh');
await go('/diario');
const count = await page.locator('a.entry-card').count();
ok(count >= 2, `elenco diario (${count} voci)`);
await page.getByLabel('Cerca nel diario').fill('riletto');
ok((await page.locator('a.entry-card').count()) === 1, 'ricerca');
await page.locator('a.entry-card').first().click();
const [dl1] = await Promise.all([page.waitForEvent('download'), btn(/Esporta/).click()]);
ok(dl1.suggestedFilename().endsWith('.md'), 'esportazione voce');
await btn(/Elimina/).click();
await btn('Elimina definitivamente').click();
await page.waitForURL(/#\/diario$/);
await page.reload();
ok((await page.locator('a.entry-card').count()) === count - 1, 'eliminazione persistente');

console.log('Piano: campi, verifica osservabile, stampa, esportazione');
await go('/piano');
await page.getByRole('textbox', { name: 'Il comportamento che voglio interrompere' }).fill('Controllo il suo ultimo accesso più volte al giorno.');
await page.getByLabel('Aggiungi a: Situazioni che lo attivano').fill('quando esce con le amiche');
await page.getByLabel('Aggiungi a: Situazioni che lo attivano').press('Enter');
await page.getByRole('textbox', { name: 'La risposta alternativa' }).fill('Cercherò di essere meno geloso');
ok(await page.locator('.obs-generico').isVisible(), 'promessa generica riconosciuta');
await page.getByRole('textbox', { name: 'La risposta alternativa' }).fill('Quando non risponde per 2 ore, non le scriverò di nuovo e lo annoterò nel diario la sera.');
ok(await page.locator('.obs-osservabile').isVisible(), 'cambiamento osservabile riconosciuto');
await page.getByRole('textbox', { name: 'Il limite dell’altra persona' }).fill('Il suo telefono è suo.');
await page.waitForTimeout(900);
await page.reload();
ok((await page.getByRole('textbox', { name: 'Il limite dell’altra persona' }).inputValue()) === 'Il suo telefono è suo.', 'piano persistente dopo refresh');
const [dl2] = await Promise.all([page.waitForEvent('download'), btn(/Esporta \(\.md\)/).click()]);
const planPath = `${SHOTS}/piano-esportato.md`;
await dl2.saveAs(planPath);
const md = fs.readFileSync(planPath, 'utf8');
ok(md.includes('Il suo telefono è suo.') && md.includes('quando esce con le amiche'), 'contenuto del piano esportato');
await page.evaluate(() => {
  window.__printed = false;
  window.print = () => (window.__printed = true);
});
await btn(/Stampa o salva in PDF/).click();
ok(await page.evaluate(() => window.__printed), 'stampa invocata');
await page.emulateMedia({ media: 'print' });
await page.pdf({ path: `${SHOTS}/piano-stampa.pdf` });
ok(await page.locator('.print-only').isVisible(), 'impaginazione di stampa');
ok(!(await page.locator('.app-header').isVisible()), 'intestazione nascosta in stampa');
await page.emulateMedia({ media: 'screen' });

console.log('Modulo aiuto');
await go('/aiuto');
ok((await page.locator('.acc-item').count()) === 15, '15 motivi');
await btn(/Comprendere la propria gelosia/).click();
ok(await page.getByText('Come uno psicologo può aiutarti').isVisible(), 'approfondimento espandibile');
ok(await page.getByText(/Non devi andare dallo psicologo per smettere di provare gelosia/).isVisible(), 'messaggio conclusivo');
ok(await page.getByText(/La psicoterapia non è una punizione/).isVisible(), 'spiegazione della psicoterapia');
await page.screenshot({ path: `${SHOTS}/09-aiuto.png`, fullPage: true });

console.log('Progressi e dati');
await go('/progressi');
ok(await page.getByText('Risposta consapevole').first().isVisible(), 'progressi: risposte esplorate');
await page.screenshot({ path: `${SHOTS}/10-progressi.png`, fullPage: true });
await go('/dati');
const [dl3] = await Promise.all([page.waitForEvent('download'), btn(/Backup completo/).click()]);
const backupPath = `${SHOTS}/backup.json`;
await dl3.saveAs(backupPath);
ok(JSON.parse(fs.readFileSync(backupPath, 'utf8')).safety.flagged === true, 'backup JSON completo');
await btn('Elimina tutti i dati').click();
await btn('Elimina tutto', true).click();
await go('/diario');
ok(await page.getByText('Il tuo diario è ancora vuoto').isVisible(), 'eliminazione totale');
await go('/dati');
await page.locator('#import-file').setInputFiles(backupPath);
await btn('Importa e sostituisci').click();
await go('/diario');
ok((await page.locator('a.entry-card').count()) > 0, 'importazione del backup');
await go('/inesistente');
ok(await page.getByText('Questa strada non porta da nessuna parte').isVisible(), 'pagina 404');

console.log('Navigazione da tastiera');
await go('/laboratori/mondo-interiore');
await page.reload();
await page.keyboard.press('Tab');
ok(await page.evaluate(() => document.activeElement?.textContent?.includes('Vai al contenuto')), 'link “vai al contenuto” raggiungibile da tastiera');
await page.keyboard.press('Tab');
await page.keyboard.press('Tab');
ok(await page.evaluate(() => document.activeElement?.tagName === 'A'), 'navigazione con Tab tra i link');
await go('/laboratori/mondo-interiore?tab=concetti');
await page.getByRole('button', { name: /Insicurezza/ }).focus();
await page.keyboard.press('Enter');
ok(await page.getByRole('button', { name: /Insicurezza/ }).getAttribute('aria-expanded') === 'true', 'accordion apribile con Invio');

console.log('Mobile (iPhone 13)');
const m = await browser.newContext({ ...devices['iPhone 13'] });
const mp = await m.newPage();
mp.on('pageerror', (e) => errors.push(e.message));
await mp.goto(BASE);
await mp.screenshot({ path: `${SHOTS}/m1-benvenuto.png` });
await mp.getByRole('button', { name: 'Inizia il percorso' }).click();
for (const [h, name] of [
  ['/', 'm2-bacheca'],
  ['/laboratori/controllo?tab=strumenti', 'm3-controllo'],
  ['/laboratori/storie?tab=strumenti', 'm4-classifica'],
  ['/scenari/due-ore', 'm5-situazione'],
  ['/laboratori/altra-persona?tab=strumenti', 'm6-circoli'],
  ['/laboratori/rabbia?tab=strumenti', 'm7-sicurezza'],
  ['/piano', 'm8-piano'],
  ['/aiuto', 'm9-aiuto'],
  ['/diario/nuovo', 'm10-diario'],
]) {
  await mp.goto(BASE + '#' + h);
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(overflow <= 0, `mobile ${h}: nessuno scroll orizzontale (${overflow}px)`);
  await mp.screenshot({ path: `${SHOTS}/${name}.png` });
}
await mp.locator('.tabbar').getByRole('link', { name: 'Diario' }).click();
ok(await mp.getByRole('heading', { level: 1, name: 'Diario' }).isVisible(), 'navigazione con barra mobile');
await mp.locator('.tabbar').getByRole('link', { name: 'Situazioni' }).click();
ok(await mp.getByRole('heading', { level: 1, name: 'Situazioni quotidiane' }).isVisible(), 'situazioni nella barra mobile');
await mp.locator('.tabbar').getByRole('button', { name: 'Altro' }).click();
await mp.waitForTimeout(500);
await mp.screenshot({ path: `${SHOTS}/m11-altro.png` });
for (const l of ['Il mio piano', 'Progressi', 'Chiedere aiuto', 'Sicurezza e aiuto', 'Bibliografia', 'Privacy e dati']) ok(await mp.locator('.sheet').getByText(l, { exact: true }).isVisible(), `menu Altro: ${l}`);
await mp.locator('.sheet').getByText('Il mio piano', { exact: true }).click();
ok(await mp.getByRole('heading', { level: 1, name: 'Il mio piano di cambiamento' }).isVisible(), 'piano dal menu Altro');
ok(!(await mp.locator('.sheet').isVisible()), 'menu Altro si chiude dopo la scelta');

await browser.close();
if (errors.length) {
  console.log('\nErrori in console:\n' + errors.join('\n'));
  process.exit(1);
}
console.log(`\nTutti i controlli superati: ${passed}`);
