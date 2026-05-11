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
