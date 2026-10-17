// Read-only feed of the demo cars for the shop board page.
// The Airtable token is a Cloudflare secret named AIRTABLE_TOKEN (never in the repo).
// Only the fields the board and dashboard need are returned: no phones, insurance or notes.

const BASE = 'appG5VsveSrJGW2cw';
const ORDERS = 'tblhx8My1EVBv2MG3';
const TECHS = 'tblcg9A0IL37gZhKs';

const F = {
  job: 'fldLkZmmicX1wz710',
  customer: 'fldSvrWdnF606CQ7F',
  step: 'fldgklQWXbWtFEvQd',
  waiting: 'fldnzF9xBvfv10tlB',
  promised: 'fldS5chuyNGRNxUQ1',
  hours: 'fldhKx4ZBofYAv1wP',
  tech: 'fldg6FaVxVqjXELtS',
  techName: 'fldcurZHYKLE7ZCPX',
};

async function listAll(table, fieldIds, token) {
  const out = [];
  let offset;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE}/${table}`);
    url.searchParams.set('returnFieldsByFieldId', 'true');
    fieldIds.forEach((f) => url.searchParams.append('fields[]', f));
    if (offset) url.searchParams.set('offset', offset);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Airtable ${res.status}`);
    const data = await res.json();
    out.push(...data.records);
    offset = data.offset;
  } while (offset);
  return out;
}

function reply(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=15',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export async function onRequestGet({ env }) {
  if (!env.AIRTABLE_TOKEN) return reply({ error: 'not_configured' }, 503);
  try {
    const [orders, techs] = await Promise.all([
      listAll(ORDERS, [F.job, F.customer, F.step, F.waiting, F.promised, F.hours, F.tech], env.AIRTABLE_TOKEN),
      listAll(TECHS, [F.techName], env.AIRTABLE_TOKEN),
    ]);
    const techById = {};
    techs.forEach((t) => { techById[t.id] = t.fields[F.techName] || ''; });
    const cars = orders.map((r) => ({
      job: r.fields[F.job] || '(no vehicle)',
      customer: r.fields[F.customer] || '',
      step: r.fields[F.step] || '',
      waiting: r.fields[F.waiting] || '',
      promised: r.fields[F.promised] || '',
      hours: r.fields[F.hours] || 0,
      techs: (r.fields[F.tech] || []).map((id) => techById[id]).filter(Boolean),
    }));
    return reply({ cars, techs: techs.map((t) => t.fields[F.techName]).filter(Boolean) }, 200);
  } catch (e) {
    return reply({ error: 'unavailable' }, 502);
  }
}
