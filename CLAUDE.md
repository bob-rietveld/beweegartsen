# beweegartsen — Claude project notes

## Stack

Statische site (geen build step). Pure HTML in de root, CSS in `assets/css/`, JS in `assets/js/`, afbeeldingen in `assets/img/`. Elke pagina is een losse `.html` in de repo-root (bv. `index.html`, `praktijk.html`).

## Deployment via bassh

De site wordt gedeployed naar [bassh](https://github.com/get-bassh/bassh). Het is een one-command static-site deployer.

- **Project name:** `beweegartsen`
- **CI:** `.github/workflows/deploy.yml` draait `bassh . -n beweegartsen` op elke push naar `main`. Credentials komen uit GitHub Actions secrets `BASSH_API` en `BASSH_KEY`.
- **Lokaal:** CLI staat in `~/.local/bin/bassh`. Credentials in `~/.bashrc` (`BASSH_API`, `BASSH_KEY`) — zsh laadt die niet automatisch, dus voor een lokale run: `source ~/.bashrc && bassh ...` (of run via `bash -c`).

### Veelgebruikte commands

```bash
bassh . -n beweegartsen                 # deploy huidige map
bassh . -n beweegartsen -p <password>   # deploy met AES-256-GCM wachtwoordbescherming
bassh -l                                # projecten tonen
bassh me                                # account info
```

`-p <pass>` wordt meegestuurd bij een deploy; je kunt het wachtwoord wijzigen door opnieuw te deployen met een ander wachtwoord (of zonder `-p` om bescherming te verwijderen).

## "Publiceren"

Als de user zegt "publiceer de veranderingen" (of een variant: "publiceer dit", "publish this"), betekent dat de volledige flow:

1. Lokaal committen op de huidige branch (worktree-branch).
2. Fast-forward mergen naar `main` (vanuit de primary worktree op `/Users/lon/Documents/beweegartsen`).
3. Pushen naar `origin/main`.

De CI workflow ([deploy.yml](.github/workflows/deploy.yml)) pikt de push op en deployt automatisch via bassh — die stap hoeft Claude niet zelf te doen. Geen tussenstap voor confirmation tenzij er iets destructiefs gebeurt.

## Conventies

- Pagina-content is Nederlands; UI-strings hebben `data-i18n-nl` en `data-i18n-en` voor de language toggle.
- Edits aan tekst moeten altijd ook de matchende `data-i18n-nl` waarde (en als relevant `data-i18n-en`) bijwerken; de visible text in de tag is een fallback en moet gelijk zijn aan de NL-variant.

## Design system

De brand- en visuele richtlijnen leven in een **Claude Design** bundle: het "Beweegartsen Design System" project. De huidige export:

- **Bundle URL:** https://api.anthropic.com/v1/design/h/mr5AYAtY_gmtM0kifaJC2Q
- **Bron in repo:** [`assets/css/tokens.css`](assets/css/tokens.css) is de canonieke implementatie van de design tokens. De bundle is uit deze tokens (en `site.css`) gegenereerd, dus de site = source of truth voor concrete waarden; het design system = source of truth voor regels, naamgeving en bedoeling.

### Wat staat erin

Het bundle (tar.gz achter de URL) bevat:
- `README.md` — brand-, content- en visuele fundamentals (palette, type, spacing, radii, photo treatments, iconography, voice rules zoals één italic woord per heading, `01 —` eyebrows, `u`-vorm, etc.).
- `colors_and_type.css` — tokens + element base styles, één-op-één met productie.
- `preview/*.html` — design-system kaartjes (kleur, type, componenten).
- `ui_kits/website/` — high-fidelity recreatie van de marketing site.
- `assets/photos/` — de officiële foto-set (zelfde als `assets/img/photos/`).

### Update-flow: design system → site

Als de user het design system in Claude Design aanpast en de wijziging op de hele site wil toepassen:

1. User deelt de **nieuwe bundle-URL** (claude design genereert per export een nieuwe content-hash URL — de oude blijft het oude design).
2. Claude fetcht de bundle (`curl -sL <url> -o /tmp/ds.bin && gunzip -c /tmp/ds.bin | tar -x -C /tmp/`), leest de `README.md` en `colors_and_type.css`.
3. Diff tegen `assets/css/tokens.css` en `assets/css/site.css` — pas tokens/regels aan zodat productie matched.
4. Update de bundle-URL hierboven en publiceer (zie "Publiceren").

Hardcoded waarden in `site.css` mogen geleidelijk overgaan naar de tokens (`--r-md`, `--accent`, `--emphasis`, etc.) zodat een toekomstige token-wijziging automatisch doorwerkt — geen big-bang refactor nodig.

## Local preview (Claude Preview MCP)

Het `preview_start` proces draait in een macOS-sandbox die **geen file reads onder `.claude/worktrees/…` toestaat** — ook al kan Claude zelf prima in de worktree lezen/schrijven via Edit/Write. Elke poging om de site direct vanuit de worktree te serveren resulteert in 500'en met `Errno::EPERM` op iedere `GET`. Ook Python's `http.server` faalt eerder: het `__main__`-blok roept `os.getcwd()` aan tijdens argparse-setup en die syscall is geweigerd.

**Werkende setup** (al geconfigureerd in [`.claude/launch.json`](.claude/launch.json)):

1. Mirror de statische site naar een pad buiten `.claude/`:
   ```bash
   rm -rf /tmp/beweegartsen-preview
   cp -R /Users/lon/Documents/beweegartsen/.claude/worktrees/<this-worktree>/ /tmp/beweegartsen-preview
   ```
2. `launch.json` serveert vanuit `/tmp/beweegartsen-preview` met Ruby's WEBrick (`ruby -run -e httpd -- --port=8000 --bind-address=127.0.0.1 /tmp/beweegartsen-preview`). Ruby 2.6 zit op macOS pre-installed; Python 3.9's http.server werkt niet in deze sandbox.
3. `mcp__Claude_Preview__preview_start` met `name="static-site"` om te starten. Browser → http://127.0.0.1:8000.

**Belangrijk:** de preview leest van `/tmp`, niet van de worktree. Edits aan HTML/CSS/JS in de worktree zijn pas zichtbaar in de browser **nadat `/tmp/beweegartsen-preview` opnieuw gesynced is**. Doe dat met:

```bash
rsync -a --delete --exclude='.git' --exclude='.claude' \
  /Users/lon/Documents/beweegartsen/.claude/worktrees/<this-worktree>/ \
  /tmp/beweegartsen-preview/
```

Als de user vraagt om de preview te tonen / refreshen: re-sync eerst, dan `preview_start` (of een browser-reload). Niet vanuit de primary repo op `/Users/lon/Documents/beweegartsen/` werken — die path heeft geen sandbox-probleem maar bevat alleen `main`, niet de huidige worktree changes.
