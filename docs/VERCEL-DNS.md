# Vercel DNS & domains (VV Marine Exports)

## Important: correct domain name

| Domain | Status |
|--------|--------|
| **`vmarineexport.com`** (one “V”) | **Does not exist** in global DNS (NXDOMAIN). Links and OG tags using this name will fail. |
| **`vvmarineexport.com`** (two “V’s”) | **Registered** — this is the live brand domain. |
| **`www.vvmarineexport.com`** | CNAME → Vercel (`*.vercel-dns-*.com`) ✓ |

Always share **`https://www.vvmarineexport.com`** (or apex after A record is correct).

## Vercel project (GitHub)

- Repo: `karthiksuru06/vss-exports`
- Vercel project: **`vv-exportsdemo`** (team: `karthiksuru06s-projects`)
- Production deploy URL pattern: `vv-exportsdemo-….vercel.app`

The CLI on this machine may be logged into a **different** Vercel account (`velvetsupplies325-5661`). To manage this site, log in as **karthiksuru06** (or whoever owns the project):

```bash
vercel login
cd /path/to/vss-exports
vercel link          # pick team karthiksuru06s-projects → project vv-exportsdemo
vercel domains ls
vercel inspect       # latest deployment
vercel logs <deployment-url>
```

## Connect custom domain in Vercel

1. Vercel Dashboard → **vv-exportsdemo** → **Settings** → **Domains**
2. Add **`vvmarineexport.com`** and **`www.vvmarineexport.com`**
3. Use the DNS records Vercel shows:

**GoDaddy (current registrar — `domaincontrol.com` nameservers):**

- **www** → CNAME → `cname.vercel-dns.com` (you already have a Vercel CNAME on www)
- **@ (apex)** → A → `76.76.21.21` (Vercel’s recommended apex A) **or** use Vercel nameservers on the whole domain

Until apex `@` points to Vercel, **`vvmarineexport.com`** (without www) may not serve the site correctly.

## Verify after DNS change

```bash
dig +short www.vvmarineexport.com CNAME
curl -s https://www.vvmarineexport.com/api
curl -s -X POST https://www.vvmarineexport.com/api/login \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com"}'
```

Expect JSON, not `FUNCTION_INVOCATION_FAILED` or HTML error pages.

## Root Directory (Vercel)

- **Repo root** (empty): uses `/vercel.json` + `/api/*` + `frontend/dist`
- **`frontend`**: uses `frontend/vercel.json` + `frontend/api/*` + `frontend/dist`

Both layouts are supported in this repo.
