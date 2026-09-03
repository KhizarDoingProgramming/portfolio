export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const accept = req.headers.get('accept') || '';
  
  if (accept.includes('text/markdown')) {
    const md = `# Mustafa's Portfolio\n\nThis is the personal portfolio website of Mustafa, showcasing projects and skills.\n\n## URLs\n- Main site: https://mustaffa.vercel.app/\n- Projects: https://mustaffa.vercel.app/projects.html\n`;
    return new Response(md, {
      headers: { 
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept'
      },
    });
  }
  
  // Otherwise, fetch and return the static _index.html
  const url = new URL('/_index.html', req.url);
  return fetch(url);
}
