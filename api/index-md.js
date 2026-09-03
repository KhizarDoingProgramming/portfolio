export default function handler(req, res) {
  const content = `# Mustafa's Portfolio\n\nThis is the personal portfolio website of Mustafa, showcasing projects and skills.\n\n## URLs\n- Main site: https://mustaffa.vercel.app/\n- Projects: https://mustaffa.vercel.app/projects.html\n`;
  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.status(200).send(content);
}
